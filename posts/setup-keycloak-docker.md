---
id: setup-keycloak-docker
title: How to set up Keycloak with Docker and PostgreSQL
bannerPath: /images/post/setup-keycloak-docker/thumbnail.png
priority: 1
tags: ["Keycloak", "DevOps"]
author: Gauthier
date: 15 December 2021
description: In this blog post, we are going to learn how to run Keycloak inside docker, using a dedicated PostgreSQL database also running in a docker container.
---

In this blog post, we are going to learn how to run Keycloak inside docker, using a dedicated PostgreSQL database also running in a docker container.

This setup is mostly designed to be used in a development environment, but it is a good starting point for a production environment using a microservice architecture.

To use this setup on your own machine, you will need Docker and Docker compose. Check out the documentation to have a walkthrough on how to install docker on your favorite OS [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).

Let's start right off by setting up the PostgreSQL database.

## Setup PostgreSQL with docker

In our setup, we use PostgreSQL as a database for Keycloak to persist data such as users, clients or realms and replace the H2 database provided by default.

We run our PostgreSQL instance in a Docker container, using the official PostgreSQL image provided on Docker Hub.

We use Docker compose to ease our multi-container setup by defining the PostgreSQL instance in a docker-compose.yml file.

```docker
version: "3.9"
services:
  postgres:
    container_name: postgres_blog
    image: "postgres:13.2"
    volumes:
      - ./db-data:/var/lib/postgresql/data/
      - ./sql:/docker-entrypoint-initdb.d/:ro
    env_file:
     - ./database.dev.env
    networks:
      - backend
    ports:
      - "5432:5432"
  pgadmin:
    container_name: pgadmin_blog
    image: "dpage/pgadmin4:5.1"
    env_file:
      - ./database.dev.env
    ports:
      - "5050:80"
    networks:
      - backend
```

There are several things going on here. Let's explain them one by one.

We first define volumes to mount data into the container as well as to persist data on the host.

Here, we provide both a source and a target path, making those volumes bind mounts. This type of volume is fine for a dev environment, but using named volumes or copying files directly in the container is more advised for production environment, except if you want full control of your filesystem, and apply modifications outside docker.

The first bind mount is used to persist data even if the container is stopped. The second one mounts files to initialize the Keycloak and application databases.

The first two scripts are only necessary if you want to store application-related data in the same database as the Keycloak one.

```bash
#!/bin/bash

psql -U dev -tc "SELECT 1 FROM pg_database WHERE datname = 'app'" \
| grep -q 1 || psql -U dev -c "CREATE DATABASE app"
```

Unlike MySQL-like databases, PostgreSQL does not have a CREATE DATABASE IF EXIST statement.

As a workaround, we use a bash script to run a psql command that creates the database if it does not exist. Here the double pipe means that the CREATE DATABASE psql command will be run only if the grep command does not succeed.

```sql
\c app;

DROP TABLE IF EXISTS Member;

CREATE TABLE Member (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS Post;

CREATE TABLE Post (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    scientificName VARCHAR(50) NOT NULL,
    family VARCHAR(32) NOT NULL,
    rating NUMERIC(3,2) DEFAULT 0.5,
    authorId VARCHAR(50),
    createdAt TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_member FOREIGN KEY(authorId) REFERENCES Member(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);
```

the second script is more straightforward. It simply initializes the application database schema.

```bash
#!/bin/bash

psql -U dev -tc "SELECT 1 FROM pg_database WHERE datname = 'keycloak'" \
| grep -q 1 || psql -U dev -c "CREATE DATABASE keycloak"

psql -U dev -c "CREATE USER keycloak WITH PASSWORD 'kc'"
```

In the last one, we create the Keycloak database in a similar fashion as the application database.

We also create a new user that will be used by Keycloak to get access to the database. It is a good security practice to define a dedicated user for specific usage and not use the default superuser.

The .env file is used to define environment variables listed in the docker hub page to indicate the user to create by default, defined in the previous script :

```json
POSTGRES_USER="dev"
POSTGRES_PASSWORD="pwd"
```

In addition, we define a pgAdmin service. It provides an easy-to-use User Interface and prevents entering the container directly to query the database using the command line.

We just need to add two new environment variables to define the default login to access the UI.

```json
POSTGRES_USER="dev"
POSTGRES_PASSWORD="pwd"
PGADMIN_DEFAULT_EMAIL="user@domain.local"
PGADMIN_DEFAULT_PASSWORD="admin"
```

