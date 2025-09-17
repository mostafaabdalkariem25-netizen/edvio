import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useInvoices } from '../hooks/useInvoices';

const schema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  items: z.array(
    z.object({
      desc: z.string().min(1, 'Description is required'),
      qty: z.number().min(1, 'Quantity must be at least 1'),
      unitPrice: z.number().min(0, 'Unit price must be non-negative'),
    })
  ).min(1, 'At least one item is required'),
});

type FormData = z.infer<typeof schema>;

function CreateInvoice() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addInvoice, clients } = useInvoices();
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      items: [{ desc: '', qty: 1, unitPrice: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: FormData) => {
    const subtotal = data.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
    const taxPercent = 14;
    const tax = subtotal * (taxPercent / 100);
    const total = subtotal + tax;
    const client = clients.find((c) => c.id === data.clientId);

    addInvoice({
      id: `INV-2025-${Math.floor(Math.random() * 1000)}`,
      issueDate: data.issueDate,
      dueDate: data.dueDate,
      client,
      items: data.items,
      subtotal,
      taxPercent,
      tax,
      discount: 0,
      total,
      status: 'Unpaid',
    });
    navigate('/invoices');
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold font-cairo mb-8">{t('invoices.create')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block font-poppins">{t('invoices.client')}</label>
          <select {...register('clientId')} className="w-full p-2 border rounded-lg dark:bg-gray-700">
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
          {errors.clientId && <p className="text-red-500">{errors.clientId.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block font-poppins">{t('invoices.issueDate')}</label>
          <input type="date" {...register('issueDate')} className="w-full p-2 border rounded-lg dark:bg-gray-700" />
          {errors.issueDate && <p className="text-red-500">{errors.issueDate.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block font-poppins">{t('invoices.dueDate')}</label>
          <input type="date" {...register('dueDate')} className="w-full p-2 border rounded-lg dark:bg-gray-700" />
          {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}
        </div>
        <h2 className="text-lg font-bold font-poppins mb-4">{t('invoices.items')}</h2>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                {...register(`items.${index}.desc`)}
                placeholder={t('invoices.description')}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
              />
              {errors.items?.[index]?.desc && <p className="text-red-500">{errors.items[index].desc.message}</p>}
            </div>
            <div className="w-24">
              <input
                type="number"
                {...register(`items.${index}.qty`, { valueAsNumber: true })}
                placeholder={t('invoices.quantity')}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
              />
              {errors.items?.[index]?.qty && <p className="text-red-500">{errors.items[index].qty.message}</p>}
            </div>
            <div className="w-24">
              <input
                type="number"
                {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                placeholder={t('invoices.unitPrice')}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
              />
              {errors.items?.[index]?.unitPrice && <p className="text-red-500">{errors.items[index].unitPrice.message}</p>}
            </div>
            <button type="button" onClick={() => remove(index)} className="text-red-500">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ desc: '', qty: 1, unitPrice: 0 })}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-4"
        >
          {t('invoices.addItem')}
        </button>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg">
          {t('invoices.submit')}
        </button>
      </form>
    </div>
  );
}

export default CreateInvoice;