import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './option.entity';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Option])], 
  providers: [OptionService],
  controllers: [OptionController],
  exports: [OptionService],
})
export class OptionModule {}
