import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-custom';

@Injectable()
export class KeyAuthStrategy extends PassportStrategy(Strategy, 'key-auth') {
	constructor() {
		super();
	}

	async validate(req: Request): Promise<any> {
		const token = req.headers['x-access-token'];
		// const tokenInfo = false
		// if (!tokenInfo) {
		// 	throw new UnauthorizedException(`Token is not valid`);
		// }
		// const user = await this.authService.getUserInfo(tokenInfo.userId);
		// if (!user) {
		// 	throw new UnauthorizedException(`User is not valid`);
		// }
		return token;
	}
}