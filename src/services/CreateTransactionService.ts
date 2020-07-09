import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // avoid creating outcome transactions when balance is not valid (outcomes outnumber incomes)
    const currentBalance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && currentBalance.total < value) {
      throw Error(
        'Avoid creating outcome transactions while your balance is not valid.',
      );
    }

    // creating a transaction
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
