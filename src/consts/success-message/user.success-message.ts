import { HttpStatus } from '@nestjs/common';

export const userSuccessMessageCode = {
	/*** user created*/
	SCAUUS0001: {
		httpCode: HttpStatus.CREATED,
		fabdCode: `SCAUUS0001`,
		message: 'Data has been created',
	},
	/*** user updated */
	SCAUUS0002: {
		httpCode: HttpStatus.OK,
		fabdCode: 'SCAUUS0002',
		message: 'Data has been updated',
	},
	/*** user order*/
	SCAUUS0003: {
		httpCode: HttpStatus.OK,
		fabdCode: 'SCAUUS0003',
		message: 'Data has been retrived',
	},
	/*** user deleted*/
	SCAUUS0004: {
		httpCode: HttpStatus.NO_CONTENT,
		fabdCode: 'SCAUUS0004',
		message: 'Data has been deleted',
	},
	/*** user status approved*/
	SCAUUS0005: {
		httpCode: HttpStatus.OK,
		fabdCode: 'SCAUUS0005',
		message: 'Data has been approved',
	},
	/*** user registered*/
	SCAUUS0006: {
		httpCode: HttpStatus.CREATED,
		fabdCode: 'SCAUUS0006',
		message: 'Data has been registered',
	},
}
