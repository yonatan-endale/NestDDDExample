import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(), // Automatically loads mikro-orm.config.ts
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
