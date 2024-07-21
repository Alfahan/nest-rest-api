import { successCode } from '@app/consts/success-message';
import { successGlobalMessageCode } from './global-message/global.success.message';

export const successMessageCode = {
	...successGlobalMessageCode,
	...successCode
};