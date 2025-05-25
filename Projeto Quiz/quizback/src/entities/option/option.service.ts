import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './option.entity';
import { Repository } from 'typeorm';
import { CreateOptionDto } from 'src/DTO/create-option.dto';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async create(data: CreateOptionDto): Promise<Option> {
    const option = this.optionRepository.create(data);
    return this.optionRepository.save(option);
  }

  findAll(): Promise<Option[]> {
    return this.optionRepository.find({ relations: ['question'] });
  }

  async findOne(id: number): Promise<Option> {
    const option = await this.optionRepository.findOne({where: { id }, relations: ['question'],});
  
    if (!option) {
      throw new Error('Option not found');
    }
  
    return option;
  }
  
  async remove(id: number): Promise<void> {
    await this.optionRepository.delete(id);
  }
}

