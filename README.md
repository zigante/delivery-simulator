# My Delivery

## Description

Delivery simulator built using Golang + Typescript + Nestjs + ReactJS + Websockets + Kafka + Kafka Connector + MongoDB + Docker + Elasticsearch + K8s

## Configuring /etc/hosts

The communication between applications take place directly through the machine's network
For this it is necessary to configure a host that all Docker containers can access.

make sure you have the following line in the file:

- /etc/hosts - For Linux
- C:\Windows\system32\drivers\etc\hosts - For Windows

```
127.0.0.1 host.docker.internal
```

## Applications

### [Kafka Applications](./monitoring/kafka/README.md)

### [Elasticsearch Applications](./monitoring/elasticsearch/README.md)

### [Simulator](./simulator/README.md)

### [Backend Application](./back-end/README.md)

### [Frontend Application](./front-end/README.md)

### For Windows

Recommended using Docker with WSL2. Watch next: [https://www.youtube.com/watch?v=usF0rYCcj-E](https://www.youtube.com/watch?v=usF0rYCcj-E)

Quick installation guide: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart)
