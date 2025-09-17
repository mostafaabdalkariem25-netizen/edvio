import { Invoice } from '../src/hooks/useInvoices';

describe('Invoice Calculations', () => {
  const invoice: Invoice = {
    id: 'INV-2025-001',
    issueDate: '2025-09-01',
    dueDate: '2025-09-15',
    client: {
      id: 'C001',
      name: 'شركة النخبة للتجارة',
      email: 'info@alkhibah.example',
      address: 'شارع التحرير، القاهرة',
      phone: '+20-10-1234-5678',
      vatNumber: 'EG-123456789',
    },
    items: [
      { desc: 'تصميم موقع', qty: 1, unitPrice: 2500 },
      { desc: 'استضافة سنوية', qty: 1, unitPrice: 300 },
    ],
    subtotal: 2800,
    taxPercent: 14,
    tax: 392,
    discount: 0,
    total: 3192,
    status: 'Unpaid',
  };

  test('calculates subtotal correctly', () => {
    const subtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
    expect(subtotal).toBe(2800);
  });

  test('calculates tax correctly', () => {
    const tax = invoice.subtotal * (invoice.taxPercent / 100);
    expect(tax).toBe(392);
  });

  test('calculates total correctly', () => {
    const total = invoice.subtotal + invoice.tax - invoice.discount;
    expect(total).toBe(3192);
  });
});