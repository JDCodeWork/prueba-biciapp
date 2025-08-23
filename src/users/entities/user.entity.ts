import { Comment } from "src/comments/entities/comment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'text',
  })
  name: string

  @OneToMany(
    () => Comment,
    (comment) => comment.user,
  )
  comments: Comment[]
}
