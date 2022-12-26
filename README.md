# CovidApp-ExpressJS

web app is to monitor the latest statistics about cases of covid-19 in the world.

## Getting Started
### Setup

Install JS packages
```
yarn install
#or 
npm install
```
### ENV Variables
Create `.env` file
```
touch .env
```
Inside `.env`, set these variables.
```
GOOGLE_USER=your_own_email
GOOGLE_APP_PASS=your_own_password_or_app_key
RECEIVER_EMAIL=receiving_email
```
### Run a server Localhost:3000/home
```
npm/yarn start
or
npm/yarn run dev
```
### With Docker
 
```
docker build -t <name of your app> .
then
docker run -p <your preferred port>:3000 <the name of the app>
```
Docker Compose 
```
docker-compose up --build
```
localhost:3000/home
