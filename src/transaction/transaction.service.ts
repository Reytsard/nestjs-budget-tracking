import { Injectable } from '@nestjs/common';
import { UpdateTransactionDTO } from './dto/UpdateTransaction.dto';
import { NewTransactionDTO } from './dto/newTransaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from 'src/entity/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(
    // @InjectRepository(Transaction)
    // private transactionRepository: Repository<Transaction>,
    @InjectModel(Transaction.name) private transactionRepository: Model<Transaction>
  ) {}

  async findAllTransactions() {
    // return await this.transactionRepository.find();
  }

  async findTransactionFromYearAndMonth(year, month, uid) {
    return await this.transactionRepository.find({uid})
  }

  async updateTransaction(id, updateTransactionDTO: UpdateTransactionDTO) {}

  async createNewTransaction(newTransactionDto: NewTransactionDTO) {
    const newTransaction = await new this.transactionRepository(newTransactionDto);
    return newTransaction.save();
  }

  async deleteTransactionWithId(id) {}
}
