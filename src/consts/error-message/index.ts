import { authErrorMessageCode } from './auth.error-message';
import { userErrorMessageCode } from './user.error-message';

export const errorCode = {
	...userErrorMessageCode,
	...authErrorMessageCode,
}