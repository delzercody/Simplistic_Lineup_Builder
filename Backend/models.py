from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    @classmethod
    def find(cls, id):
        user = User.query.filter(User.id == id).first()
        return user

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    lineups = db.relationship('Lineup', back_populates='user', cascade='all, delete-orphan')
    
    serialize_rules = ('-lineups.user',)

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
    user = db.relationship('User', back_populates='lineups', cascade='all, delete-orphan')
    lineup_slots = db.relationship('LineupSlot', back_populates='lineup', cascade='all, delete-orphan')

    players = association_proxy('lineup_slots', 'player')
    
    serialize_rules = ('-user.lineups', '-lineup_slots.lineup')

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
