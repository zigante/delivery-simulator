import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Route, RouteSchema } from './entities/route.entity';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { RoutesGateway } from './routes.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Route.name, schema: RouteSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: { clientId: process.env.KAFKA_CLIENT_ID, brokers: [process.env.KAFKA_BROKER] },
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
