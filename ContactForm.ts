import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(t('contact.success'));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block font-poppins">{t('contact.name')}</label>
        <input
          {...register('name', { required: true })}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block font-poppins">{t('contact.email')}</label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block font-poppins">{t('contact.message')}</label>
        <textarea
          {...register('message', { required: true })}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
        {t('contact.submit')}
      </button>
    </form>
  );
}

export default ContactForm;