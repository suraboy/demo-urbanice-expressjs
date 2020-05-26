Urbanice (Express js)
======

NOTE
----
The master branch will always contain the latest stable version. If you wish to check older versions or newer ones currently under development, please switch to the relevant branch.

Get Started
-----------

Application flow pattern:
---------------------
https://github.com/suraboy/urbanice-expressjs.git

Run the docker for development:
---------------------
First you need to copy `.env.local` to `.env` for setup environment of appplication

You can now build, create, start, and attach to containers to the environment for your application. To build the containers use following command inside the project root:

```bash
docker-compose build
```

To start the application and run the containers in the background, use following command inside project root:

```bash
docker-compose up -d
```
```bash
docker-compose down
```

Installing Dependencies via Composer
------------------------------------
Run the composer installer:

```bash
docker exec -it urbanice_node npm install
```
or
```bash
docker exec -it urbanice_node npm update
```

Running Application
------------------------------------
Open the browser
```bash
http://localhost:5319
```

Running Database
------------------------------------
Open the browser and create database name `urbanice`
and run command sql in database/database.sql
```bash
http://localhost:5880/
```

