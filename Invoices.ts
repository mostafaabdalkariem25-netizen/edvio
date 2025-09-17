import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInvoices } from '../hooks/useInvoices';
import InvoiceCard from '../components/InvoiceCard';

function Invoices() {
  const { t } = useTranslation();
  const { invoices } = useInvoices();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredInvoices = invoices.filter(
    (inv) =>
      (statusFilter === 'All' || inv.status === statusFilter) &&
      (inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.client.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold font-cairo mb-8">{t('invoices.title')}</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder={t('invoices.search')}
          className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">{t('invoices.all')}</option>
          <option value="Paid">{t('invoices.paid')}</option>
          <option value="Unpaid">{t('invoices.unpaid')}</option>
          <option value="Partially Paid">{t('invoices.partiallyPaid')}</option>
        </select>
        <Link to="/invoices/new" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
          {t('invoices.create')}
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600 dark:text-gray-300">
                <th className="p-2 font-poppins">{t('invoices.id')}</th>
                <th className="p-2 font-poppins">{t('invoices.client')}</th>
                <th className="p-2 font-poppins">{t('invoices.dueDate')}</th>
                <th className="p-2 font-poppins">{t('invoices.total')}</th>
                <th className="p-2 font-poppins">{t('invoices.status')}</th>
                <th className="p-2 font-poppins">{t('invoices.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} showActions />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Invoices;