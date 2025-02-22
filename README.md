[![PeerPrep](https://github.com/cadencjk/PeerPrep/assets/63772723/bd4f7cd3-dec6-4fe8-8b40-3b21e4673ce1)](https://www.youtube.com/watch?v=uMWTDqz8u5Q&ab_channel=CadenCheong)

# PeerPrep

Welcome to PeerPrep, your ultimate solution for mastering technical interviews through the power of collaboration! 

Access it here: [http://peerprep.online/](http://peerprep.online/)

# Application Installation and Setup

Click for instructions for the respective modes:

- [Running Locally](docs/LocalHosting.md)
- [Running via Docker](docs/Containerization.md)

# Resources for Developer / Tester

## Software

For development, you may also want to install:

- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- [Docker Desktop](https://www.docker.com/get-started/)
- [Postman](https://www.postman.com/downloads/)

## Documentation

- [API Endpoints](docs/ApiEndpoints.md)
- [Local Setup for RabbitMQ Server](docs/LocalRabbitMqSetup.md)
- [Local Setup for Redis Server](docs/LocalRedisSetup.md)
- [Containerization](docs/Containerization.md)
- [Test Accounts](docs/TestAccounts.md)

## Micro-services

You can start individual services separately to test them.

However, as there are dependencies among the services,
they might not function normally standalone.

Run them in different terminals:

- Auth service: `npm run start:auth`
- User service: `npm run start:user`
- Question service: `npm run start:question`
- Match service: `npm run start:match`
- Collaboration Service: `npm run start:collab`
- History Service: `npm run start:history`
- Execution Service: `npm run start:execution`
- Frontend: `npm run start:frontend`

---

**For clarifications, do leave your questions at [Feedback PR](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g32/pull/1) created in our repository.**
