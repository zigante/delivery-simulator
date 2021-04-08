package main

import (
	"fmt"
	"log"

	confluentKafka "github.com/confluentinc/confluent-kafka-go/kafka"
	dotenv "github.com/joho/godotenv"
	kafkaApp "github.com/zigante/code-delivery/simulator/app/kafka"
	kafka "github.com/zigante/code-delivery/simulator/infra/kafka"
)

func init() {
	err := dotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	messageChannel := make(chan *confluentKafka.Message)
	consumer := kafka.NewKafkaConsumer(messageChannel)

	go consumer.Consume()

	for message := range messageChannel {
		fmt.Println(string(message.Value))
		go kafkaApp.Produce(message)
	}
}
