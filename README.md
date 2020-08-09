# fight-covid19-server
A Mongodb-Node-Express powered server

## Technologies
- Mongodb
- NodeJs
- Express

## Server
- Deployed on heroku in this [link](https://fight-covid19-server.herokuapp.com/)

## Local Development
1. Clone this repository
2. Go to server folder and run `npm install`
3. Run `npm run server` to observe server. Click this [http://localhost:2000/](http://localhost:2000/) to open in browser

## Endpoints
- All version endpoit for this server is pointed in `/api/v1/auth`
### Auth
- `/api/v1/auth/regiser` for registration
- `/api/v1/auth/login` for login
### Logs
- `/api/v1/logs` to get all logs
- `/api/v1/logs` to send logs
*These endpoint is secured requiring an authoken

## Securities
- Helmet - for additional secured http headers
- Cors - for cross-site access of api
- Bcrypt - for generating salt for password
- JwT - for securing endpoints which requires authToken to access
- Passwport - comes along with jwt

(Copy) 2020
