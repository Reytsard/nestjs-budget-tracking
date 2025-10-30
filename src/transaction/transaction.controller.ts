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
  ) {}
  @Get('/')
  async findAllTransactions() {
    return await this.transactionService.findAllTransactions();
  }

  @Get('/:id/:year/:month')
  async findTransactionFromYearAndMonth(
    @Param('year') year: number,
    @Param('month') month: string,
    @Param('id') uid:string,
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

  @Put('/update/:id')
  async updateTransaction(
    @Param('id') transactionId,
    @Body() updateTransactionDTO: UpdateTransactionDTO,
  ) {
    return await this.transactionService.updateTransaction(
      transactionId,
      updateTransactionDTO,
    );
  }

  @Delete('/delete/:id')
  async deleteTransactionWithId(@Param('id') id) {
    return await this.transactionService.deleteTransactionWithId(id);
  }
}
