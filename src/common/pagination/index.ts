// common/pagination/index.ts

import FABDMetaResponse from './interfaces/meta.interfaces';

export class Pagination<T> {
	constructor(
		public readonly items: T[],
		public readonly meta: FABDMetaResponse,
	) {}
}
