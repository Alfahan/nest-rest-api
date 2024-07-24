import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationError } from 'class-validator';
import { CustomException } from './common/api-response/exceptions/custom-fabd.exception';
import { errorMessageCode } from './common/api-response/consts/error-message-code';
// import Authentication from './middlewares/authentication';

async function bootstrap() {
	// init service
	const app = await NestFactory.create(AppModule);
	
	// cors
	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});

	// custom filter response
	app.useGlobalFilters(new HttpExceptionFilter());
	//app.use(new Authentication().validate);

	
	// config service
	const configService = app.get(ConfigService);

	// apply global pipes
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			exceptionFactory: (validationErrors: ValidationError[] = []) => {
				return new CustomException(errorMessageCode.ER0006, validationErrors);
			},
		}),
	);

	// versioning
	app.enableVersioning();

	// get port from env 
	const port = configService.get('PORT');

	// listen service
	await app.listen(port);
}

bootstrap();

