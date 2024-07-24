import { Entity } from "typeorm";
import { TextHeap } from "./text_heap.entity";

@Entity('address_text_heap')
export class AddressTextHeap extends TextHeap {}