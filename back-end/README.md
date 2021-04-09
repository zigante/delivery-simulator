# My Delivery - Back-end Application

## Description

Repository built using Typescript + Nestjs + Websockets + Kafka + MongoDB + Docker

## Before Running

**Important**: [`Make sure that the Simulator is already running in the background`](../simulator/README.md)

Install all the dependencies

```bash
yarn
```

Make sure you have all the environment variables configured in your developer environment:

| Name                    |     | Description                    |     | Default Value                                |
| ----------------------- | --- | ------------------------------ | --- | -------------------------------------------- |
| KAFKA_CLIENT_ID         |     | Kafka client ID                |     | my-delivery                                  |
| KAFKA_BROKER            |     | Kafka server host              |     | host.docker.internal:9094                    |
| KAFKA_CONSUMER_GROUP_ID |     | Group ID that will be consumed |     | -                                            |
| MONGO_DSN               |     | MongoDB connection string      |     | mongodb://root:root@db/nest?authSource=admin |

## Running The Application

Start MongoDB and the Nestjs server using Docker

##### Docker containers

```sh
docker-compose up -d
```

List all the available routes

```http
http://localhost:3000/routes
```

Start the delivery from a specific route

```http
http://localhost:3000/routes/{routeId}/start
```
