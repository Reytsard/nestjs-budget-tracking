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
  ) { }

  async findAllTransactions(uid) {
    return await this.transactionRepository.find({ uid });
  }

  async findTransactionFromYearAndMonth(year, month, uid) {
    const transactions = (await this.transactionRepository.find({ uid }))
      .filter(transaction => {
        const date = new Date(transaction.date);
        return date.getFullYear >= year && date.getMonth >= month;
      })
    return transactions;
  }

  async updateTransaction(id, updateTransactionDTO: UpdateTransactionDTO) {
    //make sure its the users transaction and not others
    return await this.transactionRepository.findByIdAndUpdate(id, updateTransactionDTO);
  }

  async createNewTransaction(newTransactionDto: NewTransactionDTO) {
    const newTransaction = await new this.transactionRepository(newTransactionDto);
    return newTransaction.save();
  }

  async deleteTransactionWithId(id) {
    //validate if its the owner first before deleting
    return await this.transactionRepository.findByIdAndDelete(id);
  }
}
