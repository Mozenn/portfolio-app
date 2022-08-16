---
id: spring-boot-cli-bootstrap
title: Quickly bootstrap a new Spring Boot project with the Spring CLI
bannerPath: /images/post/spring-boot-cli-bootstrap/thumbnail.png
priority: 2
tags: ['Java', 'Spring']
author: Gauthier
date: 14 August 2022
description: Generating a Spring Boot project can be made through various means, each having its own use case depending on your situation. In this article, we will use the CLI to generate a new Spring Boot Project.
---

Generating a Spring Boot project can be made through various means, each having its own use case depending on your situation.

You can use [the Spring Initializr web UI](<[https://start.spring.io/](https://start.spring.io/)>) which is beginner-friendly and perfect to get an overview of what is available.

You can also generate your project inside your favorite IDE like [Eclipse](<[https://www.eclipse.org/community/eclipse_newsletter/2018/february/springboot.php](https://www.eclipse.org/community/eclipse_newsletter/2018/february/springboot.php)>) or [Intellij](<[https://www.jetbrains.com/help/idea/spring-boot.html](https://www.jetbrains.com/help/idea/spring-boot.html)>) by using plugins.

And finally, you can generate your project without leaving your shell with the Spring CLI, and that is what we are going to do.

In this article, we will use the CLI to generate a new Spring Boot Project.

## Installing the CLI

Before generating anything, we need to install the Spring CLI on our machine.

For that, you can check out Spring official documentation [https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started.installing.cli](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started.installing.cli).

It shows how to install the CLI manually or by using sdkman. Do as you want, but I strongly advise you to use sdkman!

With it, installing the CLI is as simple as typing a single command, and you are good to go.

```bash
$ sdk install springboot
$ spring --version
Spring CLI v2.7.1
```

## Bootstrapping the project

We are now ready to bootstrap our project.

Let’s say that we are asked to build a simple REST API exposing simple CRUD operations.

For that, we will need the following dependencies :

- a web layer to build the HTTP endpoints and provide the interface to be used by client applications
- a data layer to access the database and persist the clients’ operations

On top of that, this REST API needs to be at the cutting edge, so it will use Java 17 and it will be a Gradle project.

Great, we know what we want to build and what is needed to build it, but how do we know what is available to us?

To know what the Spring CLI can provide, we can use the following command.

```bash
$ spring init --list
.   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
:: Service capabilities ::  https://start.spring.io

Supported dependencies
+--------------------------------------+--------------------------------------------------------------+-------------------------------+
| Id                                   | Description                                                  | Required version              |
+--------------------------------------+--------------------------------------------------------------+-------------------------------+
| activemq                             | Spring JMS support with Apache ActiveMQ 'Classic'.           | >=2.0.0.RELEASE and <3.0.0-M1 |
|...                                   |                                                              |                               |
| websocket                            | Build WebSocket applications with SockJS and STOMP.          |                               |
+--------------------------------------+--------------------------------------------------------------+-------------------------------+

Project types (* denotes the default)
+-----------------+------------------------------------------+-----------------------------+
| Id              | Description                              | Tags                        |
+-----------------+------------------------------------------+-----------------------------+
| gradle-build    | Generate a Gradle build file.            | build:gradle,format:build   |
| gradle-project  | Generate a Gradle based project archive. | build:gradle,format:project |
| maven-build     | Generate a Maven pom.xml.                | build:maven,format:build    |
| maven-project * | Generate a Maven based project archive.  | build:maven,format:project  |
+-----------------+------------------------------------------+-----------------------------+

Parameters
+-------------+------------------------------------------+------------------------------+
| Id          | Description                              | Default value                |
+-------------+------------------------------------------+------------------------------+
| artifactId  | project coordinates (infer archive name) | demo                         |
| bootVersion | spring boot version                      | 2.7.1                        |
| description | project description                      | Demo project for Spring Boot |
| groupId     | project coordinates                      | com.example                  |
| javaVersion | language level                           | 17                           |
| language    | programming language                     | java                         |
| name        | project name (infer application name)    | demo                         |
| packageName | root package                             | com.example.demo             |
| packaging   | project packaging                        | jar                          |
| type        | project type                             | maven-project                |
| version     | project version                          | 0.0.1-SNAPSHOT               |
+-------------+------------------------------------------+------------------------------+
```

We get a list of all available dependencies, project types, and project parameters that we can specify during the project bootstrap.

For the web layer, we are using the web dependency that contains Spring MVC and other web-related dependencies.

For the data layer, we are using the data-jpa dependency that contains Spring data with Hibernate as Implementation of the JPA.

And finally, we need to get the required JDBC driver to connect to our database.

Let’s say that we have chosen PostgreSQL as our database of choice.

We thus need to get the postgresql dependency.

The goal of this article is not to show all available dependencies, so let’s keep it at that for today.

We can now run the command to bootstrap our project.

```bash
$ spring init --dependencies=web,data-jpa,postgresql --java-version=17 --build=gradle spring-boot-cli
Using service at https://start.spring.io
Project extracted to '/home/mohzen/dev/spring-boot-cli'
```

Let’s check out the resulting project.

```bash
$ cd spring-boot-cli/
$ ll
total 44
drwxr-xr-x  4 mohzen mohzen 4096 Jul 13 22:16 ./
drwxr-xr-x 18 mohzen mohzen 4096 Jul 13 22:16 ../
-rw-r--r--  1 mohzen mohzen  444 Jul 13 22:16 .gitignore
-rw-r--r--  1 mohzen mohzen 1397 Jul 13 22:16 HELP.md
-rw-r--r--  1 mohzen mohzen  559 Jul 13 22:16 build.gradle
drwxr-xr-x  3 mohzen mohzen 4096 Jul 13 22:16 gradle/
-rwxr-xr-x  1 mohzen mohzen 8070 Jul 13 22:16 gradlew*
-rw-r--r--  1 mohzen mohzen 2763 Jul 13 22:16 gradlew.bat
-rw-r--r--  1 mohzen mohzen   37 Jul 13 22:16 settings.gradle
drwxr-xr-x  4 mohzen mohzen 4096 Jul 13 22:16 src/
```

And that is it! We are now ready to start building our application.
