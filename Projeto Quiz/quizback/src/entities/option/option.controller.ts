import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from 'src/DTO/create-option.dto';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  create(@Body() data: CreateOptionDto) {
    return this.optionService.create(data);
  }

  @Get()
  findAll() {
    return this.optionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionService.remove(+id);
  }
}

