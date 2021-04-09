# My Delivery - Routes and Destinations Simulator

## Description

Repository built using Golang + Kafka

## Before Running

**Important**: [`Kafka Applications should been running first of all.`](../kafka/README.md)

Make sure you have all the environment variables configured in your developer environment:

| Name                    |     | Description                    |     | Default Value             |
| ----------------------- | --- | ------------------------------ | --- | ------------------------- |
| KAFKA_BOOTSTRAP_SERVERS |     | Kafka server host              |     | host.docker.internal:9094 |
| KAFKA_CONSUMER_GROUP_ID |     | Group ID that will be consumed |     | simulator                 |
| KAFKA_PRODUCE_TOPIC     |     | Kafka writing topic            |     | route.new-position        |
| KAFKA_READ_TOPIC        |     | Kafka reading topic            |     | route.new-direction       |

## Running The Application

```sh
go run main.go
```

Send one of the following payloads to kafka consumer app (`paste at bash terminal`) and see the message been proccessed in real-time:

```json
{"clientId":"1","routeId":"1"}
{"clientId":"2","routeId":"2"}
{"clientId":"3","routeId":"3"}
```
