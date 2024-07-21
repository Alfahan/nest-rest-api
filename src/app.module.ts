import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { AppConfig, DatabaseConfig, MinioConfig } from './configs';

import { NestMinioModule } from 'nestjs-minio';
import { AppController } from './app.controller';
import { TodoModule } from './modules/v4/todos/todos.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			load: [AppConfig, DatabaseConfig, MinioConfig],
			expandVariables: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				...configService.get('database'),
			}),
			inject: [ConfigService],
		}),
		NestMinioModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				...configService.get('minio'),
			}),
			isGlobal: true,
			inject: [ConfigService],
		}),
		TodoModule
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
