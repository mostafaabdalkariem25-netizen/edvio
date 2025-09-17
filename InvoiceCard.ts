import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Invoice } from '../hooks/useInvoices';
import { generatePDF } from '../utils/pdfGenerator';

interface InvoiceCardProps {
  invoice: Invoice;
  showActions?: boolean;
}

function InvoiceCard({ invoice, showActions = false }: InvoiceCardProps) {
  const { t } = useTranslation();

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="p-2 font-cairo">{invoice.id}</td>
      <td className="p-2 font-cairo">{invoice.client.name}</td>
      <td className="p-2 font-cairo">{invoice.dueDate}</td>
      <td className="p-2 font-cairo">{invoice.total} EGP</td>
      <td className="p-2 font-cairo">
        <span
          className={`px-2 py-1 rounded ${
            invoice.status === 'Paid'
              ? 'bg-green-100 text-green-800'
              : invoice.status === 'Unpaid'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {t(`invoices.${invoice.status.toLowerCase()}`)}
        </span>
      </td>
      {showActions && (
        <td className="p-2 flex gap-2">
          <Link to={`/invoices/${invoice.id}`} className="text-blue-600">
            <i className="fas fa-eye"></i>
          </Link>
          <button onClick={() => generatePDF(invoice)} className="text-blue-600">
            <i className="fas fa-download"></i>
          </button>
          <button
            onClick={() => window.location.href = `mailto:${invoice.client.email}?subject=Invoice ${invoice.id}`}
            className="text-green-600"
          >
            <i className="fas fa-envelope"></i>
          </button>
        </td>
      )}
    </tr>
  );
}

export default InvoiceCard;