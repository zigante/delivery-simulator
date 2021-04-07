package kafka

import (
	"fmt"
	"log"
	"os"

	confluentKafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

type KafkaConsumer struct {
	MessageChannel chan *confluentKafka.Message
}

func (kafkaConsumer *KafkaConsumer) Consume() {
	configMap := &confluentKafka.ConfigMap{
		"bootstrap.servers": os.Getenv("KAFKA_BOOTSTRAP_SERVERS"),
		"group.id":          os.Getenv("KAFKA_CONSUMER_GROUP_ID"),
	}
	consumer, err := confluentKafka.NewConsumer(configMap)
	if err != nil {
		log.Fatalf("Error consuming kafka message:" + err.Error())
	}

	topics := []string{os.Getenv("KAFKA_READ_TOPIC")}
	consumer.SubscribeTopics(topics, nil)
	fmt.Println("Kafka consumer has been started")
	for {
		message, err := consumer.ReadMessage(-1)
		if err == nil {
			kafkaConsumer.MessageChannel <- message
		}
	}
}

func NewKafkaConsumer(messegaChannel chan *confluentKafka.Message) *KafkaConsumer {
	return &KafkaConsumer{
		MessageChannel: messegaChannel,
	}
}
