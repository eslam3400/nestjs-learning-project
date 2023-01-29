import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './db.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(DBConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
