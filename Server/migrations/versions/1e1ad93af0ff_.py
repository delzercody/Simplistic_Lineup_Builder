"""empty message

Revision ID: 1e1ad93af0ff
Revises: 
Create Date: 2023-07-12 09:49:13.234606

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e1ad93af0ff'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('player',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('position', sa.String(length=128), nullable=False),
    sa.Column('team', sa.String(length=128), nullable=False),
    sa.Column('salary', sa.Integer(), nullable=False),
    sa.Column('projected_points', sa.Float(), nullable=False),
    sa.Column('ownership_percentage', sa.Float(), nullable=False),
    sa.Column('team_game', sa.String(length=128), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.String(), nullable=True),
    sa.Column('first_name', sa.String(length=100), nullable=True),
    sa.Column('last_name', sa.String(length=100), nullable=True),
    sa.Column('avatar', sa.String(), nullable=True),
    sa.Column('username', sa.String(length=128), nullable=False),
    sa.Column('_password_hash', sa.String(length=128), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('lineup',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('player_stats',
    sa.Column('player_id', sa.Integer(), nullable=False),
    sa.Column('stats', sa.JSON(), nullable=False),
    sa.ForeignKeyConstraint(['player_id'], ['player.id'], ),
    sa.PrimaryKeyConstraint('player_id')
    )
    op.create_table('lineupSlot',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('lineup_id', sa.Integer(), nullable=False),
    sa.Column('player_id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['lineup_id'], ['lineup.id'], ),
    sa.ForeignKeyConstraint(['player_id'], ['player.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('lineupSlot')
    op.drop_table('player_stats')
    op.drop_table('lineup')
    op.drop_table('users')
    op.drop_table('player')
    # ### end Alembic commands ###
