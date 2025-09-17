import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Client } from '../hooks/useInvoices';

interface ClientFormProps {
  onSubmit: (client: Client) => void;
}

function ClientForm({ onSubmit }: ClientFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<Client>();

  const onFormSubmit = (data: Client) => {
    onSubmit({ ...data, id: `C${Math.floor(Math.random() * 1000)}` });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="mb-4">
        <label className="block font-poppins">{t('clients.name')}</label>
        <input
          {...register('name', { required: true })}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block font-poppins">{t('clients.email')}</label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block font-poppins">{t('clients.phone')}</label>
        <input
          {...register('phone', { required: true })}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block font-poppins">{t('clients.address')}</label>
        <input
          {...register('address', { required: true })}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
        {t('clients.submit')}
      </button>
    </form>
  );
}

export default ClientForm;