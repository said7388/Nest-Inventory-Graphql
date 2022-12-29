import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'shared/auth.gaurd';
import { UserEntity } from 'user/entities/user.entity';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../graphql.schema';
import { TransactionService } from './transaction.service';

@Resolver('Transaction')
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(new AuthGuard())
  @Mutation('createTransaction')
  create(
    @Args('data')
    data: CreateTransactionInput,

    @Context('user')
    user: UserEntity,
  ) {
    console.log(user);
    return this.transactionService.create(data, user.id);
  }

  @UseGuards(new AuthGuard())
  @Query('transactions')
  findAll() {
    return this.transactionService.findAll();
  }

  @UseGuards(new AuthGuard())
  @Query('transaction')
  findOne(@Args('id') id: number) {
    return this.transactionService.findOne(id);
  }

  @UseGuards(new AuthGuard())
  @Mutation('updateTransaction')
  update(
    @Args('id') transactionId: number,
    @Args('data')
    updateTransactionInput: UpdateTransactionInput,
    @Context('user') updatedBy: UserEntity,
  ) {
    return this.transactionService.update(
      transactionId,
      updateTransactionInput,
      updatedBy.id,
    );
  }

  @UseGuards(new AuthGuard())
  @Mutation('removeTransaction')
  remove(@Args('id') id: number, @Context('user') removedBy: UserEntity) {
    return this.transactionService.remove(id, removedBy.id);
  }
}
