import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: { translation: { app: { title: 'AccurateBooks' }, auth: { login: 'Login', signup: 'Sign up', email: 'Email', password: 'Password', google: 'Continue with Google', phone: 'Phone', sendOtp: 'Send OTP', verifyOtp: 'Verify OTP' } } },
	hi: { translation: { app: { title: 'एक्यूरेटबुक्स' }, auth: { login: 'लॉगिन', signup: 'साइन अप', email: 'ईमेल', password: 'पासवर्ड', google: 'Google से जारी रखें', phone: 'फ़ोन', sendOtp: 'OTP भेजें', verifyOtp: 'OTP सत्यापित करें' } } }
};

if (!i18n.isInitialized) {
	i18n.use(initReactI18next).init({ resources, lng: 'en', fallbackLng: 'en', interpolation: { escapeValue: false } });
}

export default i18n;