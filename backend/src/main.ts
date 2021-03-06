import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKER],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: process.env.CONFLUENT_CLUSTER_API_KEY,
          password: process.env.CONFLUENT_CLUSTER_API_SECRET,
        },
      },
      consumer: {
        groupId:
          process.env.KAFKA_CONSUMER_GROUP_ID === ''
            ? process.env.KAFKA_CONSUMER_GROUP_ID
            : 'my-consumer-' + Math.random(),
      },
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
};

bootstrap();
