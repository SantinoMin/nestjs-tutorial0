import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { ApiTags } from '@nestjs/swagger';
import { Good } from './entities/good.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@ApiTags('goods')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  create(@Body() createGoodDto: CreateGoodDto): Promise<InsertResult> {
    return this.goodsService.create(createGoodDto);
  }

  @Get()
  findAll(): Promise<Good[]> {
    return this.goodsService.findAll();
  }

  @Get(':good_idx')
  findOne(@Param('good_idx') good_idx: string): Promise<Good> {
    return this.goodsService.findOne(+good_idx);
  }

  @Patch(':good_idx')
  update(
    @Param('good_idx') good_idx: string,
    @Body() updateGoodDto: UpdateGoodDto,
  ): Promise<UpdateResult> {
    return this.goodsService.update(+good_idx, updateGoodDto);
  }

  @Delete(':good_idx')
  remove(@Param('good_idx') good_idx: string): Promise<DeleteResult> {
    return this.goodsService.remove(+good_idx);
  }
}
