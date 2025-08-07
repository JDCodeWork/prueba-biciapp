import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Bike {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'integer'
  })
  no: number

  @Column({
    type: 'text'
  })
  status: string
}