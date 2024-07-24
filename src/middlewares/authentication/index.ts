// import { Algorithm } from 'jsonwebtoken';
// import { NextFunction, Response, Request } from 'express';
// import { JWT_KEY } from 'src/consts';
// import { JwtService } from '@nestjs/jwt';
// import { Logger } from '@nestjs/common';
// import JWTOKEN from 'src/libraries/jwt';
// import { CustomException } from 'src/common/api-response/exceptions/custom-fabd.exception';
// import { errorMessageCode } from 'src/common/api-response/consts/error-message-code';

// export default class Authentication {
// 	static JWT_ALGORITHM: Algorithm = 'HS512';
// 	validate(req: Request, res: Response, next: NextFunction): void {
// 		if (!req.headers.authorization) {
// 			throw new CustomException(errorMessageCode.ER0000);
// 		}

// 		const authorization = req.headers.authorization;
// 		const auth = authorization.split(' ');
// 		if (auth[0] == 'apiKey') {
// 			throw new CustomException(errorMessageCode.ER0000);
// 		} else if (auth[0] == 'Bearer') {
// 			const token = auth[1];
// 			try {
// 				const logged: any = new JwtService().verify(token, { secret: JWT_KEY, algorithms: [JWTOKEN.JWT_ALGORITHM] });
// 				res.locals.logged = logged;
// 			} catch (e) {
// 				let error = '';
// 				if (typeof e === 'string') {
// 					error = e.toUpperCase();
// 				} else if (e instanceof Error) {
// 					error = e.message;
// 				}

// 				new Logger().error(error);
// 				throw new CustomException(errorMessageCode.ER0000);
// 			}
// 		} else {
// 			throw new CustomException(errorMessageCode.ER0000);
// 		}

// 		next();
// 	}

// }