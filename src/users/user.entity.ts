import { Rol } from "src/auth/enums/rol.enum";
import { Reserva, } from "src/reserva/reserva.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
    })
    nombre: string

    @Column({
        type: "varchar",
        length: 96,
        nullable: false,
    })
    password: string

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
    })
    email: string

    @Column({
        type: 'enum',
        enum: Rol,
        nullable: false,
        default: Rol.CLIENTE,
    })
    rol: Rol;

    @OneToMany(() => Reserva, (reserva) => reserva.user, {
        cascade: true
    })
    reservas: Reserva[]
}