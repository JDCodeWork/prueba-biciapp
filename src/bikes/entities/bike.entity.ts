import { Comment } from "src/comments/entities/comment.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

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

  @OneToMany(
    () => Comment,
    (comment) => comment.bike
  )
  comments: Comment[]
}