# Voting Poker

A socket based we application to help your team manage better sprint planning sessions. A live version of this app can be found here: https://samarara-planning-poker.herokuapp.com/

## Usage

### Running locally (dev)
```
npm i
npm start
```
The app should start on `localhost:3000`

### Running via docker 
```
docker run --rm -p 8080:8080 samarara/planning-poker
```
And navigate to `localhost:8080` on your browser

## Building
In order to test the production build of this project, execute the following commands:
```
npm i
npm run build:local
npm run start:server
```
And navigate to `localhost:8080` on your browser

