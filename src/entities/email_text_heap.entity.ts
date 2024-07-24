import { Entity } from "typeorm";
import { TextHeap } from "./text_heap.entity";

@Entity('email_text_heap')
export class EmailTextHeap extends TextHeap {}