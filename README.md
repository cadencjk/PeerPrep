[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# Assignment 5 - Matching

We used Docker to containerize our various micro-services which serves our combined application.

The combined application contains qualities of:
* Question Repository Application
* User Profile Management Application
* Matchmaking Application

We have various micro-services including:
* MySQL Database
* User Service
* Auth Service
* Question Service
* Match Service
* Collaboration Service
* Frontend Service (Web UI)

Additional Notes:

If you are not using Windows OS, and would like a equivalent instruction for a differnt OS, do reach out to us for clarification.

**For clarifications, do leave your questions at [Feedback PR](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g32/pull/1) created in our repository.**

# Requirements

## Network

Internet connection is required.

**[ IMPORTANT! ]** Do _not_ test while on NUS grounds or connected
(either directly or indirectly) to NUS Wifi.
(NUS networks blocks MongoDB which is required by our application.)

## Software
Download and install these software if you do not have them locally.

- [Docker Desktop](https://www.docker.com/get-started/)

**Ensure that MySQL Server is NOT running locally.**

# Testing

For clarity, the commands given below should be executed at the root directory if not specified otherwise.

_The commands below are provided for convenience and may be incorrect.
Do reach out to us for clarification if necessary._

## Pre-testing Set up

### Clone repository

Clone the repository locally to your device (laptop/computer).

```shell
git clone https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g32.git
```

Note: If the above not work, please use the correct link or download the source code directly from the release.

### Setup environment variables

Duplicate `template.env` as `.env` at the root directory.

```shell
cp template.env .env
```

### Start Docker Daemon

Start the docker daemon by opening _Docker Desktop_.
If _Docker Desktop_ does not support your OS, do reach out to clarify how to start the docker daemon.

To check that the daemon has started, open a terminal and check the version.

```shell
docker version
```

It should output something like
```
Client:
 Cloud integration: v1.0.35+desktop.5
 Version:           24.0.6
 API version:       1.43
 Go version:        go1.20.7
 Git commit:        ed223bc
 Built:             Mon Sep  4 12:32:48 2023
 OS/Arch:           windows/amd64
 Context:           default

Server: Docker Desktop 4.24.2 (124339)
 Engine:
  Version:          24.0.6
  API version:      1.43 (minimum version 1.12)
  Go version:       go1.20.7
  Git commit:       1a79695
  Built:            Mon Sep  4 12:32:16 2023
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.6.22
  GitCommit:        8165feabfdfe38c65b599c4993d227328c231fca
 runc:
  Version:          1.1.8
  GitCommit:        v1.1.8-0-g82f18fe
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```

## Testing

### Dockered Microservices

At the root directory, open a terminal
to create and start containers of the micro-services.

```shell
docker compose up -d
```

It may take a few minutes for the inital build as it needs to download the images online.
The frontend would only be available after the containers are running.

### Frontend Application

Locally, open a web browser and go to [http://localhost:3000](http://localhost:3000).

### Sample Accounts

By default, we have created 2 accounts as part of the fresh database. These accounts are for testing purposes, and would not be avilable for production.

| Email          | Password | Remarks                                  |
| -------------- | -------- | ---------------------------------------- |
| admin@test.com | password | Has admin rights. Regard as a superuser. |
| user@test.com  | password | Normal user. Cannot manage other users.  |

Note: if you delete these accounts via the user profile management functionalities, you may have from restart the pre-testing steps to get back the accounts.

### Optional Testing of API endpoints

If you wish to test individual microservice's API, you can refer to our [API endpoints](API_Endpoints.md).

## Post-testing

After testing, open a terminal at the root directory
to stop and remove the containers of the micro-services.

```shell
docker compose down
```
