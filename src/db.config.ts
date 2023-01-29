import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import { User } from './user/entity/user.entity';

export const DBConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'learn-nestjs',
  synchronize: true, // development only
  entities: [User],
};