## Setup Keycloack with docker

Keycloak is an open-source identity and management solution developed by Red Hat. It is a robust alternative to SaaS products such as Auth0 or cloud services such as Firebase or AWS Cognito, and will fulfill nearly all of your authorization or authentication needs. If you still have specific needs not covered by the default implementation, Keycloak provides many Service Provider Interfaces to plug your own custom providers.

If you want to learn more about Keycloak, check out the official documentation [https://www.keycloak.org/](https://www.keycloak.org/)

The first step is to complete our docker-compose file by adding the keycloak service

```docker
version: "3.9"
services:
  postgres:
    container_name: postgres_blog
    image: "postgres:13.2"
    env_file:
      - ./database.dev.env
    networks:
      - backend
    volumes:
      - ./db-data:/var/lib/postgresql/data/
      - ./sql:/docker-entrypoint-initdb.d/:ro
    ports:
      - "127.0.0.1:5432:5432"
  pgadmin:
    container_name: pgadmin_blog
    image: "dpage/pgadmin4:5.1"
    env_file:
      - ./database.dev.env
    ports:
      - "127.0.0.1:5050:80"
    networks:
      - backend
  keycloak:
    container_name: keycloak_blog
    image: "jboss/keycloak:15.0.2"
    depends_on:
      - "postgres"
    env_file:
      - ./keycloak.dev.env
    ports:
      - "127.0.0.1:8180:8080"
      - "127.0.0.1:8787:8787" # debug port
    networks:
      - backend

networks:
  backend:
    name: backend
    driver: bridge
```

No need to define new volumes here, we only need to map the 8080 port to access Keycloak from the host, as well as the debug port, in case we want to attach a remote debugger from our IDE for example.

In a similar way to the PostgreSQL setup, we use a .env file to set necessary environment variables.

```json
KEYCLOAK_USER=admin
KEYCLOAK_PASSWORD=password
DEBUG=true
DEBUG_PORT='*:8787'
DB_VENDOR=POSTGRES
DB_ADDR=postgres
DB_PORT=5432
DB_DATABASE=keycloak
DB_USER=keycloak
DB_PASSWORD=kc
TZ=Europe/Paris
```

All available environment variables are listed on the docker hub page of the Keycloak image [https://hub.docker.com/r/jboss/keycloak/](https://hub.docker.com/r/jboss/keycloak/).

We also create a new script to create both the Keycloak user and database.

We define all services on the same network so that every container can communicate with one another.

Here, we use the bridge mode because communication only happens on the same host.

Finally, we specify that the Keycloak service depends on the PostgreSQL one, or we will get a database connection error during the boot phase of the Keycloak container.

## Putting it all together

Now that we have created all the necessary declarations, it is time to run our setup.

Docker-compose make it easy by using a single command that bootstrap all services

```
docker-compose up -d
```

We can check that all containers are running once the startup is done

```
docker ps
```

We can now access the Keycloak back office through the port mapped in the docker-compose.yml file and by using the login previously defined in our .env file.

![keycloak_login.PNG](/images/post/setup-keycloak-docker/keycloak_login.PNG)

Once logged in, we can customize our realm by creating users, defining clients, and many other actions. I let you check the official Keycloak documentation to get a grasp of all the features that Keycloak provides.

![keycloak_home.PNG](/images/post/setup-keycloak-docker/keycloak_home.PNG)

We can also access the PostgreSQL database using pgAdmin :

![pgAdmin_login.PNG](/images/post/setup-keycloak-docker/pgAdmin_login.PNG)

We then need to set up the connection to the PostgreSQL database :

![pgAdmin_connection.PNG](/images/post/setup-keycloak-docker/pgAdmin_connection.PNG)

And finally, we can access our application schema :

![pgAdmin_query.PNG](/images/post/setup-keycloak-docker/pgAdmin_query.PNG)

The repository containing all configuration files is available here: [https://github.com/Mozenn/setup-keycloak-with-docker-and-postgresql](https://github.com/Mozenn/setup-keycloak-with-docker-and-postgresql)

## Resources

- Keycloak official documentation [https://www.keycloak.org/documentation](https://www.keycloak.org/documentation)
- Docker Keycloak image page [https://hub.docker.com/r/jboss/keycloak/](https://hub.docker.com/r/jboss/keycloak/)
- Docker networking overview [https://docs.docker.com/network/](https://docs.docker.com/network/)
