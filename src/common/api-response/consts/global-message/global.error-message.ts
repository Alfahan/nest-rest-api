import { HttpStatus } from '@nestjs/common';

export const errorGlobalMessageCode = {
	// GLOBAL
	/*** error database */
	ER0000: {
		httpCode: HttpStatus.UNAUTHORIZED,
		fabdCode: 'ER0000',
		message: 'You don\'t have access permission',
	},
	ER0001: {
		httpCode: HttpStatus.UNAUTHORIZED,
		fabdCode: 'ER0001',
		message: 'Failed to connect to the database, contact system administrator.',
	},
	/*** token expired */
	ER0002: {
		httpCode: HttpStatus.UNAUTHORIZED,
		fabdCode: 'ER0002',
		message: 'Session expired, log in to the application again.',
	},
	/*** credential not valid*/
	ER0003: {
		httpCode: HttpStatus.BAD_REQUEST,
		fabdCode: 'ER0003',
		message: 'Enter valid credentials.',
	},
	/*** tidak berwenang */
	ER0004: {
		httpCode: HttpStatus.FORBIDDEN,
		fabdCode: 'ER0004',
		message:
			'You are not authorized, contact your administrator for more details.',
	},
	/*** account terkunci*/
	ER0005: {
		httpCode: HttpStatus.BAD_REQUEST,
		fabdCode: 'ER0005',
		message: 'Your account is locked, contact your administrator.',
	},
	/*** Payload Request Tidak Lengkap*/
	ER0006: {
		httpCode: HttpStatus.UNPROCESSABLE_ENTITY,
		fabdCode: 'ER0006',
		message: 'Validation Failed.',
	},

	/*** Entry does not exist */
	ER0007: {
		httpCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
		fabdCode: 'ER0007',
		message: 'Failed to upload document.',
	},

	/*** Internal Server Error*/
	ER0010: {
		httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
		fabdCode: 'ER0010',
		message: 'Internal Server Error.',
	},

	/*** Failed save entry */
	ER0011: {
		httpCode: HttpStatus.BAD_REQUEST,
		fabdCode: 'ER0011',
		message: 'Failed to add the new entry, try again.',
	},

	/*** Failed update entry */
	ER0012: {
		httpCode: HttpStatus.BAD_REQUEST,
		fabdCode: 'ER0012',
		message: 'Failed to update the entry. The entry does not exist or you do not have the required access rights.',
	},

	/*** Failed to delete entry */
	ER0013: {
		httpCode: HttpStatus.BAD_REQUEST,
		fabdCode: 'ER0013',
		message: 'Failed to delete entry.',
	},

	/*** Entry already exists */
	ER0014: {
		httpCode: HttpStatus.CONFLICT,
		fabdCode: 'ER0014',
		message: 'Entry is already exist.',
	},

	/*** Entry does not exist */
	ER0015: {
		httpCode: HttpStatus.NOT_FOUND,
		fabdCode: 'ER0015',
		message: 'Entry does not exist.',
	},

	/*** Entry does not exist */
	ER0016: {
		httpCode: HttpStatus.BAD_REQUEST,
		fabdCode: 'ER0016',
		message: 'Failed to fetch the entry.',
	},
}