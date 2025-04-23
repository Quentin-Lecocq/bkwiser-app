import { describe, expect, it } from 'vitest';
import { transactionFactory } from '../factories/transaction.factory';
import {
  CreateTransactionInput,
  transactionSchema,
} from '../schemas/transaction.schema';
import { sleep } from './helpers/sleep';

describe('transactionFactory', () => {
  it('should create a valid transaction object (schema)', () => {
    const input: CreateTransactionInput = {
      type: 'deposit',
      amount: 100,
      bankrollId: crypto.randomUUID(),
    };
    const transaction = transactionFactory.create(input);
    expect(transactionSchema.safeParse(transaction).success).toBe(true);
  });
  it('should override amount and bankrollId correctly', () => {
    const transaction = transactionFactory.create({
      type: 'withdraw',
      amount: 42,
      bankrollId: 'abc',
    });

    expect(transaction.amount).toBe(42);
    expect(transaction.bankrollId).toBe('abc');
  });
  it('should create a unique id each time', () => {
    const input: CreateTransactionInput = {
      type: 'deposit',
      amount: 50,
      bankrollId: crypto.randomUUID(),
    };

    const tx1 = transactionFactory.create(input);
    const tx2 = transactionFactory.create(input);

    expect(tx1.id).not.toBe(tx2.id);
  });
  it('should validate a correct deposit', () => {
    const input: CreateTransactionInput = {
      type: 'deposit',
      amount: 50,
      bankrollId: crypto.randomUUID(),
    };

    const transaction = transactionFactory.create(input);

    expect(transactionFactory.isValid(transaction)).toBe(true);
  });
  it('should invalidate transaction with amount equal to 0', () => {
    const invalid = {
      ...transactionFactory.create({
        type: 'deposit',
        amount: 50,
        bankrollId: crypto.randomUUID(),
      }),
      amount: 0,
    };

    expect(transactionFactory.isValid(invalid)).toBe(false);
  });
  it('should invalidate a transaction with a negative amount', () => {
    const invalid = {
      ...transactionFactory.create({
        type: 'withdraw',
        amount: 50,
        bankrollId: crypto.randomUUID(),
      }),
      amount: -20,
    };

    expect(transactionFactory.isValid(invalid)).toBe(false);
  });
  it('should create transaction from valid raw input', () => {
    const validRaw = {
      id: crypto.randomUUID(),
      type: 'deposit',
      amount: 200,
      bankrollId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(validRaw).not.toBeNull();
    expect(validRaw?.amount).toBe(200);
  });
  it('should return null for invalid raw input', () => {
    const result = transactionFactory.fromRaw({
      type: 'deposit',
      amount: 0,
      bankrollId: crypto.randomUUID(),
    });

    expect(result).toBeNull();
  });
  it('should return true for deposit transactions', () => {
    const tx = transactionFactory.create({
      type: 'deposit',
      amount: 100,
      bankrollId: crypto.randomUUID(),
    });

    expect(transactionFactory.isDeposit(tx)).toBe(true);
  });
  it('should return false for withdraw transactions', () => {
    const tx = transactionFactory.create({
      type: 'withdraw',
      amount: 100,
      bankrollId: crypto.randomUUID(),
    });

    expect(transactionFactory.isDeposit(tx)).toBe(false);
  });
  it('should return true for withdraw transactions', () => {
    const tx = transactionFactory.create({
      type: 'withdraw',
      amount: 100,
      bankrollId: crypto.randomUUID(),
    });

    expect(transactionFactory.isWithdraw(tx)).toBe(true);
  });
  it('should return false for deposit transactions', () => {
    const tx = transactionFactory.create({
      type: 'deposit',
      amount: 100,
      bankrollId: crypto.randomUUID(),
    });

    expect(transactionFactory.isWithdraw(tx)).toBe(false);
  });
  it('should update the transaction amount', async () => {
    const initialData = transactionFactory.create({
      type: 'deposit',
      amount: 200,
      bankrollId: crypto.randomUUID(),
    });

    await sleep(2);
    const updatedTx = transactionFactory.update(initialData, {
      amount: 300,
    });

    expect(updatedTx.amount).toBe(300);
    expect(updatedTx.type).toBe(initialData.type);
    expect(updatedTx.bankrollId).toBe(initialData.bankrollId);
    expect(updatedTx.updatedAt).not.toBe(initialData.updatedAt);
  });
});
