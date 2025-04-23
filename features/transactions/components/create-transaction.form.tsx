import {
  CreateTransactionInput,
  createTransactionSchema,
} from '@/core/schemas/transaction.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const CreateTransactionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: 'deposit',
      date: new Date().toISOString(),
    },
  });
  return <form></form>;
};
