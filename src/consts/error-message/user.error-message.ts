// Pembuatan Error Code wajib didokumentasikan dalam notion

import { HttpStatus } from '@nestjs/common';

export const userErrorMessageCode = {
	/*** fail save user item*/
	ERAUUS0001: {
		httpCode: HttpStatus.BAD_REQUEST,
		fabdCode: 'ERAUUS0001',
		message: 'Failed to save data',
	},
	/*** fail update user item*/
	ERAUUS0002: {
		httpCode: HttpStatus.BAD_REQUEST,
		fabdCode: 'ERAUUS0002',
		message: 'Failed to update data',
	},
	/*** user exist item*/
	ERAUUS0003: {
		httpCode: HttpStatus.CONFLICT,
		fabdCode: 'ERAUUS0003',
		message: 'Data is already exists',
	},
	/*** user not found item*/
	ERAUUS0004: {
		httpCode: HttpStatus.NOT_FOUND,
		fabdCode: 'ERAUUS0004',
		message: 'Data not found',
	},
};
