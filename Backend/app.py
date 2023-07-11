import logging
import sys
from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from config import SECRET_KEY
from werkzeug.exceptions import NotFound, UnprocessableEntity, Unauthorized
from models import User, Player, Lineup, LineupSlot, PlayerStats
from flask_restful import Api, Resource, abort

app = Flask(__name__)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
app.secret_key = SECRET_KEY

db = SQLAlchemy(app)
api = Api(app)
migrate = Migrate(app, db)

logging.basicConfig(
    level=logging.ERROR,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)  # Output logs to the console
        # logging.FileHandler('error.log')  # Output logs to a file
    ]
)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@app.route('/')
def hello():
    return 'Hello Flask!'

############# Login/Signup ################

@app.route('/login', methods=['POST'])
def login():
    rq = request.get_json()
    username = rq['username']
    password = rq['password']
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password_hash, password):
        login_user(user)
        return make_response(user.to_dict(), 200)
    else:
        abort(401, "Unauthorized")

@app.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return make_response('', 204)

@app.route('/signup', methods=['POST'])
def signup():
    rq = request.get_json()
    user = User(
        email=rq['email'],
        bio=rq['bio'],
        first_name=rq['first_name'],
        last_name=rq['last_name'],
        avatar=rq['avatar'],
        username=rq['username'],
        password_hash=bcrypt.generate_password_hash(rq['password']).decode('utf-8')
    )
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return make_response(user.to_dict(), 201)

@app.route('/protected', methods=['GET'])
@login_required
def protected():
    return make_response(f'Protected route for {current_user.username}', 200)

############# User API #############

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(users, 200)
        return response
    
    def post(self):
        rq = request.get_json()
        new_user = User(
            email=rq['email'],
            bio=rq['bio'],
            first_name=rq['first_name'],
            last_name=rq['last_name'],
            avatar=rq['avatar'],
            username=rq['username'],
            password_hash=rq['password']
        )
        db.session.add(new_user)
        db.session.commit()
        return make_response(new_user.to_dict(), 201)

class UserByID(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user is not None:
            return make_response(user.to_dict(), 200)
        else:
            abort(404, "User not found")

    def put(self, user_id):
        user = User.query.get(user_id)
        if not user:
            abort(404, "User not found")
        rq = request.get_json()
        user.email = rq['email']
        user.bio = rq['bio']
        user.first_name = rq['first_name']
        user.last_name = rq['last_name']
        user.avatar = rq['avatar']
        user.username = rq['username']
        user.password = rq['password']
        db.session.commit()
        return make_response(user.to_dict(), 200)

    def delete(self, user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response('', 204)
        else:
            abort(404, "User not found")

############# Player API #############

class Players(Resource):
    def get(self):
        players = [player.to_dict() for player in Player.query.all()]
        response = make_response(players, 200)
        return response

class PlayerByID(Resource):
    def get(self, player_id):
        player = Player.query.get(player_id)
        if player:
            return make_response(player.to_dict(), 200)
        else:
            abort(404, "Player not found")

############# Lineup API #############

class LineupResource(Resource):
    def post(self):
        rq = request.get_json()
        user_id = rq['user_id']
        name = rq['name']
        player_ids = rq['player_ids']

        # Fetch the user
        user = User.query.get(user_id)
        if not user:
            abort(404, "User not found")

        # Fetch the players
        players = Player.query.filter(Player.id.in_(player_ids)).all()

        # Calculate the total salary
        total_salary = sum(player.salary for player in players)

        # Check the salary constraint
        if total_salary > 50000:
            abort(422, "Total salary exceeds $50,000")

        # Check if the lineup has the required number of players
        if len(players) != 8:
            abort(422, "Lineup must have 8 players")

        # Validate the positions
        positions = [player.position for player in players]
        position_counts = {
            'QB': 0,
            'RB': 0,
            'WR': 0,
            'TE': 0,
            'DEF': 0
        }
        for position in positions:
            if position in position_counts:
                position_counts[position] += 1

        if (
            position_counts['QB'] != 1 or
            position_counts['RB'] != 2 or
            position_counts['WR'] != 3 or
            position_counts['TE'] != 1 or
            position_counts['DEF'] != 1
        ):
            abort(422, "Invalid player positions in the lineup")

        # Create the lineup
        new_lineup = Lineup(user=user, name=name)
        db.session.add(new_lineup)
        db.session.commit()

        # Create the lineup slots and associate players
        for player in players:
            slot = LineupSlot(lineup=new_lineup, player=player)
            db.session.add(slot)

        db.session.commit()
        return make_response(new_lineup.to_dict(), 201)

    def get(self, lineup_id):
        lineup = Lineup.query.get(lineup_id)
        if lineup:
            return make_response(lineup.to_dict(), 200)
        else:
            abort(404, "Lineup not found")

    def put(self, lineup_id):
        lineup = Lineup.query.get(lineup_id)
        if not lineup:
            abort(404, "Lineup not found")
        
        rq = request.get_json()
        lineup.name = rq['name']
        
        # Perform position validation
        positions = {'QB': 1, 'RB': 2, 'WR': 3, 'TE': 1, 'DEF': 1}
        lineup_positions = {}

        for slot in rq['lineup_slots']:
            player = Player.query.get(slot['player_id'])
            position = player.position

            if position in lineup_positions:
                lineup_positions[position] += 1
            else:
                lineup_positions[position] = 1

        for position, count in positions.items():
            if lineup_positions.get(position, 0) != count:
                abort(422, f"Invalid lineup: Expected {count} {position}(s)")

        # Perform salary validation
        total_salary = 0

        for slot in rq['lineup_slots']:
            player = Player.query.get(slot['player_id'])
            total_salary += player.salary

        if total_salary > 50000:
            abort(422, "Invalid lineup: Salary exceeds $50,000")

        db.session.commit()
        return make_response(lineup.to_dict(), 200)

    def delete(self, lineup_id):
        lineup = Lineup.query.get(lineup_id)
        if lineup:
            db.session.delete(lineup)
            db.session.commit()
            return make_response('', 204)
        else:
            abort(404, "Lineup not found")


class UserLineups(Resource):
    def get(self, user_id):
        lineups = Lineup.query.filter_by(user_id=user_id).all()
        response = make_response([lineup.to_dict() for lineup in lineups], 200)
        return response

############# Player Stats API #############

class PlayerStatsResource(Resource):
    def get(self, player_id):
        player_stats = PlayerStats.query.get(player_id)
        if player_stats:
            return make_response(player_stats.to_dict(), 200)
        else:
            abort(404, "Player stats not found")

# Registering the resource classes with their respective routes

api.add_resource(Users, '/api/users')
api.add_resource(UserByID, '/api/users/<int:user_id>')
api.add_resource(Players, '/api/players/')
api.add_resource(PlayerByID, '/api/players/<int:player_id>')
api.add_resource(LineupResource, '/api/lineups/', '/api/lineups/<int:lineup_id>')
api.add_resource(UserLineups, '/api/users/<int:user_id>/lineups')
api.add_resource(PlayerStatsResource, '/api/players/<int:player_id>/stats')

# Add resource routes and other necessary code

if __name__ == '__main__':
    app.run(host='localhost', port=5555, debug=True, use_reloader=False)