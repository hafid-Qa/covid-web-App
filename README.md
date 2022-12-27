# CovidApp-ExpressJS

A web app to monitor the latest statistics about cases of covid-19 in the world.
Back-end with ExpressJs and PUG as template engine.Front-end with pure JS.
The covid data is from API(https://covid-19.dataflowkit.com).

There are three pages:

/home: A static page that provides general information about the service.

/statistics: Dynamically generated and contain the following displays:

- Dropdown from which the user can pick a country or the world
- A map that shows which country is currently selected.
- A table displaying the different statistics for the world or the selected country.

/contact: To send a message in case a user wants to ask for an inquiry.

## Getting Started

### Setup

### ENV Variables
```
#Create .env file
touch .env

#Inside .env, set these variables.
GOOGLE_USER=your_own_email
GOOGLE_APP_PASS=your_own_password_or_app_key
RECEIVER_EMAIL=receiving_email
```

### On local environment

```
#Install JS packages
yarn install
or
npm install

#Run a server Localhost:3000/home
npm or yarn start
or
npm or yarn run dev # this is with nodemon
```

### Building With Docker

```
#Build an image
docker build -t <name of your app image> .

#Run the server
docker run -p <your preferred port>:3000 <the name of the app image>
```

Using Docker Compose

```
docker-compose up --build

#open localhost:3000/home
```


