import { Column, PrimaryGeneratedColumn } from "typeorm";

export class TextHeap {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        content: string;

    @Column()
        hash: string;
}