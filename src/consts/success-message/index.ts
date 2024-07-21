import { authSuccessMessageCode } from './auth.success-message';
import { roleSuccessMessageCode } from './role.success-message';
import { userSuccessMessageCode } from './user.success-message';

export const successCode = {
	...userSuccessMessageCode,
	...authSuccessMessageCode,
	...roleSuccessMessageCode
}
