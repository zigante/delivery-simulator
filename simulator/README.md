# Delivery Simulator - Routes and Destinations Simulator

## Description

Repository built using Golang + Kafka

## Before Running

**Important**: [`Monitoring Applications should been running first of all.`](../monitoring/README.md)

Make sure you have all the environment variables configured in your developer environment:

| Name                         |     | Description                    |     | Default Value             |
| ---------------------------- | --- | ------------------------------ | --- | ------------------------- |
| KAFKA_BOOTSTRAP_SERVERS      |     | Kafka server host              |     | host.docker.internal:9094 |
| KAFKA_CONSUMER_GROUP_ID      |     | Group ID that will be consumed |     | simulator                 |
| KAFKA_PRODUCE_TOPIC          |     | Kafka writing topic            |     | route.new-position        |
| KAFKA_READ_TOPIC             |     | Kafka reading topic            |     | route.new-direction       |
| CONFLUENT_SECURITY_PROTOCOL  |     |                                |     | "SASL_SSL"                |
| CONFLUENT_SASL_MECHANISMS    |     |                                |     | "PLAIN"                   |
| CONFLUENT_CLUSTER_API_KEY    |     | Cluster username               |     | -                         |
| CONFLUENT_CLUSTER_API_SECRET |     | Cluster password               |     | -                         |

## Running The Application

```sh
go run main.go
```

Send one of the following payloads to [kafka producer](../monitoring/README.md) app (`paste at bash terminal`) and see the message been proccessed in real-time:

```json
{"clientId":"a","routeId":"1"}
{"clientId":"b","routeId":"2"}
{"clientId":"c","routeId":"3"}
```
