import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTransactionDTO } from './dto/UpdateTransaction.dto';
import { NewTransactionDTO } from './dto/newTransaction.dto';
import { Transaction } from 'src/entity/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async findAllTransactions() {
    // return await this.transactionRepository.find();
  }

  async findTransactionFromYearAndMonth(year, month) {
    // return await this.transactionRepository.find({})
  }

  async updateTransaction(id, updateTransactionDTO: UpdateTransactionDTO) {}

  async createNewTransaction(newTransactionDto: NewTransactionDTO) {}

  async deleteTransactionWithId(id) {}
}
