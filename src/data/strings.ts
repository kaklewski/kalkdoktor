const STRINGS = {
  BUTTONS: {
    CALCULATE: 'Oblicz',
    CANCEL: 'Anuluj',
    CHANGE_THEME: {
      TITLE: 'Zmień motyw',
      AUTO: 'Automatyczny',
      LIGHT: 'Jasny',
      DARK: 'Ciemny',
    },
    CLEAR: 'Wyczyść',
    COPY: 'Skopiuj',
    FAVORITES: {
      TITLE: 'Ulubione',
      ACTION: {
        ADD: 'Dodaj do ulubionych',
        REMOVE: 'Usuń z ulubionych',
      },
    },
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
  FORM: {
    // Common form strings
    // These are used in multiple modals
    EMAIL: 'Twój adres e-mail',
    NAME: 'Twoje imię',
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
    HOME: {
      TITLE: 'Kalkulatory',
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
  TOASTS: {
    COPIED: 'Skopiowano do schowka!',
    FAVORITES: {
      ADDED: 'Dodano do ulubionych!',
      REMOVED: 'Usunięto z ulubionych!',
    },
  },
}

export default STRINGS
