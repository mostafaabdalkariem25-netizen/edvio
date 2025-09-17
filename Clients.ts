import { useTranslation } from 'react-i18next';
import { useInvoices } from '../hooks/useInvoices';
import ClientForm from '../components/ClientForm';

function Clients() {
  const { t } = useTranslation();
  const { clients, addClient, deleteClient } = useInvoices();

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold font-cairo mb-8">{t('clients.title')}</h1>
      <ClientForm onSubmit={addClient} />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-4">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 dark:text-gray-300">
              <th className="p-2 font-poppins">{t('clients.name')}</th>
              <th className="p-2 font-poppins">{t('clients.email')}</th>
              <th className="p-2 font-poppins">{t('clients.phone')}</th>
              <th className="p-2 font-poppins">{t('clients.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="p-2 font-cairo">{client.name}</td>
                <td className="p-2 font-cairo">{client.email}</td>
                <td className="p-2 font-cairo">{client.phone}</td>
                <td className="p-2">
                  <button onClick={() => deleteClient(client.id)} className="text-red-500">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clients;