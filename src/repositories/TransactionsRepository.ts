import Transaction from '../models/Transaction';

// Transaction DTO
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  /**
   * Lists all transactions available.
   */
  public all(): Transaction[] {
    return this.transactions;
  }

  /**
   * Summarizes all transactions into a balance.
   */
  public getBalance(): Balance {
    // incomes
    const incomes: number = this.transactions
      .filter((transaction: Transaction) => transaction.type === 'income')
      .reduce(
        (sum: number, currentTransaction: Transaction) =>
          sum + currentTransaction.value,
        0,
      );

    // outcomes
    const outcomes: number = this.transactions
      .filter((transaction: Transaction) => transaction.type === 'outcome')
      .reduce(
        (sum: number, currentTransaction: Transaction) =>
          sum + currentTransaction.value,
        0,
      );

    // total
    const total = incomes - outcomes;

    // balance
    return {
      income: incomes,
      outcome: outcomes,
      total,
    };
  }

  /**
   * Creates a transaction
   */
  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
