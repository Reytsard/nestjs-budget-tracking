import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { NewTransactionDTO } from './dto/newTransaction.dto';
import { UpdateTransactionDTO } from './dto/UpdateTransaction.dto';
import { CategoryService } from 'src/category/category.service';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';

@Controller('transaction')
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) { }
  @Get('/:id')
  async findAllTransactions(
    @Param('id') uid
  ) {
    return await this.transactionService.findAllTransactions(uid);
  }

  @Get('/:id/:year/:month')
  async findTransactionFromYearAndMonth(
    @Param('year') year: number,
    @Param('month') month: string,
    @Param('id') uid: string,
  ) {
    return await this.transactionService.findTransactionFromYearAndMonth(
      year,
      month,
      uid
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  async createNewTransaction(@Body() newTransactionDTO: NewTransactionDTO) {
    return await this.transactionService.createNewTransaction(
      newTransactionDTO,
    );
  }

  @Put('/update/:id/:uid')
  async updateTransaction(
    @Param('id') transactionId,
    @Param('uid') uid,
    @Body() updateTransactionDTO: UpdateTransactionDTO,
  ) {
    return await this.transactionService.updateTransaction(
      transactionId,
      updateTransactionDTO,
      uid
    );
  }

  @Delete('/delete/:id/:uid')
  async deleteTransactionWithId(@Param('id') id: string, @Param('uid') uid) {
    return await this.transactionService.deleteTransactionWithId(id, uid);
  }
}
