const STRINGS = {
  PAGES: {
    CALCULATOR: {
      METHODOLOGY: 'Metodologia',
      DESCRIPTION: 'Opis',
      RESULT: 'Wynik',
      SOURCE: 'Źródło',
      SOURCES: 'Źródła',
      OWN_WORK: 'Opracowanie własne',
      ACCESS: 'dostęp',
    },
    HOME: {
      TITLE: 'Kalkulatory',
    },
    ERROR404: {
      TITLE: 'Nie znaleziono strony!',
    },
    ERROR_BOUNDARY: {
      TITLE: 'Coś poszło nie tak!',
      DESCRIPTION:
        'Przepraszamy, wystąpił błąd. Spróbuj ponownie później lub przejdź na stronę główną.',
    },
    FAVORITES: {
      TITLE: 'Ulubione',
      NO_FAVORITES: {
        TITLE: 'Brak ulubionych',
        DESCRIPTION: 'Możesz dodać kalkulator do ulubionych, klikając przycisk z ikoną serca.',
      },
    },
    IMPORT_FAVORITES: {
      TITLE: 'Importuj ulubione',
      DESCRIPTION:
        'Poniższe kalkulatory zostaną dodane do ulubionych na tym urządzeniu. Jeśli masz już jakieś ulubione kalkulatory, zostaną one zastąpione.',
    },
    SUBMISSION_SUCCESS: {
      TITLE: 'Wiadomość została wysłana!',
    },
  },
  LAYOUTS: {
    FOOTER: {
      TEXT: 'Oskar Kąklewski. Opublikowano na licencji GPL 3.0',
      LINKS: {
        GITHUB: {
          TITLE: 'GitHub',
          URL: 'https://github.com/kaklewski/kalkdoktor',
        },
        PORTFOLIO: {
          TITLE: 'Portfolio',
          URL: 'https://kaklewski.pl',
        },
        LINKEDIN: {
          TITLE: 'LinkedIn',
          URL: 'https://www.linkedin.com/in/oskar-kaklewski',
        },
      },
    },
  },
  MODALS: {
    BUG_REPORT: {
      TITLE: 'Zgłoś błąd w kalkulatorze',
      FORM: {
        BUG_DESCRIPTION: 'Opis błędu',
        RELATED_CALCULATOR: 'Kalkulator, którego dotyczy błąd',
      },
    },
    CONTACT: {
      TITLE: 'Skontaktuj się ze mną',
      FORM: {
        MESSAGE: 'Wiadomość',
      },
    },
    SEARCH: {
      TITLE: 'Wyszukaj kalkulator',
      NO_RESULTS: 'Nie znaleziono kalkulatora',
    },
    SHARE_FAVORITES: {
      TITLE: 'Udostępnij ulubione kalkulatory',
      DESCRIPTION:
        'Skopiuj poniższy link i otwórz go na innym urządzeniu, aby zaimportować ulubione kalkulatory.',
      HOW_IT_WORKS: {
        TITLE: 'Jak to działa?',
        DESCRIPTION:
          'Kalkdoktor zapisuje listę ulubionych kalkulatorów w pamięci lokalnej przeglądarki na danym urządzeniu. Oznacza to, że aby móc korzystać z tych samych ulubionych na innym urządzeniu, trzeba je najpierw udostępnić.',
      },
    },
  },
  FORM: {
    // Common form strings
    // These are used in multiple modals
    EMAIL: 'Twój adres e-mail',
    NAME: 'Twoje imię',
  },
  BUTTONS: {
    CALCULATE: 'Oblicz',
    CANCEL: 'Anuluj',
    CHANGE_THEME: {
      TITLE: 'Zmień motyw',
      LIGHT: 'Zmień motyw na jasny',
      DARK: 'Zmień motyw na ciemny',
      AUTO: 'Zmień motyw na automatyczny',
    },
    CLEAR: 'Wyczyść',
    COPY: 'Skopiuj',
    FAVORITES: 'Ulubione',
    FAVORITES_ADD: 'Dodaj do ulubionych',
    FAVORITES_REMOVE: 'Usuń z ulubionych',
    HOMEPAGE: 'Strona główna',
    IMPORT: 'Importuj',
    REPORT_BUG: 'Zgłoś błąd',
    SEND: 'Wyślij',
    SORT: {
      TITLE: 'Sortuj kalkulatory',
      ORDER: {
        ALPHABETICALLY: 'Alfabetycznie',
        BY_SPECIALIZATION: 'Według specjalizacji',
      },
    },
  },
  FIELDS: {
    NUMBER_INPUT: {
      PLACEHOLDER: 'Podaj wartość',
    },
  },
  TOASTS: {
    COPIED: 'Skopiowano do schowka!',
    FAVORITES: {
      ADDED: 'Dodano do ulubionych!',
      REMOVED: 'Usunięto z ulubionych!',
    },
  },
}

export default STRINGS
