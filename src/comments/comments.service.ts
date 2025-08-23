import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterCommentsDto } from './dto/filter-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    const { bikeId, userId, ...commentData } = createCommentDto

    try {
      const alreadyExist = await this.commentRepository.findBy({ user: { id: userId } })

      if (alreadyExist.length >= 1) throw new Error()

      const newComment = this.commentRepository.create({
        // ...commentData,
        rating: commentData.rating,
        value: commentData.value,
        // Pasamos información de la relación
        bike: {
          id: bikeId,
        },
        user: {
          id: userId
        }
      })

      await this.commentRepository.save(newComment)
    } catch (error) {
      console.log('error', error)

      throw new BadRequestException(`Hubo un error al crear el comentario`)
    }
  }

  async findAll(filterCommentsDto: FilterCommentsDto) {
    const allComments = await this.commentRepository.find({
      where: {
        user: {
          id: filterCommentsDto.user
        },
        rating: MoreThanOrEqual(filterCommentsDto.min_rating || 0)
      },
      order: {
        rating: filterCommentsDto.order_by === 'rating' ? 'ASC' : 'DESC'
      },
      relations: {
        bike: true,
        user: true
      },
      select: {
        bike: {
          no: true
        },
        user: {
          name: true
        }
      }
    })

    const formattedComments = allComments.map(comment => {
      const { bike, user, ...commentData } = comment

      return {
        ...commentData,
        bikeNo: bike.no,
        userName: user.name
      }
    })

    return formattedComments;
  }
}
