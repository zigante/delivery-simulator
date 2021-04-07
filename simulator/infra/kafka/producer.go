package kafka

import (
	"log"
	"os"

	confluentKafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

func NewKafkaProducer() *confluentKafka.Producer {
	configMap := &confluentKafka.ConfigMap{
		"bootstrap.servers": os.Getenv("KAFKA_BOOTSTRAP_SERVERS"),
	}

	producer, err := confluentKafka.NewProducer(configMap)
	if err != nil {
		log.Println(err.Error())
	}

	return producer
}

func Publish(message string, topic string, producer *confluentKafka.Producer) error {
	innerMessage := &confluentKafka.Message{
		TopicPartition: confluentKafka.TopicPartition{
			Topic:     &topic,
			Partition: confluentKafka.PartitionAny,
		},
		Value: []byte(message),
	}

	err := producer.Produce(innerMessage, nil)
	if err != nil {
		return err
	}
	return nil
}
