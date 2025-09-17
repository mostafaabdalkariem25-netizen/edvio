import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Settings() {
  const { t, i18n } = useTranslation();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold font-cairo mb-8">{t('settings.title')}</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-lg font-bold font-poppins">{t('settings.company')}</h2>
          <input
            type="text"
            placeholder={t('settings.companyName')}
            className="w-full p-2 border rounded-lg dark:bg-gray-700"
            defaultValue="EasyInvoice Co."
          />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold font-poppins">{t('settings.language')}</h2>
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700"
          >
            <option value="ar">{t('settings.arabic')}</option>
            <option value="en">{t('settings.english')}</option>
          </select>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold font-poppins">{t('settings.theme')}</h2>
          <button onClick={toggleTheme} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
            {t('settings.toggleTheme')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;