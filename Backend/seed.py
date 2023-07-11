from app import app, db
from models import Player, PlayerStats, User, LineupSlot, Lineup


def seed_data():
    # Seed user data
    user1 = User(
        email='user1@example.com',
        bio='User 1 bio',
        first_name='John',
        last_name='Doe',
        avatar='https://example.com/avatar1.jpg',
        username='user1',
        password='password1')

    user2 = User(
        email='user2@example.com',
        bio='User 2 bio',
        first_name='Jane',
        last_name='Smith',
        avatar='https://example.com/avatar2.jpg',
        username='user2',
        password='password2')

    user3 = User(
        email='user3@example.com',
        bio='User 3 bio',
        first_name='Mike',
        last_name='Johnson',
        avatar='https://example.com/avatar3.jpg',
        username='user3',
        password='password3')

    user4 = User(
        email='user4@example.com',
        bio='User 4 bio',
        first_name='Sarah',
        last_name='Wilson',
        avatar='https://example.com/avatar4.jpg',
        username='user4',
        password='password4')

    user5 = User(
        email='user5@example.com',
        bio='User 5 bio',
        first_name='Tom',
        last_name='Brown',
        avatar='https://example.com/avatar5.jpg',
        username='user5',
        password='password5')

    # Seed QB (Quarterback) data
    qb1 = Player(
        name="Whiskers",
        position="QB",
        team="TB",
        salary=8000,
        projected_points=25.5,
        ownership_percentage=15.2,
        team_game="TB vs. DAL")

    qb1_stats = PlayerStats(
        player=qb1,
        stats={
            "passing_yards": 300,
            "passing_touchdowns": 3,
            "interceptions": 0})

    qb2 = Player(
        name="Mittens",
        position="QB",
        team="KC",
        salary=8200,
        projected_points=24.8,
        ownership_percentage=16.5,
        team_game="KC vs. CLE")

    qb2_stats = PlayerStats(
        player=qb2,
        stats={
            "passing_yards": 280,
            "passing_touchdowns": 2,
            "interceptions": 0})

    qb3 = Player(
        name="Salem",
        position="QB",
        team="SEA",
        salary=7800,
        projected_points=23.5,
        ownership_percentage=14.9,
        team_game="SEA vs. IND")

    qb3_stats = PlayerStats(
        player=qb3,
        stats={
            "passing_yards": 320,
            "passing_touchdowns": 2,
            "interceptions": 1})

    qb4 = Player(
        name="Whiskerface",
        position="QB",
        team="BUF",
        salary=7900,
        projected_points=22.3,
        ownership_percentage=13.7,
        team_game="BUF vs. PIT")

    qb4_stats = PlayerStats(
        player=qb4,
        stats={
            "passing_yards": 260,
            "passing_touchdowns": 2,
            "interceptions": 1})

    qb5 = Player(
        name="Fuzzy",
        position="QB",
        team="GB",
        salary=8100,
        projected_points=24.6,
        ownership_percentage=16.1,
        team_game="GB vs. NO")

    qb5_stats = PlayerStats(
        player=qb5,
        stats={
            "passing_yards": 290,
            "passing_touchdowns": 3,
            "interceptions": 0})

    qb6 = Player(
        name="Purrfect",
        position="QB",
        team="LAR",
        salary=8300,
        projected_points=26.2,
        ownership_percentage=17.9,
        team_game="LAR vs. CHI")

    qb6_stats = PlayerStats(
        player=qb6,
        stats={
            "passing_yards": 310,
            "passing_touchdowns": 3,
            "interceptions": 1})

    qb7 = Player(
        name="Muffin",
        position="QB",
        team="DAL",
        salary=7700,
        projected_points=21.8,
        ownership_percentage=12.3,
        team_game="DAL vs. TB")

    qb7_stats = PlayerStats(
        player=qb7,
        stats={
            "passing_yards": 240,
            "passing_touchdowns": 2,
            "interceptions": 0})

    qb8 = Player(
        name="Whiskerkins",
        position="QB",
        team="SF",
        salary=8000,
        projected_points=23.1,
        ownership_percentage=14.5,
        team_game="SF vs. DET")

    qb8_stats = PlayerStats(
        player=qb8,
        stats={
            "passing_yards": 270,
            "passing_touchdowns": 2,
            "interceptions": 1})

    qb9 = Player(
        name="Sprinkles",
        position="QB",
        team="NE",
        salary=7800,
        projected_points=22.7,
        ownership_percentage=14.1,
        team_game="NE vs. MIA")

    qb9_stats = PlayerStats(
        player=qb9,
        stats={
            "passing_yards": 250,
            "passing_touchdowns": 2,
            "interceptions": 0})

    qb10 = Player(
        name="Snuggles",
        position="QB",
        team="NO",
        salary=8400,
        projected_points=25.9,
        ownership_percentage=17.3,
        team_game="NO vs. GB")

    qb10_stats = PlayerStats(
        player=qb10,
        stats={
            "passing_yards": 300,
            "passing_touchdowns": 3,
            "interceptions": 0})

    # Seed RB (Running Back) data
    rb1 = Player(
        name="Whiskers",
        position="RB",
        team="CAR",
        salary=8000,
        projected_points=25.5,
        ownership_percentage=15.2,
        team_game="CAR vs. NYJ")

    rb1_stats = PlayerStats(
        player=rb1,
        stats={
            "rushing_yards": 100,
            "rushing_touchdowns": 1,
            "receptions": 4,
            "receiving_yards": 30,
            "receiving_touchdowns": 0})

    rb2 = Player(
        name="Fuzzy",
        position="RB",
        team="KC",
        salary=8500,
        projected_points=22.8,
        ownership_percentage=18.5,
        team_game="KC vs. CLE")

    rb2_stats = PlayerStats(
        player=rb2,
        stats={
            "rushing_yards": 80,
            "rushing_touchdowns": 1,
            "receptions": 3,
            "receiving_yards": 40,
            "receiving_touchdowns": 0})

    rb3 = Player(
        name="Whiskerino",
        position="RB",
        team="NO",
        salary=7800,
        projected_points=23.1,
        ownership_percentage=14.8,
        team_game="NO vs. GB")

    rb3_stats = PlayerStats(
        player=rb3,
        stats={
            "rushing_yards": 90,
            "rushing_touchdowns": 1,
            "receptions": 2,
            "receiving_yards": 20,
            "receiving_touchdowns": 0})

    rb4 = Player(
        name="Captain Whiskerpaws",
        position="RB",
        team="LAR",
        salary=8200,
        projected_points=21.5,
        ownership_percentage=17.2,
        team_game="LAR vs. CHI")

    rb4_stats = PlayerStats(
        player=rb4,
        stats={
            "rushing_yards": 70,
            "rushing_touchdowns": 0,
            "receptions": 5,
            "receiving_yards": 50,
            "receiving_touchdowns": 0})

    rb5 = Player(
        name="Fuzzy McWhiskerson",
        position="RB",
        team="DAL",
        salary=7500,
        projected_points=19.8,
        ownership_percentage=12.6,
        team_game="DAL vs. PHI")

    rb5_stats = PlayerStats(
        player=rb5,
        stats={
            "rushing_yards": 80,
            "rushing_touchdowns": 1,
            "receptions": 3,
            "receiving_yards": 25,
            "receiving_touchdowns": 0})

    rb6 = Player(
        name="Mittens McGee",
        position="RB",
        team="BUF",
        salary=7900,
        projected_points=18.9,
        ownership_percentage=11.3,
        team_game="BUF vs. NYJ")

    rb6_stats = PlayerStats(
        player=rb6,
        stats={
            "rushing_yards": 60,
            "rushing_touchdowns": 0,
            "receptions": 4,
            "receiving_yards": 45,
            "receiving_touchdowns": 0})

    rb7 = Player(
        name="Whiskers VonScratch",
        position="RB",
        team="KC",
        salary=8200,
        projected_points=17.5,
        ownership_percentage=10.2,
        team_game="KC vs. LV")

    rb7_stats = PlayerStats(
        player=rb7,
        stats={
            "rushing_yards": 70,
            "rushing_touchdowns": 1,
            "receptions": 2,
            "receiving_yards": 15,
            "receiving_touchdowns": 0})

    rb8 = Player(
        name="Captain Whiskerbeard",
        position="RB",
        team="TEN",
        salary=7800,
        projected_points=18.2,
        ownership_percentage=9.8,
        team_game="TEN vs. IND")

    rb8_stats = PlayerStats(
        player=rb8,
        stats={
            "rushing_yards": 85,
            "rushing_touchdowns": 0,
            "receptions": 3,
            "receiving_yards": 30,
            "receiving_touchdowns": 0})

    rb9 = Player(
        name="Sneaky Whiskerpaws",
        position="RB",
        team="LAR",
        salary=8100,
        projected_points=17.8,
        ownership_percentage=10.5,
        team_game="LAR vs. SEA")

    rb9_stats = PlayerStats(
        player=rb9,
        stats={
            "rushing_yards": 65,
            "rushing_touchdowns": 0,
            "receptions": 4,
            "receiving_yards": 40,
            "receiving_touchdowns": 0})

    rb10 = Player(
        name="Fluffy McPounce",
        position="RB",
        team="SF",
        salary=7900,
        projected_points=18.6,
        ownership_percentage=10.8,
        team_game="SF vs. ARI")

    rb10_stats = PlayerStats(
        player=rb10,
        stats={
            "rushing_yards": 55,
            "rushing_touchdowns": 0,
            "receptions": 5,
            "receiving_yards": 50,
            "receiving_touchdowns": 0})

    rb11 = Player(
        name="Paws McFlufferton",
        position="RB",
        team="CLE",
        salary=8000,
        projected_points=18.4,
        ownership_percentage=10.6,
        team_game="CLE vs. PIT")

    rb11_stats = PlayerStats(
        player=rb11,
        stats={
            "rushing_yards": 75,
            "rushing_touchdowns": 1,
            "receptions": 2,
            "receiving_yards": 20,
            "receiving_touchdowns": 0})

    rb12 = Player(
        name="Whiskerface McGraw",
        position="RB",
        team="NE",
        salary=7900,
        projected_points=18.1,
        ownership_percentage=9.9,
        team_game="NE vs. MIA")

    rb12_stats = PlayerStats(
        player=rb12,
        stats={
            "rushing_yards": 60,
            "rushing_touchdowns": 0,
            "receptions": 3,
            "receiving_yards": 35,
            "receiving_touchdowns": 0})

    # Seed WR (Wide Receiver) data
    wr1 = Player(
        name="Larry Lemur",
        position="WR",
        team="ARI",
        salary=6000,
        projected_points=18.5,
        ownership_percentage=15.2,
        team_game="ARI vs. SEA")

    wr1_stats = PlayerStats(
        player=wr1,
        stats={
            "receptions": 6,
            "receiving_yards": 90,
            "receiving_touchdowns": 1})

    wr2 = Player(
        name="Terry Turtle",
        position="WR",
        team="BUF",
        salary=5500,
        projected_points=16.8,
        ownership_percentage=12.3,
        team_game="BUF vs. KC")

    wr2_stats = PlayerStats(
        player=wr2,
        stats={
            "receptions": 4,
            "receiving_yards": 60,
            "receiving_touchdowns": 0})

    wr3 = Player(
        name="Randy Raccoon",
        position="WR",
        team="CAR",
        salary=5900,
        projected_points=17.2,
        ownership_percentage=11.9,
        team_game="CAR vs. NO")

    wr3_stats = PlayerStats(
        player=wr3,
        stats={
            "receptions": 5,
            "receiving_yards": 70,
            "receiving_touchdowns": 1})

    wr4 = Player(
        name="Walter Warthog",
        position="WR",
        team="CHI",
        salary=5800,
        projected_points=16.9,
        ownership_percentage=10.5,
        team_game="CHI vs. CIN")

    wr4_stats = PlayerStats(
        player=wr4,
        stats={
            "receptions": 4,
            "receiving_yards": 55,
            "receiving_touchdowns": 0})

    wr5 = Player(
        name="Freddie Ferret",
        position="WR",
        team="CLE",
        salary=5700,
        projected_points=16.4,
        ownership_percentage=10.1,
        team_game="CLE vs. HOU")

    wr5_stats = PlayerStats(
        player=wr5,
        stats={
            "receptions": 4,
            "receiving_yards": 50,
            "receiving_touchdowns": 0})

    wr6 = Player(
        name="Benny Baboon",
        position="WR",
        team="DAL",
        salary=5600,
        projected_points=16.2,
        ownership_percentage=9.8,
        team_game="DAL vs. NYG")

    wr6_stats = PlayerStats(
        player=wr6,
        stats={
            "receptions": 5,
            "receiving_yards": 60,
            "receiving_touchdowns": 0})

    wr7 = Player(
        name="Sammy Skunk",
        position="WR",
        team="DEN",
        salary=5500,
        projected_points=15.9,
        ownership_percentage=9.5,
        team_game="DEN vs. LV")

    wr7_stats = PlayerStats(
        player=wr7,
        stats={
            "receptions": 3,
            "receiving_yards": 40,
            "receiving_touchdowns": 0})

    wr8 = Player(
        name="Mickey Mongoose",
        position="WR",
        team="DET",
        salary=5400,
        projected_points=15.7,
        ownership_percentage=9.2,
        team_game="DET vs. GB")

    wr8_stats = PlayerStats(
        player=wr8,
        stats={
            "receptions": 5,
            "receiving_yards": 55,
            "receiving_touchdowns": 0})

    wr9 = Player(
        name="Larry Lemur",
        position="WR",
        team="JAX",
        salary=5300,
        projected_points=15.5,
        ownership_percentage=8.9,
        team_game="JAX vs. TEN")

    wr9_stats = PlayerStats(
        player=wr9,
        stats={
            "receptions": 4,
            "receiving_yards": 45,
            "receiving_touchdowns": 0})

    wr10 = Player(
        name="Wally Warthog",
        position="WR",
        team="KC",
        salary=5200,
        projected_points=15.3,
        ownership_percentage=8.6,
        team_game="KC vs. LAC")

    wr10_stats = PlayerStats(
        player=wr10,
        stats={
            "receptions": 3,
            "receiving_yards": 40,
            "receiving_touchdowns": 0})

    wr11 = Player(
        name="Felix Fox",
        position="WR",
        team="MIN",
        salary=5100,
        projected_points=15.1,
        ownership_percentage=8.3,
        team_game="MIN vs. SEA")

    wr11_stats = PlayerStats(
        player=wr11,
        stats={
            "receptions": 6,
            "receiving_yards": 65,
            "receiving_touchdowns": 1})

    wr12 = Player(
        name="Barry Bison",
        position="WR",
        team="NE",
        salary=5000,
        projected_points=14.9,
        ownership_percentage=8.0,
        team_game="NE vs. NYJ")

    wr12_stats = PlayerStats(
        player=wr12,
        stats={
            "receptions": 5,
            "receiving_yards": 50,
            "receiving_touchdowns": 0})

    wr13 = Player(
        name="Oscar Octopus",
        position="WR",
        team="NO",
        salary=4900,
        projected_points=14.7,
        ownership_percentage=7.7,
        team_game="NO vs. CAR")

    wr13_stats = PlayerStats(
        player=wr13,
        stats={
            "receptions": 4,
            "receiving_yards": 45,
            "receiving_touchdowns": 0})

    wr14 = Player(
        name="Tommy Turtle",
        position="WR",
        team="NYG",
        salary=4800,
        projected_points=14.5,
        ownership_percentage=7.4,
        team_game="NYG vs. DAL")

    wr14_stats = PlayerStats(
        player=wr14,
        stats={
            "receptions": 3,
            "receiving_yards": 40,
            "receiving_touchdowns": 0})

    wr15 = Player(
        name="Gary Gorilla",
        position="WR",
        team="NYJ",
        salary=4700,
        projected_points=14.3,
        ownership_percentage=7.1,
        team_game="NYJ vs. NE")

    wr15_stats = PlayerStats(
        player=wr15,
        stats={
            "receptions": 6,
            "receiving_yards": 65,
            "receiving_touchdowns": 1})

    wr16 = Player(
        name="Daisy Dingo",
        position="WR",
        team="LV",
        salary=4600,
        projected_points=14.1,
        ownership_percentage=6.8,
        team_game="LV vs. DEN")

    wr16_stats = PlayerStats(
        player=wr16,
        stats={
            "receptions": 5,
            "receiving_yards": 50,
            "receiving_touchdowns": 0})

    wr17 = Player(
        name="Sammy Squirrel",
        position="WR",
        team="IND",
        salary=4500,
        projected_points=13.9,
        ownership_percentage=6.5,
        team_game="IND vs. HOU")

    wr17_stats = PlayerStats(
        player=wr17,
        stats={
            "receptions": 4,
            "receiving_yards": 45,
            "receiving_touchdowns": 0})

    wr18 = Player(
        name="Ronnie Rabbit",
        position="WR",
        team="GB",
        salary=4400,
        projected_points=13.7,
        ownership_percentage=6.2,
        team_game="GB vs. DET")

    wr18_stats = PlayerStats(
        player=wr18,
        stats={
            "receptions": 3,
            "receiving_yards": 40,
            "receiving_touchdowns": 0})

    wr19 = Player(
        name="Tina Tiger",
        position="WR",
        team="SEA",
        salary=4300,
        projected_points=13.5,
        ownership_percentage=5.9,
        team_game="SEA vs. MIN")

    wr19_stats = PlayerStats(
        player=wr19,
        stats={
            "receptions": 6,
            "receiving_yards": 65,
            "receiving_touchdowns": 1})

    wr20 = Player(
        name="Ricky Raccoon",
        position="WR",
        team="TB",
        salary=4200,
        projected_points=13.3,
        ownership_percentage=5.6,
        team_game="TB vs. ATL")

    wr20_stats = PlayerStats(
        player=wr20,
        stats={
            "receptions": 5,
            "receiving_yards": 50,
            "receiving_touchdowns": 0})

    wr21 = Player(
        name="Max Moose",
        position="WR",
        team="TEN",
        salary=4100,
        projected_points=13.1,
        ownership_percentage=5.3,
        team_game="TEN vs. JAX")

    wr21_stats = PlayerStats(
        player=wr21,
        stats={
            "receptions": 4,
            "receiving_yards": 45,
            "receiving_touchdowns": 0})

    wr22 = Player(
        name="Coco Crocodile",
        position="WR",
        team="CAR",
        salary=4000,
        projected_points=12.9,
        ownership_percentage=5.0,
        team_game="CAR vs. NO")

    wr22_stats = PlayerStats(
        player=wr22,
        stats={
            "receptions": 3,
            "receiving_yards": 40,
            "receiving_touchdowns": 0})

    wr23 = Player(
        name="Billy Baboon",
        position="WR",
        team="DAL",
        salary=3900,
        projected_points=12.7,
        ownership_percentage=4.7,
        team_game="DAL vs. NYG")

    wr23_stats = PlayerStats(
        player=wr23,
        stats={
            "receptions": 6,
            "receiving_yards": 65,
            "receiving_touchdowns": 1})

    wr24 = Player(
        name="Sally Skunk",
        position="WR",
        team="DEN",
        salary=3800,
        projected_points=12.5,
        ownership_percentage=4.4,
        team_game="DEN vs. LV")

    wr24_stats = PlayerStats(
        player=wr24,
        stats={
            "receptions": 5,
            "receiving_yards": 50,
            "receiving_touchdowns": 0})

    te1 = Player(
        name="Whiskers",
        position="TE",
        team="BUF",
        salary=4800,
        projected_points=12.8,
        ownership_percentage=8.2,
        team_game="BUF vs. PIT")

    te1_stats = PlayerStats(
        player=te1,
        stats={
            "receptions": 5,
            "receiving_yards": 60,
            "receiving_touchdowns": 0})

    te2 = Player(
        name="Paws",
        position="TE",
        team="GB",
        salary=5000,
        projected_points=13.4,
        ownership_percentage=9.1,
        team_game="GB vs. NO")

    te2_stats = PlayerStats(
        player=te2,
        stats={
            "receptions": 6,
            "receiving_yards": 70,
            "receiving_touchdowns": 1})

    te3 = Player(
        name="Whiskerball",
        position="TE",
        team="LAR",
        salary=5200,
        projected_points=14.2,
        ownership_percentage=10.3,
        team_game="LAR vs. CHI")

    te3_stats = PlayerStats(
        player=te3,
        stats={
            "receptions": 4,
            "receiving_yards": 50,
            "receiving_touchdowns": 1})

    te4 = Player(
        name="Mittens",
        position="TE",
        team="DAL",
        salary=4700,
        projected_points=12.2,
        ownership_percentage=7.5,
        team_game="DAL vs. TB")

    te4_stats = PlayerStats(
        player=te4,
        stats={
            "receptions": 5,
            "receiving_yards": 60,
            "receiving_touchdowns": 0})

    te5 = Player(
        name="Fuzzybottom",
        position="TE",
        team="SF",
        salary=4900,
        projected_points=12.9,
        ownership_percentage=8.5,
        team_game="SF vs. DET")

    te5_stats = PlayerStats(
        player=te5,
        stats={
            "receptions": 6,
            "receiving_yards": 70,
            "receiving_touchdowns": 1})

    te6 = Player(
        name="Sprinkles",
        position="TE",
        team="NE",
        salary=4800,
        projected_points=12.6,
        ownership_percentage=8.1,
        team_game="NE vs. MIA")

    te6_stats = PlayerStats(
        player=te6,
        stats={
            "receptions": 4,
            "receiving_yards": 50,
            "receiving_touchdowns": 0})

    te7 = Player(
        name="Whiskertail",
        position="TE",
        team="NO",
        salary=5200,
        projected_points=14.3,
        ownership_percentage=10.4,
        team_game="NO vs. GB")

    te7_stats = PlayerStats(
        player=te7,
        stats={
            "receptions": 5,
            "receiving_yards": 60,
            "receiving_touchdowns": 1})

    te8 = Player(
        name="Pounce",
        position="TE",
        team="PIT",
        salary=5100,
        projected_points=13.8,
        ownership_percentage=9.7,
        team_game="PIT vs. BUF")

    te8_stats = PlayerStats(
        player=te8,
        stats={
            "receptions": 6,
            "receiving_yards": 70,
            "receiving_touchdowns": 0})

    te9 = Player(
        name="Claws",
        position="TE",
        team="CHI",
        salary=4800,
        projected_points=12.7,
        ownership_percentage=8.3,
        team_game="CHI vs. LAR")

    te9_stats = PlayerStats(
        player=te9,
        stats={
            "receptions": 5,
            "receiving_yards": 60,
            "receiving_touchdowns": 1})

    te10 = Player(
        name="Cuddlepaws",
        position="TE",
        team="TB",
        salary=5000,
        projected_points=13.3,
        ownership_percentage=9.0,
        team_game="TB vs. DAL")

    te10_stats = PlayerStats(
        player=te10,
        stats={
            "receptions": 4,
            "receiving_yards": 50,
            "receiving_touchdowns": 0})

    def1 = Player(
        name="Buffalo Bills",
        position="DEF",
        team="BUF",
        salary=3500,
        projected_points=10.2,
        ownership_percentage=8.6,
        team_game="BUF vs. PIT")

    def1_stats = PlayerStats(
        player=def1,
        stats={
            "sacks": 3,
            "interceptions": 1,
            "forced_fumbles": 1,})

    def2 = Player(
        name="Green Bay Packers",
        position="DEF",
        team="GB",
        salary=3700,
        projected_points=9.8,
        ownership_percentage=7.9,
        team_game="GB vs. NO")

    def2_stats = PlayerStats(
        player=def2,
        stats={
            "sacks": 2,
            "interceptions": 2,
            "forced_fumbles": 0,})

    def3 = Player(
        name="Los Angeles Rams",
        position="DEF",
        team="LAR",
        salary=3600,
        projected_points=9.9,
        ownership_percentage=8.1,
        team_game="LAR vs. CHI")

    def3_stats = PlayerStats(
        player=def3,
        stats={
            "sacks": 3,
            "interceptions": 1,
            "forced_fumbles": 1,})

    def4 = Player(
        name="Dallas Cowboys",
        position="DEF",
        team="DAL",
        salary=3400,
        projected_points=10.4,
        ownership_percentage=9.3,
        team_game="DAL vs. TB")

    def4_stats = PlayerStats(
        player=def4,
        stats={
            "sacks": 2,
            "interceptions": 2,
            "forced_fumbles": 0,})

    def5 = Player(
        name="San Francisco 49ers",
        position="DEF",
        team="SF",
        salary=3500,
        projected_points=10.1,
        ownership_percentage=8.4,
        team_game="SF vs. DET")

    def5_stats = PlayerStats(
        player=def5,
        stats={
            "sacks": 3,
            "interceptions": 1,
            "forced_fumbles": 1,})

    def6 = Player(
        name="New England Patriots",
        position="DEF",
        team="NE",
        salary=3600,
        projected_points=9.7,
        ownership_percentage=7.8,
        team_game="NE vs. MIA")

    def6_stats = PlayerStats(
        player=def6,
        stats={
            "sacks": 2,
            "interceptions": 2,
            "forced_fumbles": 0,})

    def7 = Player(
        name="New Orleans Saints",
        position="DEF",
        team="NO",
        salary=3700,
        projected_points=10.3,
        ownership_percentage=9.0,
        team_game="NO vs. GB")

    def7_stats = PlayerStats(
        player=def7,
        stats={
            "sacks": 3,
            "interceptions": 1,
            "forced_fumbles": 1,})

    def8 = Player(
        name="Jacksonville Jaguars",
        position="DEF",
        team="JAC",
        salary=3500,
        projected_points=9.9,
        ownership_percentage=8.2,
        team_game="JAC vs. HOU")

    def8_stats = PlayerStats(
        player=def8,
        stats={
            "sacks": 2,
            "interceptions": 2,
            "forced_fumbles": 0,})

    def9 = Player(
        name="Cincinnati Bengals",
        position="DEF",
        team="CIN",
        salary=3600,
        projected_points=10.5,
        ownership_percentage=9.5,
        team_game="CIN vs. MIN")

    def9_stats = PlayerStats(
        player=def9,
        stats={
            "sacks": 3,
            "interceptions": 1,
            "forced_fumbles": 1,})

    def10 = Player(
        name="Carolina Panthers",
        position="DEF",
        team="Carolina Panthers",
        salary=3700,
        projected_points=10.2,
        ownership_percentage=8.8,
        team_game="CAR vs. NYJ")

    def10_stats = PlayerStats(
        player=def10,
        stats={
            "sacks": 2,
            "interceptions": 2,
            "forced_fumbles": 0,})

    def11 = Player(
        name="Seattle Seahawks",
        position="DEF",
        team="Seattle Seahawks",
        salary=3500,
        projected_points=9.7,
        ownership_percentage=7.9,
        team_game="SEA vs. IND")

    def11_stats = PlayerStats(
        player=def11,
        stats={
            "sacks": 3,
            "interceptions": 1,
            "forced_fumbles": 1,})

    def12 = Player(
        name="Indianapolis Colts",
        position="DEF",
        team="Indianapolis Colts",
        salary=3600,
        projected_points=9.8,
        ownership_percentage=8.3,
        team_game="IND vs. SEA")

    def12_stats = PlayerStats(
        player=def12,
        stats={
            "sacks": 2,
            "interceptions": 2,
            "forced_fumbles": 0,})

    # Create the saved lineup and assign the players
    lineup = Lineup(
        user=user1,
        name='My Lineup')

    lineup_slot_qb = LineupSlot(
        lineup=lineup,
        player=qb1,
        role='QB')

    lineup_slot_rb1 = LineupSlot(
        lineup=lineup,
        player=rb1,
        role='RB')

    lineup_slot_rb2 = LineupSlot(
        lineup=lineup,
        player=rb2,
        role='RB')

    lineup_slot_wr1 = LineupSlot(
        lineup=lineup,
        player=wr1,
        role='WR')

    lineup_slot_wr2 = LineupSlot(
        lineup=lineup,
        player=wr2,
        role='WR')

    lineup_slot_wr3 = LineupSlot(
        lineup=lineup,
        player=wr3,
        role='WR')

    lineup_slot_te1 = LineupSlot(
        lineup=lineup,
        player=te1,
        role='TE')

    lineup_slot_def1 = LineupSlot(
        lineup=lineup,
        player=def1,
        role='DEF')
    # Save the lineup to the session
    db.session.add_all([lineup, lineup_slot_qb, lineup_slot_rb1, lineup_slot_rb2, lineup_slot_wr1, lineup_slot_wr2, lineup_slot_wr3, lineup_slot_te1, lineup_slot_def1])
    # Add the users to the session
    db.session.add_all([user1, user2, user3, user4, user5])
    # Add the QBs to the session
    db.session.add_all([qb1, qb1_stats, qb2, qb2_stats, qb3, qb3_stats, qb4, qb4_stats, qb5, qb5_stats, qb6, qb6_stats, qb7, qb7_stats, qb8, qb8_stats, qb9, qb9_stats, qb10, qb10_stats])
    # Add the RBs to the session
    db.session.add_all([rb1, rb1_stats, rb2, rb2_stats, rb3, rb3_stats, rb4, rb4_stats, rb5, rb5_stats, rb6, rb6_stats, rb7, rb7_stats, rb8, rb8_stats, rb9, rb9_stats, rb10, rb10_stats, rb11, rb11_stats, rb12, rb12_stats])
    # Add the WRs to the session
    db.session.add_all([wr1, wr1_stats, wr2, wr2_stats, wr3, wr3_stats, wr4, wr4_stats, wr5, wr5_stats, wr6, wr6_stats, wr7, wr7_stats, wr8, wr8_stats, wr9, wr9_stats, wr10, wr10_stats, wr11, wr11_stats, wr12, wr12_stats, wr13, wr13_stats, wr14, wr14_stats, wr15, wr15_stats, wr16, wr16_stats, wr17, wr17_stats, wr18, wr18_stats, wr19, wr19_stats, wr20, wr20_stats, wr21, wr21_stats, wr22, wr22_stats, wr23, wr23_stats, wr24, wr24_stats])
    # Add the TEs to the session
    db.session.add_all([te1, te1_stats, te2, te2_stats, te3, te3_stats, te4, te4_stats, te5, te5_stats, te6, te6_stats, te7, te7_stats, te8, te8_stats, te9, te9_stats, te10, te10_stats])
    # Add the DEFs to the session
    db.session.add_all([def1, def1_stats, def2, def2_stats, def3, def3_stats, def4, def4_stats, def5, def5_stats, def6, def6_stats, def7, def7_stats, def8, def8_stats, def9, def9_stats, def10, def10_stats, def11, def11_stats, def12, def12_stats])

    # Commit the changes to the database
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_data()