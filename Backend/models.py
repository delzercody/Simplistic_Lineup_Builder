from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from flask_login import UserMixin
from app import db, bcrypt
import re

class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    @classmethod
    def find(cls, id):
        user = User.query.filter(User.id == id).first()
        return user

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    bio = db.Column(db.String)
    first_name = db.Column(db.String(100)) 
    last_name = db.Column(db.String(100)) 
    avatar = db.Column(db.String, default = "https://wallpapers.com/images/hd/blank-default-pfp-wue0zko1dfxs9z2c.jpg" )
    username = db.Column(db.String(128), nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)
    lineups = db.relationship('Lineup', back_populates='user', cascade='all, delete-orphan')
    
    serialize_rules = ('-lineups.user', '-_password_hash')

    #######################USER VALIDATIONS########################
    #Email is unique and valid
    @validates('email')
    def validate_email(self, key, email):
        em = User.query.filter(User.email.like(f'%{email}%')).first()
        if type(email) is str and email and em is None and "@" in email and ".com" in email:
            return email
        else: 
            raise ValueError( 'Must be a valid email or email has already been registered.')

    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if type(first_name) is str and len(first_name) in range(1, 51):
            return first_name
        else: 
            raise ValueError( "First name must be a string between 1 - 50 characters.")

    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if type(last_name) is str and len(last_name) in range(1, 51):
            return last_name
        else: 
            raise ValueError( "First and last name must be a string between 1 - 50 characters.")

    @validates('username')
    def validate_username(self, key, username):
        un = User.query.filter(User.username.like(f'%{username}%')).first()
        if type(username) is str and username and un == None and len(username) in range(5, 16) and re.match(r'^[A-Za-z0-9_]+$', username):
            return username
        else: 
            raise ValueError('Username must be unique string between 5 - 15 characters and not contain any special characters.')

    @validates('avatar')
    def validate_avatar(self, key, avatar):
        file_format = [ 'jpeg', 'png', 'jpg', 'gif' ]
        if isinstance(avatar, str) and any(format_str in avatar for format_str in file_format):
            return avatar
        else: 
            raise ValueError("Only JPEG/PNG/GIF images are permitted.")
        
    @validates('password')
    def validate_password(self, key, password):
        if type(password) is str and len(password) in range(8, 128):  # enforce minimum length
            return password
        else: 
            raise ValueError( "Password must be a string between 8 - 128 characters.")

    ########### Password hashing #################
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f"<User {self.username}>"

class Player(db.Model, SerializerMixin):
    __tablename__ = 'player'

    @classmethod
    def find(cls, id):
        player = Player.query.filter(Player.id == id).first()
        return player
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    position = db.Column(db.String(128), nullable=False)
    team = db.Column(db.String(128), nullable=False)
    salary = db.Column(db.Integer, nullable=False)
    projected_points = db.Column(db.Float, nullable=False)
    ownership_percentage = db.Column(db.Float, nullable=False)
    team_game = db.Column(db.String(128), nullable=False)
    player_stats = db.relationship('PlayerStats', back_populates='player', cascade='all, delete-orphan')
    lineup_slots = db.relationship('LineupSlot', back_populates='player', cascade='all, delete-orphan')

    lineups = association_proxy('lineup_slots', 'lineup')
    
    serialize_rules = ('-player_stats.player', '-lineup_slots.player')

####################### PLAYER VALIDATIONS ########################
    @validates('position')
    def validate_position(self, key, position):
        valid_positions = ['QB', 'RB', 'WR', 'TE', 'DEF']
        if position not in valid_positions:
            raise ValueError(f"Invalid position: {position}. Must be one of {valid_positions}.")
        return position

    @validates('team')
    def validate_team(self, key, team):
        valid_teams = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LAC', 'LAR', 'LV', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI', 'PIT', 'SF', 'SEA', 'TB', 'TEN', 'WAS']
        if team not in valid_teams:
            raise ValueError(f"Invalid team: {team}. Must be one of {valid_teams}.")
        return team

    @validates('salary')
    def validate_salary(self, key, salary):
        if salary < 2000:
            raise ValueError("Salary must be at least $2,000.")
        return salary

    @validates('projected_points')
    def validate_projected_points(self, key, projected_points):
        if projected_points < 0:
            raise ValueError("Projected points cannot be negative.")
        return projected_points

    @validates('ownership_percentage')
    def validate_ownership_percentage(self, key, ownership_percentage):
        if ownership_percentage < 0 or ownership_percentage > 100:
            raise ValueError("Ownership percentage must be between 0 and 100.")
        return ownership_percentage


