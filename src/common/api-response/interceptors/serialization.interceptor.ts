import { plainToClass } from 'class-transformer';

export class Serializer<T> {
	constructor(private dtoClass: new () => T) {}

	serialize(data: any): T {
		return plainToClass(this.dtoClass, data, { exposeDefaultValues: true });
	}

	serializeArray(data: any[]): T[] {
		return data.map(item => this.serialize(item));
	}
}
