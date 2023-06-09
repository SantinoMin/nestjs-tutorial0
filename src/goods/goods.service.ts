import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { Good } from './entities/good.entity';

@Injectable()
export class GoodsService {
  private readonly goods: Good[] = [];

  create(createGoodDto: CreateGoodDto): Good {
    const { goods_name, price } = createGoodDto;
    const good = {
      goods_name: goods_name,
      price: price,
    };
    this.goods.push(good);
    return good;
  }

  findAll() {
    return `This action returns all goods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} good`;
  }

  update(id: number, updateGoodDto: UpdateGoodDto) {
    const { goods_name, price } = updateGoodDto;
    const good = {
      goods_name: goods_name,
      price: price,
    };
    //* 이 부분 이해가 안됨 바로 아래 부분
    this.goods[id] = good;

    return this.goods[id];
  }

  remove(id: number) {
    return `This action removes a #${id} good`;
  }
}
