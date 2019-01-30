# Nihal Capstone Project
## Getting Started
These are instructions on how to get a copy of the Nihal capstone project up and running on your local machine for development and testing purposes. Please ensure the latest version of the following are installed before proceeding with the rest of the setup.
- [Node.js](https://nodejs.org/en/download/) 
- [MySQL](https://www.mysql.com/downloads/)

### Requirements and Setup
First, install the nihal_capstone project your machine. Enter the command below into the terminal. 
```
> git clone https://github.com/bryankle/nihal_capstone/
```
Navigate into the project directory
```
> cd nihal_capstone
```
Install server dependencies
```
Inside /nihal_capstone
> npm install
```
Install client dependencies
```
Navigate to client folder and install
> cd client
> npm install
```
Initializing the database
```
Start mysql
> mysql -u root -p
Enter password
```
Create and set new database for this project
```
> CREATE DATABASE nihal;
> USE nihal;
```
Seeding the database

```
Copy and paste contents of file /nihal_project/server/database/seed.sql into mysql database
```
Connect the database to the server
```
Navigate to /nihal_project/server/database/dbcon.js and fill database credentials
```

After the database has been created, seed the database using the file 'seed.sql'.

### Running the Application
Navigate back to the main folder /nihal_project/
```
> npm start
```
