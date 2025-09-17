import { useState, useEffect } from 'react';
import { rest } from 'msw';
import { setupWorker } from 'msw/browser';
import { handlers } from '../mock/handlers';

const worker = setupWorker(...handlers);

export interface Invoice {
  id: string;
  issueDate: string;
  dueDate: string;
  client: Client;
  items: { desc: string; qty: number; unitPrice: number }[];
  subtotal: number;
  taxPercent: number;
  tax: number;
  discount: number;
  total: number;
  status: 'Paid' | 'Unpaid' | 'Partially Paid';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  vatNumber?: string;
}

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    worker.start();
    fetch('/api/invoices')
      .then((res) => res.json())
      .then((data) => setInvoices(data));
    fetch('/api/clients')
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  const addInvoice = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
  };

  const updateInvoice = (id: string, updated: Invoice) => {
    setInvoices(invoices.map((inv) => (inv.id === id ? updated : inv)));
  };

  const addClient = (client: Client) => {
    setClients([...clients, client]);
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  return { invoices, clients, addInvoice, updateInvoice, addClient, deleteClient };
}