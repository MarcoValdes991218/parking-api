import { Users } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reserva {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        nullable: false,
        length: 50
    })
    modelo: string

    @Column({
        type: "varchar",
        nullable: false,
        length: 50
    })
    marca: string

    @Column({
        type: "varchar",
        nullable: false,
        length: 50
    })
    placa: string

    @ManyToOne(() => Users, (user) => user.reservas, { onDelete: "CASCADE" })
    user: Users

    @Column()
    fechaInicio: string; // Columna para la fecha de inicio

    @Column()
    fechaFin: string; // Columna para la fecha de fin


}