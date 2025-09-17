import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';

function Landing() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center" data-aos="fade-up">
        <motion.h1
          className="text-4xl md:text-5xl font-bold font-cairo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('hero.title')}
        </motion.h1>
        <p className="mt-4 text-lg font-poppins">{t('hero.subtitle')}</p>
        <Link
          to="/dashboard"
          className="mt-6 inline-block bg-green-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-green-600"
        >
          {t('hero.cta')}
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center font-cairo mb-8">{t('features.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <i className="fas fa-file-invoice text-4xl text-blue-600 mb-4"></i>
            <h3 className="text-xl font-bold font-poppins">{t('features.create')}</h3>
            <p className="text-gray-600 dark:text-gray-300 font-cairo">{t('features.createDesc')}</p>
          </div>
          <div className="text-center">
            <i className="fas fa-download text-4xl text-blue-600 mb-4"></i>
            <h3 className="text-xl font-bold font-poppins">{t('features.download')}</h3>
            <p className="text-gray-600 dark:text-gray-300 font-cairo">{t('features.downloadDesc')}</p>
          </div>
          <div className="text-center">
            <i className="fas fa-chart-bar text-4xl text-blue-600 mb-4"></i>
            <h3 className="text-xl font-bold font-poppins">{t('features.reports')}</h3>
            <p className="text-gray-600 dark:text-gray-300 font-cairo">{t('features.reportsDesc')}</p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center font-cairo mb-8">{t('screenshots.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <img src="/images/dashboard.png" alt="Dashboard" className="rounded-lg shadow-md" />
          <img src="/images/invoices.png" alt="Invoices" className="rounded-lg shadow-md" />
          <img src="/images/invoice-detail.png" alt="Invoice Detail" className="rounded-lg shadow-md" />
          <img src="/images/clients.png" alt="Clients" className="rounded-lg shadow-md" />
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center font-cairo mb-8">{t('contact.title')}</h2>
        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="font-cairo">&copy; 2025 EasyInvoice. {t('footer.rights')}</p>
        <div className="mt-4">
          <a href="#" className="mx-2 font-poppins">{t('footer.privacy')}</a>
          <a href="#" className="mx-2 font-poppins">{t('footer.terms')}</a>
          <a href="#" className="mx-2"><i className="fab fa-twitter"></i></a>
          <a href="#" className="mx-2"><i className="fab fa-linkedin"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default Landing;