import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Route, RouteSchema } from './entities/route.entity';
import { RoutesController } from './routes.controller';
import { RoutesGateway } from './routes.gateway';
import { RoutesService } from './routes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Route.name, schema: RouteSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: () => ({
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
              groupId: process.env.KAFKA_CONSUMER_GROUP_ID
                ? process.env.KAFKA_CONSUMER_GROUP_ID
                : 'my-consumer' + Math.random(),
            },
          },
        }),
      },
    ]),
  ],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesGateway],
})
export class RoutesModule {}
