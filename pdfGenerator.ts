import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Invoice } from '../hooks/useInvoices';

export function generatePDF(invoice: Invoice) {
  const element = document.createElement('div');
  element.style.padding = '20px';
  element.innerHTML = `
    <div style="font-family: Cairo, sans-serif;">
      <img src="/logo.png" style="height: 50px;" />
      <h1>Invoice #${invoice.id}</h1>
      <p><strong>From:</strong> EasyInvoice Co., 123 Tahrir St, Cairo</p>
      <p><strong>To:</strong> ${invoice.client.name}, ${invoice.client.address}</p>
      <p><strong>Issue Date:</strong> ${invoice.issueDate}</p>
      <p><strong>Due Date:</strong> ${invoice.dueDate}</p>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid #000;">
            <th style="padding: 8px;">Description</th>
            <th style="padding: 8px;">Qty</th>
            <th style="padding: 8px;">Unit Price</th>
            <th style="padding: 8px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items
            .map(
              (item) => `
            <tr>
              <td style="padding: 8px;">${item.desc}</td>
              <td style="padding: 8px;">${item.qty}</td>
              <td style="padding: 8px;">${item.unitPrice}</td>
              <td style="padding: 8px;">${item.qty * item.unitPrice}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
      <p style="text-align: right;"><strong>Subtotal:</strong> ${invoice.subtotal} EGP</p>
      <p style="text-align: right;"><strong>Tax (${invoice.taxPercent}%):</strong> ${invoice.tax} EGP</p>
      <p style="text-align: right;"><strong>Total:</strong> ${invoice.total} EGP</p>
    </div>
  `;

  document.body.appendChild(element);
  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save(`invoice-${invoice.id}.pdf`);
    document.body.removeChild(element);
  });
}