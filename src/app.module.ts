import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';

@Module({
  imports: [ConfigModule.forRoot(),     // for loading the .env file
            AuthModule, 
            UserModule,
            MongooseModule.forRoot(process.env.MONGODB_URL as string),
            CourseModule 
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
