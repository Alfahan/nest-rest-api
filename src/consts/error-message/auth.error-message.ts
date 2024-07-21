// Pembuatan Error Code wajib didokumentasikan dalam notion

import { HttpStatus } from '@nestjs/common';

export const authErrorMessageCode = {
	/*** fail get username or password */
	ERAUAU0001: {
		httpCode: HttpStatus.BAD_REQUEST,
		fabdCode: 'ERAUAU0001',
		message: 'Wrong username or password.',
	},
};
