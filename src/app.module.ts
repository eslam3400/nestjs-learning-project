import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DBConfig } from './db.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot(DBConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
