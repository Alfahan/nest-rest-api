import { Entity } from "typeorm";
import { TextHeap } from "./text_heap.entity";

@Entity('name_text_heap')
export class NameTextHeap extends TextHeap{}