import { HttpStatus } from '@nestjs/common';

export const roleSuccessMessageCode = {
	/*** role assign permission */
	SCAURL0001: {
		httpCode: HttpStatus.OK,
		fabdCode: `SCAURL0001`,
		message: 'Assign permission to role success.',
	},
}