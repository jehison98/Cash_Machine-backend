# Cash_Machine-backend

Tech chanllenge for OmniDoc

## First Step

You need to have installed PostgreSQL and NodeJs

If you dont have one or both of this technologies installed you can go here

Link for [NodeJS](https://nodejs.org/es/)
Link for [PostgreSQL](https://www.postgresql.org/)

## Second Step

You need to download the repository or if you have installed Git you can clone the repository

Comand to clone the repository --> git clone https://github.com/jehison98/Cash_Machine-backend.git

## Third Step
Open your favorite IDE, open the repository folder and in the main route create a filde called .env

inside the .env create a variables with this structure: 

SECRET_JWT_SEED=YourSecretSeed

DB_USER=YourPostgresUser

DB_PASSWORD=YourPostgresPassword

DB_HOST=localhost

DB_NAME=cash_machine

## Fourth Step

One time you have downloaded the repository and have created file .env go to yor terminal and go to the route where the repository is.

One time you are in the repositry route execute the next comand: npm install

This command will download all the dependencies so that the application can work

## Last Step
When the npm install finished in your terminal in the repository route exceute this comand:

### `npm start`

Finally go to your favorite browser and go to http://localhost:3000/ and you can see the app
