import { Pagination } from "@app/utils/pagination";
import { Request } from "express";
import { ParamsUser } from "./dto/paramUser.dto";

export abstract class UserAbstract {
    abstract create(req: Request): any;
    abstract update(req: Request): any;
    abstract read(req: Request): any;
    abstract findAll(pagination: Pagination, params: ParamsUser): any;
}