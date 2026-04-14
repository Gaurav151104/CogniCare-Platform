import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
const resources = {
  en: {
    translation: {
      "CogniCare": "CogniCare",
      "Dashboard": "Dashboard",
      "Games": "Games",
      "Voice Test": "Voice Test",
      "Logout": "Logout",
      "Login": "Login",
      "Register": "Register",
      "chatbot_greeting": "Hi! How can I help you today?",
      "chatbot_placeholder": "Type a message...",
      "welcome": "Welcome to CogniCare",
      "dashboard_title": "Your Dashboard",
    }
  },
  es: {
    translation: {
      "CogniCare": "CogniCare",
      "Dashboard": "Panel",
      "Games": "Juegos",
      "Voice Test": "Prueba de Voz",
      "Logout": "Cerrar sesión",
      "Login": "Iniciar sesión",
      "Register": "Registrarse",
      "chatbot_greeting": "¡Hola! ¿Cómo puedo ayudarte hoy?",
      "chatbot_placeholder": "Escribe un mensaje...",
      "welcome": "Bienvenido a CogniCare",
      "dashboard_title": "Tu Panel",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
