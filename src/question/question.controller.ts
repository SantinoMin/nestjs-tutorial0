import { Body, Controller, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}


@Post()
  cascadeTest(): User {
    return this.questionService.cascadeTest();

}
