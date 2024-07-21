// Pembuatan Error Code wajib didokumentasikan dalam notion

import { HttpStatus } from '@nestjs/common';

export const permissionErrorMessageCode = {
	/*** fail save permission item*/
	ERAUPM0001: {
		httpCode: HttpStatus.BAD_REQUEST,
		fabdCode: 'ERAUUS0001',
		message: 'Failed to save permission.',
	},
};
