// src/config/database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT, 10) || 35432,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
	// autoLoadEntities: true,
	synchronize: process.env.NODE_ENV === 'local',
	logging: process.env.NODE_ENV === 'local',
	migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
	migrationsTableName: 'migrations',
	migrationsRun: true,
})) 

