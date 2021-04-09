# My Delivery - Routes and Destinations Simulator

## Description

Repository including Kafka applications

## Running The Applications

You should open 2 simultaneous terminals (Kafka Producer and Kafka Consumer)

##### Docker containers

```sh
docker-compose up -d
```

##### Kafka Producer

```sh
docker exec -it kafka bash
kafka-console-producer --bootstrap-server=localhost:9092 --topic=route.new-direction
```

##### Kafka Consumer

```sh
docker exec -it kafka bash
kafka-console-consumer --bootstrap-server=localhost:9092 --topic=route.new-position --group=terminal
```
