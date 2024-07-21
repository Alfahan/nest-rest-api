import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
	type: 'postgres',
	host: configService.get('DB_HOST'),
	port: configService.get('DB_PORT'),
	username: configService.get('DB_USER'),
	password: configService.get('DB_PASS'),
	database: configService.get('DB_NAME'),
	entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
	synchronize: configService.get('nodenv') === 'local',
	logging: configService.get('nodenv') === 'local',
	migrations: [`${__dirname}/migrations/*{.ts,.js}`],
	migrationsTableName: 'migrations',
});
