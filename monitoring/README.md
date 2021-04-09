# My Delivery - Monitoring

## Description

Repository including Kafka + Elasticsearch

## Running The Applications

##### Docker containers

```sh
docker-compose up -d
```

You should open 2 simultaneous terminals (Kafka Producer and Kafka Consumer)

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
