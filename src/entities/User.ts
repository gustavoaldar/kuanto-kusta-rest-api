import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {

    @PrimaryColumn()
    userId: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor() {
        if (!this.userId) {
            this.userId = uuid();
        }
    }
}
