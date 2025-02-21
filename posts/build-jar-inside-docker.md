---
id: build-jar-inside-docker
title: Build a .jar file inside a Docker container with Maven
bannerPath: /images/post/build-jar-inside-docker/thumbnail.png
priority: 2
tags: ['Java', 'Maven', 'Docker']
author: Gauthier
date: 15 February 2022
description: Containers have become very popular during the last few years thanks to the rise of Docker. The most common use case is to run an application in isolation, be it in a development environment or a production environment. But it can also be used for more specific use cases. In this article, we are going to build a jar file inside a docker container.
---

Containers have become very popular during the last few years thanks to the rise of Docker. The most common use case is to run an application in isolation, be it in a development environment or a production environment. But it can also be used for more specific use cases.

In this article, we are going to build a jar file inside a docker container.

This use case is not very common, but using docker as a wrapper to build an artifact in isolation can be quite handy, the main benefit being to avoid setting a dedicated environment on the host machine to build the artifact. You also avoid filling your host machine by downloading the libraries and packages required by your application.

Now that we know the why, let’s check out the how !

## Project setup

The first step is to generate a toy project for demonstration purposes.

As we are using maven as a build tool, we can use the quickstart maven archetype to generate the maven project.

```bash
mvn archetype:generate -DgroupId=com.mozen.jardocker -DartifactId=build-jar-inside-docker -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

We get a basic maven project with the following structure :

![project_structure.png](/images/post/build-jar-inside-docker/project_structure.png)

We edit the pom.xml file to generate an executable jar with dependencies :

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.mozen.jardocker</groupId>
  <artifactId>build-jar-inside-docker</artifactId>
  <version>1.0-SNAPSHOT</version>
  <name>build-jar-inside-docker</name>
  <url>http://maven.apache.org</url>

  <properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
    <maven-compiler-plugin.version>3.8.1</maven-compiler-plugin.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <artifactId>maven-jar-plugin</artifactId>
        <version>3.2.2</version>
        <executions>
          <execution>
            <id>default-jar</id>
            <phase>none</phase>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-assembly-plugin</artifactId>
        <configuration>
          <finalName>build-jar-inside-docker-${project.version}</finalName>
          <appendAssemblyId>false</appendAssemblyId>
          <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
          </descriptorRefs>
          <archive>
            <manifest>
              <mainClass>com.mozen.jardocker.App</mainClass>
            </manifest>
          </archive>
        </configuration>
        <executions>
          <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
              <goal>single</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>
```

We have specified the target and source version of the jdk for our project with the properties maven.compiler.source and maven.compiler.target.

The maven-assembly-plugin is used to generate the jar with all required dependencies as well as the manifest file, to indicate the main entry class. It is bound to the package phase so that it is executed during the package phase of the maven lifecycle.

We set the appendAssemblyId element to false to prevent the addition of the “jar-with-dependencies” suffix to the name of our jar, and only rely on the finalName attribute to define it.

We also specify the maven-jar-plugin, not to generate the jar file but rather to prevent a second jar to be generated. By default, this second jar won’t have any dependencies and manifest, that’s why we prefer to use the maven-assembly-plugin that packages them by default.

That’s it for the project. Let’s now set up our docker build configuration.

## Dockerfile setup

We first create a dockerfile to define the image of the container on which the jar file will be built :

```docker
FROM maven:3.8.2-jdk-11

COPY . .

RUN mvn clean package
```

As you can see, it is surprisingly short. We base the image from the official maven image available on docker hub [https://hub.docker.com/\_/maven?tab=description](https://hub.docker.com/_/maven?tab=description).

We use the JDK 11 based image so that it stays consistent with the JDK version used for the previously generated project.

Then, we copy our project into the container. Here the first ‘.’ defines the source path from our host, which is where the Dockerfile is located, and the second ‘.’ defines the target path in the container, which is the WORKDIR, equal to the root path ‘/’ by default.

To sum up, it means that we take the entire project directory and we copy it inside the container.

We also make use of a .dockerignore file to prevent copying useless files and folders such as IDE-related files or git-related files:

```docker
.idea
.git
.gitignore
*/target
README.md
```

This file plays the same role as a .gitignore file, meaning that docker will not copy the specified files and folders when the building is done, thus improving the speed performance and decreasing the size of the container.

The final step is to create a script that makes the entire build workflow a single command process :

```bash
#! /bin/bash

if [ -d "./target/" ]
then
	rm -r target/
fi
docker build -t build-jar-inside-docker-image .
docker create -it --name build-jar-inside-docker build-jar-inside-docker-image bash
docker cp build-jar-inside-docker:/target ./target
docker rm -f build-jar-inside-docker
```

We first build the docker image from our Dockerfile using the docker build command. The -t is used to specify the image tag, and the ‘.’ to specify where the Dockerfile is located.

We then create a container based on the newly built image.

The third command will run only once the container has been created and the .jar has been built. It simply copies the /target folder generated during the build from the container to the host.

The final step is to delete the previously built container, so that our script is idempotent, meaning it will produce the same result each time we execute it. Without this step, we would get an error if we run the script multiple times because the container name “build-jar-inside-docker” would already exist.

For the same purpose, we clear the target folder at each execution to avoid any error caused by an already existing target folder.

## Building the jar

We can finally build our jar using a single command line :s

```bash
sh build.sh
```

```bash
mohzen@DESKTOP-BDASKRH:~/dev/build-jar-inside-docker$ ll target/
total 40
drwxr-xr-x 9 mohzen mohzen 4096 Feb  2 22:20 ./
drwxr-xr-x 6 mohzen mohzen 4096 Feb  2 22:20 ../
drwxr-xr-x 2 mohzen mohzen 4096 Feb  2 22:20 archive-tmp/
-rw-r--r-- 1 mohzen mohzen 1138 Feb  2 22:20 build-jar-inside-docker-1.0-SNAPSHOT.jar
drwxr-xr-x 3 mohzen mohzen 4096 Feb  2 22:20 classes/
drwxr-xr-x 3 mohzen mohzen 4096 Feb  2 22:20 generated-sources/
drwxr-xr-x 3 mohzen mohzen 4096 Feb  2 22:20 generated-test-sources/
drwxr-xr-x 3 mohzen mohzen 4096 Feb  2 22:20 maven-status/
drwxr-xr-x 2 mohzen mohzen 4096 Feb  2 22:20 surefire-reports/
drwxr-xr-x 3 mohzen mohzen 4096 Feb  2 22:20 test-classes/
```

And that’s it!

As I said at the start of this article, this pattern is not relevant in most use cases, but it is always a nice addition to our software engineer toolbox.

You can access the demo project for this blog post here [https://github.com/Mozenn/build-jar-inside-docker](https://github.com/Mozenn/build-jar-inside-docker).
