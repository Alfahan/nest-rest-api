import { HttpStatus } from '@nestjs/common';

export const successGlobalMessageCode = {
	/*** Success save entry */
	SC0011: {
		httpCode: HttpStatus.CREATED,
		fabdCode: 'SC0011',
		message: 'Saved the entry.',
	},
	/*** Succes get entry */
	SC0012: {
		httpCode: HttpStatus.OK,
		fabdCode: 'SC0012',
		message: 'Data fetched.',
	},
	/*** Succes delete entry */
	SC0013: {
		httpCode: HttpStatus.NO_CONTENT,
		fabdCode: 'SC0013',
		message: 'Data deleted.',
	},
	/*** Succes update entry */
	SC0014: {
		httpCode: HttpStatus.NO_CONTENT,
		fabdCode: 'SC0013',
		message: 'Data updated.',
	},
	/*** Succes update entry */
	SC0015: {
		httpCode: HttpStatus.OK,
		fabdCode: 'SC0015',
		message: 'Service running.',
	},
}