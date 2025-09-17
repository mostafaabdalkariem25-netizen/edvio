import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useInvoices } from '../hooks/useInvoices';
import { generatePDF } from '../utils/pdfGenerator';

function InvoiceDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, updateInvoice } = useInvoices();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) return <div>{t('invoices.notFound')}</div>;

  const handleMarkAsPaid = () => {
    updateInvoice(invoice.id, { ...invoice, status: 'Paid' });
    navigate('/invoices');
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold font-cairo mb-8">{t('invoices.detail')}</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <img src="/logo.png" alt="Logo" className="h-12" />
          <div>
            <button
              onClick={() => generatePDF(invoice)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg mr-2"
            >
              {t('invoices.downloadPDF')}
            </button>
            <button
              onClick={() => window.location.href = `mailto:${invoice.client.email}?subject=Invoice ${invoice.id}`}
              className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              {t('invoices.send')}
            </button>
            <button
              onClick={handleMarkAsPaid}
              className="bg-green-600 text-white py-2 px-4 rounded-lg"
            >
              {t('invoices.markAsPaid')}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-bold font-poppins">{t('invoices.seller')}</h2>
            <p className="font-cairo">EasyInvoice Co.<br />123 Tahrir St, Cairo<br />info@easyinvoice.test</p>
          </div>
          <div>
            <h2 className="text-lg font-bold font-poppins">{t('invoices.client')}</h2>
            <p className="font-cairo">{invoice.client.name}<br />{invoice.client.address}<br />{invoice.client.email}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-poppins">{t('invoices.id')}: {invoice.id}</p>
          <p className="font-poppins">{t('invoices.issueDate')}: {invoice.issueDate}</p>
          <p className="font-poppins">{t('invoices.dueDate')}: {invoice.dueDate}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold font-poppins">{t('invoices.items')}</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600 dark:text-gray-300">
                <th className="p-2 font-poppins">{t('invoices.description')}</th>
                <th className="p-2 font-poppins">{t('invoices.quantity')}</th>
                <th className="p-2 font-poppins">{t('invoices.unitPrice')}</th>
                <th className="p-2 font-poppins">{t('invoices.total')}</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 font-cairo">{item.desc}</td>
                  <td className="p-2 font-cairo">{item.qty}</td>
                  <td className="p-2 font-cairo">{item.unitPrice}</td>
                  <td className="p-2 font-cairo">{item.qty * item.unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <p className="font-poppins">{t('invoices.subtotal')}: {invoice.subtotal} EGP</p>
          <p className="font-poppins">{t('invoices.tax')}: {invoice.tax} EGP</p>
          <p className="font-poppins">{t('invoices.total')}: {invoice.total} EGP</p>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;