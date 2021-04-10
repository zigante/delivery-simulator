package kafka

import (
	"encoding/json"
	"log"
	"os"
	"time"

	confluentKafka "github.com/confluentinc/confluent-kafka-go/kafka"
	route "github.com/zigante/delivery-simulator/app/route"
	"github.com/zigante/delivery-simulator/infra/kafka"
)

func Produce(message *confluentKafka.Message) {
	producer := kafka.NewKafkaProducer()
	innerRoute := route.NewRoute()
	json.Unmarshal(message.Value, &innerRoute)
	innerRoute.LoadPositions()

	positions, err := innerRoute.ExportJSONPositions()
	if err != nil {
		log.Println(err.Error())
	}

	for _, position := range positions {
		kafka.Publish(position, os.Getenv("KAFKA_PRODUCE_TOPIC"), producer)
		time.Sleep(time.Millisecond * 500)
	}
}
