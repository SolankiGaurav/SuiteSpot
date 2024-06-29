import { Module } from '@nestjs/common';
import { MaintenanceRequestModule } from '../modules/maintenance-request/maintenance-request.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [
    MaintenanceRequestModule,
    MongooseModule.forRoot(
      environment.MONGO_URI
    ),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
