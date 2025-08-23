import { Bike } from 'src/bikes/entities/bike.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'text',
    nullable: true
  })
  value: string


  @Column({
    type: 'float',
  })
  rating: number

  @ManyToOne(
    () => Bike,
    (bike) => bike.comments
  )
  bike: Bike

  @ManyToOne(
    () => User,
    (user) => user.comments
  )
  user: User
}
