import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateTransactionDTO } from './dto/UpdateTransaction.dto';
import { NewTransactionDTO } from './dto/newTransaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from 'src/entity/transaction.schema';
import { Model, ObjectId } from 'mongoose';

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

  async updateTransaction(id, updateTransactionDTO: UpdateTransactionDTO, uid) {
    const transaction = await this.transactionRepository.findById(id);

    if (transaction && transaction.uid.toString() === uid) {
      //make sure its the users transaction and not others
      return await this.transactionRepository.findByIdAndUpdate(id, updateTransactionDTO);
    }

    throw new UnauthorizedException();

  }

  async createNewTransaction(newTransactionDto: NewTransactionDTO) {
    const newTransaction = await new this.transactionRepository(newTransactionDto);
    return newTransaction.save();
  }

  async deleteTransactionWithId(id: string, uid: string) {
    const transaction = await this.transactionRepository.findById(id);

    if (transaction && transaction.uid.toString() === uid) {
      //validate if its the owner first before deleting
      return await this.transactionRepository.findByIdAndDelete(id);
    }

    throw new UnauthorizedException();
  }
}
