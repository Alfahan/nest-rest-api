import { HttpException } from '@nestjs/common';
import FABDStructureCode from '../interfaces/fabd-structure.interface';

export class CustomException extends HttpException {
	constructor(fabdStructureCode: FABDStructureCode, errors: any = undefined, data: any = undefined) {
		super({...fabdStructureCode, error: errors, data: data}, fabdStructureCode.httpCode);
	}
}
