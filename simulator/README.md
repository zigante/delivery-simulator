# My Delivery - Routes and Destinations Simulator

## Description

Repository built using Golang + Apache Kafka + Docker

**Important**: Apache Kafka Application should been running first of all.

## Configuring /etc/hosts

The communication between applications take place directly through the machine's network
For this it is necessary to configure a host that all Docker containers can access.

make sure you have the following line in the file:

- /etc/hosts - For Linux
- C:\Windows\system32\drivers\etc\hosts - For Windows

```
127.0.0.1 host.docker.internal
```

## Before Running

Make sure you have all the environment variables configured in your developer environment:

| Name                    |     | Description                    |     | Default Value             |
| ----------------------- | --- | ------------------------------ | --- | ------------------------- |
| KAFKA_BOOTSTRAP_SERVERS |     | Kafka server host              |     | host.docker.internal:9094 |
| KAFKA_CONSUMER_GROUP_ID |     | Group ID that will be consumed |     | simulator                 |
| KAFKA_PRODUCE_TOPIC     |     | Kafka writing topic            |     | route.new-position        |
| KAFKA_READ_TOPIC        |     | Kafka reading topic            |     | route.new-direction       |

## Running The Application

You should open 3 simultaneous terminals (Application, Kafka Producer and Kafka Consumer)

##### Docker containers

```sh
cd .docker/
docker-compose up -d
cd ../
```

##### Application

```sh
go run main.go
```

##### Kafka Producer

```sh
docker exec -it docker_kafka_1 bash
kafka-console-producer --bootstrap-server=localhost:9092 --topic=route.new-direction
```

##### Kafka Consumer

```sh
docker exec -it docker_kafka_1 bash
kafka-console-consumer --bootstrap-server=localhost:9092 --topic=route.new-position --group=terminal
```

Then send one of the following payloads to kafka consumer app (`paste at bash terminal`) and see the message been proccessed in real-time:

```json
{"clientId":"1","routeId":"1"}
{"clientId":"2","routeId":"2"}
{"clientId":"3","routeId":"3"}
```

### For Windows

Recommended using Docker with WSL2. Watch next: [https://www.youtube.com/watch?v=usF0rYCcj-E](https://www.youtube.com/watch?v=usF0rYCcj-E)

Quick installation guide: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart)
