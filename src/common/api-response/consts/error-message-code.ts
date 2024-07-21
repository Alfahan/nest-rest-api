import { errorCode } from '@app/consts/error-message';
import { errorGlobalMessageCode } from './global-message/global.error-message';

export const errorMessageCode = {
	...errorGlobalMessageCode,
	...errorCode
};