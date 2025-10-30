import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CategoryService } from 'src/category/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'src/entity/transaction.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Transaction, Category])
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    CategoryModule
  ],
  controllers: [TransactionController],
  providers: [TransactionService, CategoryService],
})
export class TransactionModule { }
