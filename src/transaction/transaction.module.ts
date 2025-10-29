import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entity/transaction.entity';
import { Category } from 'src/entity/category.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Category])],
  controllers: [TransactionController],
  providers: [TransactionService, CategoryService],
})
export class TransactionModule {}
