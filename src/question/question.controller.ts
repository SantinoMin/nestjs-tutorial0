import { Body, Controller, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';
import { Question } from './question.entity';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  cascadeTest(): Promise<Question> {
    return this.questionService.cascadeTest();
  }
}