class PlayerStats(db.Model, SerializerMixin):
    __tablename__ = 'player_stats'

    @classmethod
    def find(cls, id):
        player_stats = PlayerStats.query.filter(PlayerStats.id == id).first()
        return player_stats
    
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), primary_key=True)
    stats = db.Column(db.JSON, nullable=False)
    player = db.relationship('Player', back_populates='player_stats')
    
    serialize_rules = ('-player.player_stats',)

class Lineup(db.Model, SerializerMixin):
    __tablename__ = 'lineup'

    @classmethod
    def find(cls, id):
        lineup = Lineup.query.filter(Lineup.id == id).first()
        return lineup
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(128), nullable=False)
    user = db.relationship('User', back_populates='lineups')
    lineup_slots = db.relationship('LineupSlot', back_populates='lineup', cascade='all, delete-orphan')

    players = association_proxy('lineup_slots', 'player')
    
    serialize_rules = ('-user.lineups', '-lineup_slots.lineup')

    def to_dict(self):
        lineup_dict = super().to_dict()
        lineup_dict['players'] = [
            {
                'player_id': slot.player.id,
                'name': slot.player.name,
                'position': slot.player.position,
                'team': slot.player.team,
                'salary': slot.player.salary,
                'projected_points': slot.player.projected_points,
                'ownership_percentage': slot.player.ownership_percentage
            }
            for slot in self.lineup_slots
        ]
        return lineup_dict
    
####################### LINEUP VALIDATIONS ########################
    @validates('user_id')
    def validate_user_id(self, key, user_id):
        user = User.find( user_id )        
        if user:
            return user_id
        else: 
            raise ValueError( "User not found. ")

    @validates('name')
    def validate_name(self, key, name):
            if not name or len(name.strip()) == 0:
                raise ValueError("Lineup name cannot be empty.")

            # Check if the name already exists for the same user's lineups
            existing_lineup = Lineup.query.filter(Lineup.name == name, Lineup.user_id == self.user_id).first()
            if existing_lineup:
                raise ValueError("Lineup name already exists.")

            return name

class LineupSlot(db.Model, SerializerMixin):
    __tablename__ = 'lineupSlot'

    @classmethod
    def find(cls, id):
        lineup_slot = LineupSlot.query.filter(LineupSlot.id == id).first()
        return lineup_slot
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    lineup_id = db.Column(db.Integer, db.ForeignKey('lineup.id'), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    role = db.Column(db.String(128), nullable=False)
    lineup = db.relationship('Lineup', back_populates='lineup_slots')
    player = db.relationship('Player', back_populates='lineup_slots')
    
    serialize_rules = ('-lineup.lineup_slots', '-player.lineup_slots')

####################### LINEUPSLOT VALIDATIONS ########################
    @validates('lineup_id')
    def validate_lineup_id(self, key, lineup_id):
        lineup = Lineup.find( lineup_id )        
        if lineup:
            return lineup_id
        else: 
            raise ValueError( "User not found. ")

    @validates('player_id')
    def validate_player_id(self, key, player_id):
        player = Player.find( player_id )        
        if player:
            return player_id
        else: 
            raise ValueError( "Player not found. ")

    @validates('role')
    def validate_role(self, key, role):
        valid_roles = ['QB', 'RB', 'WR', 'TE', 'DEF']
        if role not in valid_roles:
            raise ValueError(f"Invalid position: {role}. Must be one of {valid_roles}.")
        return role

    @staticmethod
    def _update_lineup_with_player_info(target, value, oldvalue, initiator):
        lineup = target.lineup
        player = target.player

        lineup_slot_info = {
            'player_id': player.id,
            'name': player.name,
            'position': player.position,
            'team': player.team,
            'salary': player.salary,
            'projected_points': player.projected_points,
            'ownership_percentage': player.ownership_percentage
        }

        lineup.players.append(lineup_slot_info)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._update_lineup_with_player_info(self, None, None, None)

# Register the event listener for the LineupSlot model
event.listen(LineupSlot, 'after_insert', LineupSlot._update_lineup_with_player_info)
