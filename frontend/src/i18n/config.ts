// src/i18n/config.ts

// Core i18next library.
import i18n from "i18next";
// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from "react-i18next";
export const supportedLngs = {
    en: "English",
    pl: "Polski",
};
i18n
    // Add React bindings as a plugin.
    .use(initReactI18next)
    // Initialize the i18next instance.
    .init({
        // Config options

        // Specifies the default language (locale) used
        // when a user visits our site for the first time.
        // We use English here, but feel free to use
        // whichever locale you want.
        lng: "en",

        // Fallback locale used when a translation is
        // missing in the active locale. Again, use your
        // preferred locale here.
        fallbackLng: "en",

        // Enables useful output in the browser’s
        // dev console.
        debug: true,

        // Normally, we want `escapeValue: true` as it
        // ensures that i18next escapes any code in
        // translation messages, safeguarding against
        // XSS (cross-site scripting) attacks. However,
        // React does this escaping itself, so we turn
        // it off in i18next.
        interpolation: {
            escapeValue: false,
        },
        supportedLngs: Object.keys(supportedLngs),
        // Translation messages. Add any languages
        // you want here.
        resources: {
            // English
            en: {
                // `translation` is the default namespace.
                // More details about namespaces shortly.
                translation: {
                    rent: "Rent",
                    electricity: "Electricity",
                    cooperative: "Cooperative",
                    water: "Water",
                    login: "Login",
                    password: "Password",
                    name: "Name",
                    sign_in: "SignIn",
                    submit: "Submit",
                    logged_in: "You are already logged in",
                    logout: "Logout",
                    apartment_name: "Name of apartment",
                    apartment_description: "Description of apartment",
                    tenant: "Tenant",
                    cancel: "Cancel",
                    cancel_payment: "cancel payment",
                    approve_payment: "approve payment",
                    add_invoice: "Add an invoice for",
                    add_apartment: "Add an apartment",
                    invoice_name: "Name of invoice",
                    invoice_date: "Date of invoice",
                    give_name: "Name required",
                    give_date: "Date required",
                    give_amount: "Amount required",
                    give_password: "Password required",
                    give_tenant: "Tenant required",
                    give_description: "Description required",
                    give_email: "Email required",
                    invoice_amount: "Invoice amount",
                    not_invoice:
                        "Youd do not have any invoice for that category",
                    home: "Home",
                    profile: "Profile",
                    invoices: "Invoices",
                    amount: "Amount",
                    are_you_sure: "Are you sure that you want to ",
                    title: "Title",
                    date: "Date",
                    me: "Me",
                    I: "I",
                    logged_in_popup: "You are logged as: ",

                    password_6: "Password should contain at least 6 characters",
                    invoices_to_pay: "Invoices to pay: ",
                    invoices_to_be_paid: "Invoices to be paid to you: ",
                    amount_to_pay: "Amount that you must pay: ",
                    amount_to_be_paid:
                        "Amount that tenants need to pay to you: ",
                    profile_page: "Profile page",
                    difference: "Difference: ",
                    invoice_added: "Invoice added",
                    invoice_not_added: "Invoice do not added",
                    apartment_added: "Apartment added",
                    apartment_not_added: "Apartment do not added",
                    give_subject: "Subject required",
                    give_body: "Body required",
                    send_email: "Sent reminder via email",
                    subject: "Email subject",
                    email_tenant: "Email of tenant",
                    body_email: "Body of email",
                    email_sent: "Email sent successfully",
                    email_not_sent: "Email do not sent",
                    email_already_sent:
                        "You already sent email to that tenant in the last 24 hours",
                },
            },
            // Arabic
            pl: {
                translation: {
                    rent: "Czynsz",
                    electricity: "Prąd",
                    cooperative: "Spółdzielnia",
                    water: "Woda",
                    login: "Zaloguj się",
                    password: "Hasło",
                    name: "Imię",
                    sign_in: "Zarejestruj się",
                    submit: "Zatwierdź",
                    logged_in: "Jesteś już zalogowany",
                    logout: "Wyloguj",
                    apartment_name: "Nazwa apartamentu",
                    apartment_description: "Opis apartamentu",
                    tenant: "Lokator",
                    cancel: "Anuluj",
                    cancel_payment: "anulować płatność",
                    approve_payment: "zatwierdzić płatność",
                    add_invoice: "Dodaj fakturę dla",
                    add_apartment: "Dodaj mieszkanie",
                    invoice_name: "Nazwa faktury",
                    logged_in_popup: "Zalogowano jako: ",
                    invoice_date: "Data faktury",
                    give_name: "Wymagane imię",
                    give_date: "Wymagana data",
                    give_amount: "Wymagana kwota",
                    give_tenant: "Wymagany lokator",
                    give_description: "Wymagany opis",
                    invoice_amount: "Kwota faktury",
                    not_invoice:
                        "Nie masz jeszcze żadnej faktury w tej kategorii",
                    home: "Strona główna",
                    profile: "Profil",
                    invoices: "Faktury",
                    are_you_sure: "Czy na pewno chcesz ",
                    title: "Tytuł",
                    amount: "Kwota",
                    date: "Data",
                    me: "Mi",
                    I: "Ja",
                    give_password: "Wymagane hasło",
                    give_email: "Wymagany email",
                    password_6: "Hasło musi mieć conajmniej 6 liter",
                    invoices_to_pay: "Faktury do zapłacenia: ",
                    invoices_to_be_paid: "Faktury do zapłacenia Tobie: ",
                    amount_to_pay: "Kwota, którą musisz zapłacić: ",
                    amount_to_be_paid:
                        "Kwota, którą lokatorzy muszą zapłacić Tobie: ",
                    profile_page: "Twój profil",
                    difference: "Różnica: ",
                    invoice_added: "Dodano fakturę",
                    invoice_not_added: "Nie dodano faktury",
                    apartment_added: "Dodano mieszkanie",
                    apartment_not_added: "Nie dodano mieszkania",
                },
            },
        },
    });

export default i18n;
