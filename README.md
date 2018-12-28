# Simple minesweeper game

### Description

This repo is intended to demonstrate how to create this basic game using web technologies.

It basically consists of two parts:
- A backend node.js REST API with a PostgreSQL database; used to store an execute every game action.
- A react.js application used as UI.

In this case, the main logic of the game is built in the backend app, so the UI only interacts 
with this API to receive new game states.
Anyways, almost the same code I used to setup a new game or to reveal a cell could have been written 
in the react app, leaving aside the backend only for storing.

### How to play

This repo is deployed on my private digital ocean server, you can find it here: http://162.243.83.240:9001/

However, if you want to run it locally you will have to follow these instructions:

- Install PostgreSQL and setup a new database called `minesweeper`
- Install `sails` as a global package of npm: `npm install -g sails`
- Install the backend dependencies by running `npm install` on the root folder of this repo
- If necessary, configure the database connection with your custom credentials by editing this line: 
```url: 'postgres://postgres:123456@localhost:5432/minesweeper'``` in the file `./config/datastores.js`
- Start the backend server (dev mode) by running `sails lift`
- Install the UI dependencies by running `npm install` on the folder `./webapp/minesweeper-react`
- Start the react app dev server with `npm start` on the folder `./webapp/minesweeper-react`

### What is missing / could be improved
Due some lack of time various things are pending, here is a list of what I could have done better.

- Improve UI layout, right now I'm using some prefab components from `antdesign` to speedup the development, 
but several parts of the layout could be improved
- A real authentication. I'm using a veeery basic filter (an email) to get a game list from a particular user, 
instead of real credentials.
- Add a delete button for removing completed games.
- Part of the game logic might be replicated on the UI side, the game actions could directly affect the store state to obtain a smooth game experience.
- Improve typing.
- etc.
