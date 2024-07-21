import { HttpStatus } from '@nestjs/common';

export const authSuccessMessageCode = {
	/*** authorization pass */
	SCAUAU0001: {
		httpCode: HttpStatus.OK,
		fabdCode: `SCAUUS0001`,
		message: 'Logged in.',
	},
	/*** authorization logout */
	SCAUAU0002: {
		httpCode: HttpStatus.OK,
		fabdCode: `SCAUAU0002`,
		message: 'Logged out.',
	},
}