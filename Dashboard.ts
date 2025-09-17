import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useInvoices } from '../hooks/useInvoices';
import InvoiceCard from '../components/InvoiceCard';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const { t } = useTranslation();
  const { invoices } = useInvoices();

  const totalInvoices = invoices.length;
  const totalPaid = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.total, 0);
  const overdueInvoices = invoices.filter((inv) => new Date(inv.dueDate) < new Date() && inv.status !== 'Paid').length;
  const totalClients = new Set(invoices.map((inv) => inv.client.id)).size;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: t('dashboard.revenue'),
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        backgroundColor: '#0B5FFF',
      },
    ],
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.h1
        className="text-3xl font-bold font-cairo mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {t('dashboard.title')}
      </motion.h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" data-aos="fade-up">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-poppins">{t('dashboard.totalInvoices')}</h2>
          <p className="text-2xl font-bold font-cairo">{totalInvoices}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-poppins">{t('dashboard.totalPaid')}</h2>
          <p className="text-2xl font-bold font-cairo">{totalPaid} EGP</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-poppins">{t('dashboard.overdue')}</h2>
          <p className="text-2xl font-bold font-cairo">{overdueInvoices}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-poppins">{t('dashboard.clients')}</h2>
          <p className="text-2xl font-bold font-cairo">{totalClients}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8" data-aos="fade-up">
        <Bar data={chartData} />
      </div>

      {/* Recent Invoices */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" data-aos="fade-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold font-cairo">{t('dashboard.recentInvoices')}</h2>
          <Link to="/invoices/new" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
            {t('dashboard.createInvoice')}
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600 dark:text-gray-300">
                <th className="p-2 font-poppins">{t('invoices.id')}</th>
                <th className="p-2 font-poppins">{t('invoices.client')}</th>
                <th className="p-2 font-poppins">{t('invoices.dueDate')}</th>
                <th className="p-2 font-poppins">{t('invoices.total')}</th>
                <th className="p-2 font-poppins">{t('invoices.status')}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 5).map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;