import { Response } from 'express';

export abstract class TodoAbstract {
    abstract readAll(req: any): any;
    abstract read(req: any): any;
    abstract create(req: any, res: Response): any;
    abstract update(req: any, res: Response): any;
    abstract delete(req: any, res: Response): any;
}