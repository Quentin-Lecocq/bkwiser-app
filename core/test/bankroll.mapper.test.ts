import type { Bankroll as PrismaBankroll } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import { toDomain } from '../mappers/bankroll.mapper';

describe('toDomain', () => {
  it('should convert a PrismaBankroll to a domain Bankroll', () => {
    const prismaBankroll: PrismaBankroll = {
      id: 'bk1',
      name: 'Test BK',
      initialAmount: 100,
      currentAmount: 100,
      status: 'private',
      currency: 'EUR',
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-02T00:00:00.000Z'),
      archivedAt: null,
    };

    const domainBankroll = toDomain(prismaBankroll);

    expect(domainBankroll).toEqual({
      id: 'bk1',
      name: 'Test BK',
      initialAmount: 100,
      currentAmount: 100,
      status: 'private',
      currency: 'EUR',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-02T00:00:00.000Z',
      archivedAt: null,
    });

    expect(typeof domainBankroll.createdAt).toBe('string');
    expect(typeof domainBankroll.updatedAt).toBe('string');
    expect(domainBankroll.archivedAt).toBeNull();
  });
  it('should convert archivedAt if present', () => {
    const prismaBankroll: PrismaBankroll = {
      id: 'bk2',
      name: 'Archived BK',
      initialAmount: 200,
      currentAmount: 150,
      status: 'public',
      currency: 'USD',
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-02T00:00:00.000Z'),
      archivedAt: new Date('2025-01-03T00:00:00.000Z'),
    };

    const domain = toDomain(prismaBankroll);

    expect(domain.archivedAt).toBe('2025-01-03T00:00:00.000Z');
  });
});
