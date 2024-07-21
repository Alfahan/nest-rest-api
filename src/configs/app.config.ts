import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
	name: process.env.APP_NAME,
	code: process.env.APP_CODE,
	port: parseInt(process.env.PORT, 10) || 5000,
	nodenv: process.env.NODE_ENV,
}))