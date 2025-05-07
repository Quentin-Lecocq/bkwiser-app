'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TRANSACTION_TYPES } from '@/core/constants/transaction';
import {
  TransactionFormInput,
  TransactionFormSchema,
} from '@/core/schemas/transaction.schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { AlertCircle, CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCreateTransaction } from '../hooks';

type TransactionFormProps = {
  bankrollId: string;
};

export function TransactionForm({ bankrollId }: TransactionFormProps) {
  const router = useRouter();
  const {
    mutate: createTransaction,
    isPending,
    error,
  } = useCreateTransaction();

  const form = useForm<TransactionFormInput>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      type: 'deposit',
      amount: 0,
      transactionDate: new Date(),
    },
  });

  function onSubmit(data: TransactionFormInput) {
    const formattedData = {
      ...data,
      transactionDate: data.transactionDate
        ? new Date(data.transactionDate).toISOString()
        : undefined,
      bankrollId,
    };

    createTransaction(formattedData, {
      onSuccess: () => {
        router.back();
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TRANSACTION_TYPES.map((transaction) => (
                    <SelectItem key={transaction} value={transaction}>
                      {transaction.charAt(0).toUpperCase() +
                        transaction.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Amount"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transactionDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Transaction Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                      onClick={() => {
                        if (!field.value) {
                          const now = new Date();
                          field.onChange(now); // Set current date and time if not already set
                        }
                      }}
                    >
                      {field.value ? (
                        format(field.value, 'PPP p')
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-4">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          const currentTime = new Date();
                          const newDate = new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate(),
                            currentTime.getHours(),
                            currentTime.getMinutes(),
                          );
                          field.onChange(newDate);
                        }
                      }}
                      initialFocus
                    />
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Set the time:
                      </label>
                      <Input
                        type="time"
                        value={
                          field.value ? format(field.value, 'HH:mm') : '00:00'
                        }
                        onChange={(e) => {
                          const time = e.target.value;
                          if (field.value) {
                            const [hours, minutes] = time
                              .split(':')
                              .map(Number);
                            const updatedDate = new Date(
                              field.value.getFullYear(),
                              field.value.getMonth(),
                              field.value.getDate(),
                              hours,
                              minutes,
                            );
                            field.onChange(updatedDate);
                          }
                        }}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              {(error as Error).message ??
                'Une erreur est survenue lors de la création de la transaction.'}
            </AlertDescription>
          </Alert>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Form>
  );
}
