import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		translation: {
			app: { title: 'AccurateBooks' },
			nav: { dashboard: 'Dashboard', invoices: 'Invoices', gst: 'GST', bookkeeping: 'Bookkeeping', storage: 'Documents', ca: 'CA Panel' }
		}
	},
	hi: {
		translation: {
			app: { title: 'एक्यूरेटबुक्स' },
			nav: { dashboard: 'डैशबोर्ड', invoices: 'इनवॉइस', gst: 'जीएसटी', bookkeeping: 'बुककीपिंग', storage: 'दस्तावेज़', ca: 'सीए पैनल' }
		}
	}
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	fallbackLng: 'en',
	interpolation: { escapeValue: false }
});

export default i18n;

