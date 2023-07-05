# Fantasy Football Lineup Builder

App Description
An application that allows users to create, view, edit, and compare their fantasy football lineups.

User Stories
As a user, I want to be able to create a new lineup.
As a user, I want to add players to my lineup.
As a user, I want to see detailed statistics about each player.
As a user, I want to save my lineups for future reference.
As a user, I want to be able to view all of my saved lineups.
As a user, I want to edit and delete my saved lineups.
As a user, I want to be able to compare two different lineups.

Fantasy Football Lineup Builder wire frame


API Routes:

API Route	Request Method	Body	Response
/lineups	POST	{title}	{id, title, created_at, user_id}
/lineups/:id	GET	{}	{id, title, created_at, user_id, players}
/lineups/:id	PATCH	{title}	{id, title, created_at, user_id}
/lineups/:id	DELETE	{}	{id}
/players	GET	{}	[{id, name, position, team, stats, salary}]
/players/:id	GET	{}	{id, name, position, team, stats, salary}
Client Side Routes:

Client Route	Component
/	HomePage
/dashboard	Dashboard
/players	PlayersPage
/buildlineup	BuildLineupPage
/viewsavedlineups	ViewSavedLineupsPage
/players/:id	PlayerStatsPage
/navigation	NavigationBar

React tree


Schema


Genius Trello
