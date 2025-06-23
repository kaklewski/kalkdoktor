import sumInputValues from '../utils/sumInputValues'
import { CalculatorType } from '../types/calculatorTypes'
import { MathJax } from 'better-react-mathjax'
import { ListItem, Text, UnorderedList } from '@chakra-ui/react'

export const calculators: CalculatorType[] = [
  {
    id: 1,
    name: 'Kalkulator BMI',
    urlPath: 'kalkulator-bmi',
    category: 'antropometria',
    description:
      'Pomaga określić, czy masa ciała danej osoby jest w normie, zbyt niska lub zbyt wysoka w stosunku do wzrostu.',
    methodology: (
      <>
        <Text>
          Wskaźnik masy ciała (BMI, ang. <em>Body Mass Index</em>) oblicza się jako iloraz masy
          ciała i kwadratu wzrostu.
        </Text>
        <br />
        <MathJax>{'`BMI = m/(h^2)`'}</MathJax>
        <br />
        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>m</strong> – masa ciała wyrażona w kilogramach (kg),
          </ListItem>
          <ListItem>
            <strong>h</strong> – wzrost wyrażony w metrach (m).
          </ListItem>
        </UnorderedList>
        <br />
        <Text>Interpretacja wartości BMI:</Text>
        <UnorderedList>
          <ListItem>Niedowaga: BMI &lt; 18.5</ListItem>
          <ListItem>Wartość prawidłowa: 18.5 ≤ BMI &lt; 25</ListItem>
          <ListItem>Nadwaga: 25 ≤ BMI &lt; 30</ListItem>
          <ListItem>Otyłość I stopnia: 30 ≤ BMI &lt; 35</ListItem>
          <ListItem>Otyłość II stopnia: 35 ≤ BMI &lt; 40</ListItem>
          <ListItem>Otyłość III stopnia: BMI ≥ 40</ListItem>
        </UnorderedList>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Narodowy Instytut Kardiologii',
        title: 'Badanie BMI',
        dateOfAccess: '20.09.2024',
        link: 'https://www.ikard.pl/badanie-bmi.html',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'bodyMass',
          text: 'Masa ciała (kg)',
          min: 1,
          max: 200,
        },
        {
          id: 'height',
          text: 'Wzrost (cm)',
          min: 1,
          max: 230,
        },
      ],
      checkboxes: null,
      radioGroups: null,
    },
    resultUnit: null,

    getResult: () => {
      const bodyMass = parseFloat((document.getElementById('bodyMass') as HTMLInputElement).value)
      const height = parseFloat((document.getElementById('height') as HTMLInputElement).value) / 100
      const result: number = Math.round(bodyMass / (height * height))
      return result
    },

    getResultInterpretation: (result: number) => {
      if (result === 0) return 'Uzupełnij wszystkie informacje.'
      if (result > 0 && result < 18.5) return 'Niedowaga'
      if (result >= 18.5 && result < 25) return 'Wartość prawidłowa'
      if (result >= 25 && result < 30) return 'Nadwaga'
      if (result >= 30 && result < 35) return 'Otyłość I stopnia'
      if (result >= 35 && result < 40) return 'Otyłość II stopnia'
      if (result >= 40) return 'Otyłość III stopnia'
      return ''
    },
  },

  {
    id: 2,
    name: 'Skala CHA₂DS₂-VASc',
    urlPath: 'skala-cha2ds2-vasc',
    category: 'kardiologia',
    description:
      'Ocenia ryzyko wystąpienia powikłań zakrzepowo-zatorowych u pacjentów z migotaniem przedsionków.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'MDCalc (dr Gregory Lip)',
        title: 'CHA₂DS₂-VASc Score for Atrial Fibrillation Stroke Risk',
        dateOfAccess: '20.09.2024',
        link: 'https://www.mdcalc.com/calc/801/cha2ds2-vasc-score-atrial-fibrillation-stroke-risk',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: [
        {
          id: 1,
          value: 1,
          text: 'Zastoinowa niewydolność serca / dysfunkcja lewej komory',
        },
        {
          id: 2,
          value: 1,
          text: 'Nadciśnienie tętnicze',
        },
        {
          id: 3,
          value: 1,
          text: 'Cukrzyca',
        },
        {
          id: 4,
          value: 1,
          text: 'Choroba naczyniowa (przebyty zawał serca, miażdżycowa choroba tętnic obwodowych, blaszki miażdżycowe w aorcie)',
        },
        {
          id: 5,
          value: 2,
          text: 'Przebyty udar mózgu / TIA / incydent zakrzepowo-zatorowy',
        },
      ],
      radioGroups: [
        {
          id: 1,
          text: 'Płeć',
          radios: [
            {
              id: 'male',
              value: 0,
              text: 'Mężczyzna',
            },
            {
              id: 'female',
              value: 1,
              text: 'Kobieta',
            },
          ],
        },
        {
          id: 2,
          text: 'Wiek',
          radios: [
            {
              id: 1,
              value: 0,
              text: 'Mniej niż 65 lat',
            },
            {
              id: 2,
              value: 1,
              text: '65 - 74 lata',
            },
            {
              id: 3,
              value: 2,
              text: '75 lat lub więcej',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      const maleCheckbox = document.getElementById('male') as HTMLInputElement
      const isMale: boolean = maleCheckbox && maleCheckbox.checked ? true : false

      const lowRisk: string = 'Niskie ryzyko powikłań. Nie zaleca się leczenia.'
      const mediumRisk: string =
        'Umiarkowane ryzyko powikłań. Należy rozważyć doustny antykoagulant.'
      const highRisk: string = 'Wysokie ryzyko powikłań. Należy zastosować doustny antykoagulant.'

      if (isMale) {
        if (result <= 0) return lowRisk
        if (result == 1) return mediumRisk
        if (result >= 2) return highRisk
      } else {
        if (result <= 1) return lowRisk
        if (result == 2) return mediumRisk
        if (result >= 3) return highRisk
      }
      return lowRisk
    },
  },

  {
    id: 3,
    name: 'Skala Centora w modyfikacji McIsaaca',
    urlPath: 'skala-centora-mcisaaca',
    category: 'choroby zakaźne',
    description:
      'Szacuje ryzyko zapalenia paciorkowcowego (PBHA) i dobrać odpowiednie postępowanie.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Tabela 3.3-1. Skala Centora w modyfikacji McIsaaca',
        dateOfAccess: '20.09.2024',
        link: 'https://www.mp.pl/interna/table/B16.3.3-1.',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: [
        {
          id: 1,
          value: 1,
          text: 'Temperatura ciała powyżej 38°C',
        },
        {
          id: 2,
          value: 1,
          text: 'Nie występuje kaszel',
        },
        {
          id: 3,
          value: 1,
          text: 'Powiększone węzły chłonne szyjne przednie',
        },
        {
          id: 4,
          value: 1,
          text: 'Wysięk na migdałkach i ich obrzęk',
        },
      ],
      radioGroups: [
        {
          id: 10,
          text: 'Wiek',
          radios: [
            {
              id: 11,
              value: 1,
              text: '3 - 14 lat',
            },
            {
              id: 12,
              value: 0,
              text: '15 - 44 lata',
            },
            {
              id: 13,
              value: -1,
              text: '45 lat lub więcej',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result >= 4) {
        return 'Przy nasilonych objawach należy stosować antybiotyk. Przy łagodnych objawach zalecane jest wykonanie szybkiego testu na obecność antygenu PBHA lub posiewu wymazu z gardła. Decyzja o leczeniu zależna od wyniku.'
      }
      if (result >= 2 && result <= 3) {
        return 'Zalecane jest wykonanie szybkiego testu na obecność antygenu PBHA lub posiewu wymazu z gardła. Decyzja o leczeniu zależna od wyniku.'
      }
      return 'Zalecane leczenie objawowe. Diagnostyka bakteriologiczna nie jest potrzebna.'
    },
  },

  {
    id: 4,
    name: 'Ocena ryzyka ZŻG w skali Wellsa',
    urlPath: 'ocena-zakrzepicy-wellsa',
    category: 'kardiologia',
    description:
      'Oblicza ryzyko wystąpienia zakrzepicy żył głębokich na podstawie kryteriów klinicznych.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Ocena prawdopodobieństwa klinicznego ZŻG w skali Wellsa',
        dateOfAccess: '20.09.2024',
        link: 'https://www.mp.pl/interna/table/B16.2.33-1.',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: [
        {
          id: 1,
          value: 1,
          text: 'Nowotwór złośliwy (w trakcie leczenia lub rozpoznany w ciągu ostatnich 6 miesięcy)',
        },
        {
          id: 2,
          value: 1,
          text: 'Porażenie, niedowład lub niedawne unieruchomienie kończyny dolnej w opatrunku gipsowym',
        },
        {
          id: 3,
          value: 1,
          text: 'Niedawne unieruchomienie w łóżku przez ponad 3 dni lub duża operacja w ciągu ostatnich 4 tygodni',
        },
        {
          id: 4,
          value: 1,
          text: 'Bolesność miejscowa w przebiegu żył głębokich kończyny dolnej',
        },
        {
          id: 5,
          value: 1,
          text: 'Obrzęk całej kończyny dolnej',
        },
        {
          id: 6,
          value: 1,
          text: 'Obrzęk łydki ponad 3 cm w porównaniu do drugiej nogi (mierzony 10 cm poniżej guzowatości kości piszczelowej)',
        },
        {
          id: 7,
          value: 1,
          text: 'Obrzęk ciastowaty, większy na objawowej kończynie',
        },
        {
          id: 8,
          value: 1,
          text: 'Widoczne żyły powierzchowne krążenia obocznego (nieżylakowe)',
        },
        {
          id: 9,
          value: -2,
          text: 'Inne rozpoznanie niż ZŻG równie lub bardziej prawdopodobne',
        },
        {
          id: 10,
          value: 1,
          text: 'Wcześniej przebyta ZŻG',
        },
      ],
      radioGroups: null,
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result >= 3) {
        return 'Wysokie prawdopodobieństwo zakrzepicy żył głębokich.'
      }
      if (result === 1 || result === 2) {
        return 'Średnie prawdopodobieństwo zakrzepicy żył głębokich.'
      }
      return 'Małe prawdopodobieństwo zakrzepicy żył głębokich.'
    },
  },

  {
    id: 5,
    name: 'Kalkulator liczby opakowań leków na dany okres',
    urlPath: 'kalkulator-liczby-opakowan-na-okres',
    category: 'dawkowanie leków',
    description: 'Oblicza liczbę opakowań leku, którą należy przepisać na podstawie dawkowania.',
    methodology: (
      <>
        <Text>
          Liczbę opakowań leku niezbędnych do przeprowadzenia terapii oblicza się według wzoru:
        </Text>
        <br />
        <MathJax>{'`p = (t * d * n ) / c`'}</MathJax>
        <br />
        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>p</strong> – liczba wymaganych opakowań,
          </ListItem>
          <ListItem>
            <strong>t</strong> – liczba tabletek w jednej dawce,
          </ListItem>
          <ListItem>
            <strong>d</strong> – liczba dawek dziennie,
          </ListItem>
          <ListItem>
            <strong>n</strong> – liczba dni terapii,
          </ListItem>
          <ListItem>
            <strong>c</strong> – liczba tabletek w jednym opakowaniu.
          </ListItem>
        </UnorderedList>
        <br />
        <Text>
          Uzyskany wynik należy zaokrąglić w górę do najbliższej liczby całkowitej, aby zapewnić
          wystarczającą liczbę tabletek na cały okres terapii.
        </Text>
      </>
    ),
    sources: null,
    fields: {
      numberInputs: [
        {
          id: 'amountPerIntake',
          text: 'Liczba tabletek w jednej dawce',
          min: 1,
          max: 100,
        },
        {
          id: 'numberOfIntakes',
          text: 'Liczba dawek dziennie',
          min: 1,
          max: 100,
        },
        {
          id: 'daysOfUse',
          text: 'Okres (liczba dni) brania leku',
          min: 1,
          max: 365,
        },
        {
          id: 'packageSize',
          text: 'Liczba tabletek w opakowaniu',
          min: 1,
          max: 200,
        },
      ],
      checkboxes: null,
      radioGroups: null,
    },
    resultUnit: null,

    getResult: () => {
      const amountPerIntake: number = parseFloat(
        (document.getElementById('amountPerIntake') as HTMLInputElement).value
      )
      const numberOfIntakes: number = parseFloat(
        (document.getElementById('numberOfIntakes') as HTMLInputElement).value
      )
      const daysOfUse: number = parseFloat(
        (document.getElementById('daysOfUse') as HTMLInputElement).value
      )
      const packageSize: number = parseFloat(
        (document.getElementById('packageSize') as HTMLInputElement).value
      )
      const result: number = Math.round(
        (amountPerIntake * numberOfIntakes * daysOfUse) / packageSize
      )
      return result
    },

    getResultInterpretation: () => {
      return 'Liczba opakowań, które należy przepisać.'
    },
  },

  {
    id: 6,
    name: 'Obliczanie dawki paracetamolu',
    urlPath: 'obliczanie-dawki-paracetamolu',
    category: 'dawkowanie leków',
    description:
      'Oblicza maksymalną dobową dawkę paracetamolu biorąc pod uwagę wiek i masę ciała pacjenta.',
    methodology: (
      <>
        <Text>
          Maksymalna dobowa dawka paracetamolu jest obliczana na podstawie masy ciała pacjenta i
          ograniczeń wiekowych.
        </Text>
        <br />
        <MathJax>{'`d = (60 * m) / 1000`'}</MathJax>
        <br />
        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>d</strong> – maksymalna dobowa dawka paracetamolu wyrażona w gramach (g),
          </ListItem>
          <ListItem>
            <strong>m</strong> – masa ciała pacjenta wyrażona w kilogramach (kg).
          </ListItem>
        </UnorderedList>
        <br />
        <Text>
          W przypadku dzieci do 12. roku życia maksymalna dawka nie powinna przekraczać 2 g, a u
          dorosłych 4 g.
        </Text>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Paracetamol (Portal lekarzy)',
        dateOfAccess: '20.09.2024',
        link: 'https://indeks.mp.pl/leki/desc.php?id=631',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'age',
          text: 'Wiek (lata)',
          min: 1,
          max: 120,
        },
        {
          id: 'weight',
          text: 'Masa ciała (kg)',
          min: 1,
          max: 200,
        },
      ],
      checkboxes: null,
      radioGroups: null,
    },
    resultUnit: 'g',

    getResult: () => {
      const age: number = parseFloat((document.getElementById('age') as HTMLInputElement).value)
      const weight: number = parseFloat(
        (document.getElementById('weight') as HTMLInputElement).value
      )
      let result: number = (60 * weight) / 1000
      if (age <= 12 && result > 2) result = 2
      if (result > 4) result = 4
      return result
    },

    getResultInterpretation: (result: number) => {
      if (result === 0) return 'Uzupełnij wszystkie informacje.'
      return 'Maksymalna dobowa dawka paracetamolu.'
    },
  },

  {
    id: 7,
    name: 'Skala HAS-BLED',
    urlPath: 'skala-has-bled',
    category: 'kardiologia',
    description: 'Szacuje ryzyko poważnego krwawienia u pacjentów z migotaniem przedsionków.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title:
          'Tabela 2.6-8. Skala HAS-BLED do oceny ryzyka krwawienia u chorych z migotaniem przedsionków',
        dateOfAccess: '20.09.2024',
        link: 'https://www.mp.pl/interna/table/016_4938',
      },
      {
        id: 2,
        author: 'MDCalc (dr Ron Pisters)',
        title: 'HAS-BLED Score for Major Bleeding Risk',
        dateOfAccess: '20.09.2024',
        link: 'https://www.mdcalc.com/calc/807/has-bled-score-major-bleeding-risk',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: [
        {
          id: 1,
          value: 1,
          text: 'Nadciśnienie tętnicze z SBP powyżej 160 mmHg',
        },
        {
          id: 2,
          value: 1,
          text: 'Nieprawidłowa funkcja nerek: przewlekła dializoterapia, stan po przeszczepieniu nerki lub stężenie kreatyniny w surowicy powyżej 200 µmol/l (2.26 mg/dL)',
        },
        {
          id: 3,
          value: 1,
          text: 'Nieprawidłowa funkcja wątroby: przewlekła choroba wątroby lub biochemiczne cechy istotnego uszkodzenia wątroby',
        },
        {
          id: 4,
          value: 1,
          text: 'Przebyty udar mózgu',
        },
        {
          id: 5,
          value: 1,
          text: 'Predyspozycja do krwawienia i/lub poważne krwawienie w wywiadzie',
        },
        {
          id: 6,
          value: 1,
          text: 'Niestabilne wartości INR - wahające się duże wartości lub często poza przedziałem terapeutycznym',
        },
        {
          id: 7,
          value: 1,
          text: 'Wiek powyżej 65 lat',
        },
        {
          id: 8,
          value: 1,
          text: 'Przyjmowanie leków z grupy NLPZ',
        },
        {
          id: 9,
          value: 1,
          text: 'Nadmierne spożycie alkoholu',
        },
      ],
      radioGroups: null,
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result >= 4) {
        return 'Duże ryzyko krwawienia.'
      }
      return 'Nieduże ryzyko krwawienia.'
    },
  },

  {
    id: 8,
    name: 'Skala Glasgow',
    urlPath: 'skala-glasgow',
    category: 'neurologia',
    description: 'Ocenia poziom przytomności u dorosłych.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Tabela 1.34-2. Skala Glasgow',
        dateOfAccess: '20.09.2024',
        link: 'https://www.mp.pl/interna/table/B16.1.33-2.',
      },
      {
        id: 2,
        author: 'remedium.md',
        title: 'Skala Glasgow - ocena stopnia przytomności u dorosłych',
        dateOfAccess: '20.09.2024',
        link: 'https://remedium.md/kalkulatory/neurologia/skala-glasgow-ocena-stopnia-przytomno%C5%9Bci-u-doros%C5%82ych',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Otwieranie oczu',
          radios: [
            {
              id: 11,
              value: 4,
              text: 'Spontaniczne',
            },
            {
              id: 12,
              value: 3,
              text: 'Na polecenie',
            },
            {
              id: 13,
              value: 2,
              text: 'W odpowiedzi na bodziec bólowy',
            },
            {
              id: 14,
              value: 1,
              text: 'Nie otwiera oczu',
            },
          ],
        },
        {
          id: 20,
          text: 'Odpowiedź słowna',
          radios: [
            {
              id: 21,
              value: 5,
              text: 'Prawidłowa, pacjent jest w pełni zorientowany',
            },
            {
              id: 22,
              value: 4,
              text: 'Odpowiada, ale jest zdezorientowany',
            },
            {
              id: 23,
              value: 3,
              text: 'Używa niewłaściwych słów',
            },
            {
              id: 24,
              value: 2,
              text: 'Wydaje nieartykułowane dźwięki',
            },
            {
              id: 25,
              value: 1,
              text: 'Brak reakcji',
            },
          ],
        },
        {
          id: 30,
          text: 'Reakcja ruchowa',
          radios: [
            {
              id: 31,
              value: 6,
              text: 'Na polecenie',
            },
            {
              id: 32,
              value: 5,
              text: 'Potrafi umiejscowić bodziec bólowy',
            },
            {
              id: 33,
              value: 4,
              text: 'Prawidłowa reakcja zgięciowa (wycofanie w odpowiedzi na bodziec bólowy)',
            },
            {
              id: 34,
              value: 3,
              text: 'Nieprawidłowa reakcja zgięciowa (odkorowanie)',
            },
            {
              id: 35,
              value: 2,
              text: 'Reakcja wyprostna (sztywność odmóżdżeniowa)',
            },
            {
              id: 36,
              value: 1,
              text: 'Brak reakcji',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result >= 13) return 'Łagodne zaburzenia świadomości.'
      if (result >= 9) return 'Umiarkowane zaburzenia świadomości.'
      if (result >= 6) return 'Brak przytomności.'
      if (result === 5) return 'Odkorowanie.'
      if (result === 4) return 'Odmóżdżenie.'
      if (result === 3) return 'Śmierć mózgu.'
      return 'Uzupełnij wszystkie informacje.'
    },
  },

  {
    id: 9,
    name: 'Kwestionariusz PHQ-9',
    urlPath: 'kwestionariusz-phq9',
    category: 'psychiatria',
    description: 'Pozwala ocenić stopień nasilenia epizodu depresyjnego.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'phq9.pl',
        title: 'PHQ-9',
        dateOfAccess: '20.09.2024',
        link: 'https://www.phq9.pl/',
      },
      {
        id: 2,
        author: 'ECFS.eu',
        title: 'Kwestionariusz zdrowia pacjenta-9 (PHQ-9)',
        dateOfAccess: '20.09.2024',
        link: 'https://www.ecfs.eu/sites/default/files/general-content-files/working-groups/Mental%20Health/PHQ9_Polish%20for%20Poland.pdf',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi niewielkie zainteresowanie lub odczuwanie przyjemności z wykonywania czynności?',
          radios: [
            {
              id: 11,
              value: 0,
              text: 'Wcale nie dokuczało',
            },
            {
              id: 12,
              value: 1,
              text: 'Kilka dni',
            },
            {
              id: 13,
              value: 2,
              text: 'Więcej niż połowę dni',
            },
            {
              id: 14,
              value: 3,
              text: 'Niemal codziennie',
            },
          ],
        },
        {
          id: 20,
          text: 'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi uczucie smutku, przygnębienia lub beznadziejności?',
          radios: [
            {
              id: 21,
              value: 0,
              text: 'Wcale nie dokuczało',
            },
            {
              id: 22,
              value: 1,
              text: 'Kilka dni',
            },
            {
              id: 23,
              value: 2,
              text: 'Więcej niż połowę dni',
            },
            {
              id: 24,
              value: 3,
              text: 'Niemal codziennie',
            },
          ],
        },
        {
          id: 30,
          text: 'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi kłopoty z zaśnięciem, przerywany sen albo zbyt długi sen?',
          radios: [
            {
              id: 31,
              value: 0,
              text: 'Wcale nie dokuczały',
            },
            {
              id: 32,
              value: 1,
              text: 'Kilka dni',
            },
            {
              id: 33,
              value: 2,
              text: 'Więcej niż połowę dni',
            },
            {
              id: 34,
              value: 3,
              text: 'Niemal codziennie',
            },
          ],
        },
        {
          id: 40,
          text: 'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi uczucie zmęczenia lub brak energii?',
          radios: [
            {
              id: 41,
              value: 0,
              text: 'Wcale nie dokuczało',
            },
            {
              id: 42,
              value: 1,
              text: 'Kilka dni',
            },
            {
              id: 43,
              value: 2,
              text: 'Więcej niż połowę dni',
            },
            {
              id: 44,
              value: 3,
              text: 'Niemal codziennie',
            },
          ],
        },
        {
          id: 50,
          text: 'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi brak apetytu lub przejadanie się?',
          radios: [
            {
              id: 51,
              value: 0,
              text: 'Wcale nie dokuczały',
            },
            {
              id: 52,
              value: 1,
              text: 'Kilka dni',
            },
            {
              id: 53,
              value: 2,
              text: 'Więcej niż połowę dni',
            },
            {
              id: 54,
              value: 3,
              text: 'Niemal codziennie',
            },
          ],
        },
        {
          id: 60,
          text: 'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi poczucie niezadowolenia z siebie lub uczucie, że jest do niczego albo że zawiódł/zawiodła siebie lub rodzinę?',
          radios: [
            {
              id: 61,
              value: 0,
              text: 'Wcale nie dokuczało',
            },
            {
              id: 62,
              value: 1,
              text: 'Kilka dni',
            },
            {
              id: 63,
              value: 2,
              text: 'Więcej niż połowę dni',
            },
            {
              id: 64,
              value: 3,
              text: 'Niemal codziennie',
            },
          ],
        },
        {
          id: 70,
          text: 'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi problemy ze skupieniem się, na przykład przy czytaniu gazety lub oglądaniu telewizji?',
          radios: [
            {
              id: 71,
              value: 0,
              text: 'Wcale nie dokuczały',
            },
            {
              id: 72,
              value: 1,
              text: 'Kilka dni',
            },
            {
              id: 73,
              value: 2,
              text: 'Więcej niż połowę dni',
            },
            {
              id: 74,
              value: 3,
              text: 'Niemal codziennie',
            },
          ],
        },
        {
          id: 80,
          text: 'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi spowolnienie albo niemożność usiedzenia w miejscu lub podenerwowanie powodujące ruchliwość znacznie większą niż zwykle?',
          radios: [
            {
              id: 81,
              value: 0,
              text: 'Wcale nie dokuczało',
            },
            {
              id: 82,
              value: 1,
              text: 'Kilka dni',
            },
            {
              id: 83,
              value: 2,
              text: 'Więcej niż połowę dni',
            },
            {
              id: 84,
              value: 3,
              text: 'Niemal codziennie',
            },
          ],
        },
        {
          id: 90,
          text: 'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi myśli, że lepiej byłoby umrzeć albo chęć zrobienia sobie jakiejś krzywdy?',
          radios: [
            {
              id: 91,
              value: 0,
              text: 'Wcale nie dokuczały',
            },
            {
              id: 92,
              value: 1,
              text: 'Kilka dni',
            },
            {
              id: 93,
              value: 2,
              text: 'Więcej niż połowę dni',
            },
            {
              id: 94,
              value: 3,
              text: 'Niemal codziennie',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result >= 20) return 'Ciężki epizod depresyjny.'
      if (result >= 15) return 'Umiarkowanie ciężki epizod depresyjny.'
      if (result >= 10) return 'Umiarkowany epizod depresyjny.'
      if (result >= 5) return 'Łagodny epizod depresyjny.'
      return 'Brak depresji.'
    },
  },

  {
    id: 10,
    name: 'Kalkulator odstępu QTc (wzór Bazetta)',
    urlPath: 'kalkulator-qtc-bazetta',
    category: 'kardiologia',
    description: 'Oblicza skorygowany odstęp QT.',
    methodology: (
      <>
        <Text>Skorygowany odstęp QT (QTc) oblicza się za pomocą poniższego wzoru:</Text>
        <br />
        <MathJax>{'`QTc = (QT) / sqrt(R"R)`'}</MathJax>
        <br />

        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>QT</strong> – odstęp QT w milisekundach (ms),
          </ListItem>
          <ListItem>
            <strong>RR</strong> – odstęp RR w sekundach, który można obliczyć jako 60 podzielone
            przez czynność serca (liczba uderzeń serca na minutę).
          </ListItem>
        </UnorderedList>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Medycyna i Statystyka',
        title: 'Skorygowany odstęp QT (QTc)',
        dateOfAccess: '20.09.2024',
        link: 'https://www.medycynaistatystyka.pl/skorygowany-qt-bazett',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'qtInterval',
          text: 'Odstęp QT (ms)',
          min: 1,
          max: 1000,
        },
        {
          id: 'heartRate',
          text: 'Czynność serca (na minutę)',
          min: 1,
          max: 700,
        },
      ],
      checkboxes: null,
      radioGroups: null,
    },
    resultUnit: 'ms',

    getResult: () => {
      const qtInterval: number = parseFloat(
        (document.getElementById('qtInterval') as HTMLInputElement).value
      )
      const heartRate: number = parseFloat(
        (document.getElementById('heartRate') as HTMLInputElement).value
      )
      const rr: number = 60 / heartRate
      const result: number = qtInterval / Math.sqrt(rr)
      return result
    },

    getResultInterpretation: (result: number) => {
      if (result === 0) return 'Uzupełnij wszystkie informacje.'
      return 'Skorygowany odstęp QTc.'
    },
  },

  {
    id: 11,
    name: 'Wskaźnik Maddreya',
    urlPath: 'wskaznik-maddreya',
    category: 'hepatologia',
    description: 'Określa ryzyko zgonu u chorych z alkoholowym zapaleniem wątroby.',
    methodology: (
      <>
        <Text>
          Wskaźnik Maddreya (DF, ang. <em>Discriminant Function</em>) służy do oceny rokowania u
          pacjentów z alkoholowym zapaleniem wątroby. Oblicza się go na podstawie czasu
          protrombinowego, wartości referencyjnej oraz stężenia bilirubiny całkowitej.
        </Text>

        <br />
        <MathJax>{'`DF = (PT - CT) * 4.6 + B`'}</MathJax>
        <br />

        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>DF</strong> – wskaźnik rokowniczy (czynnik dyskryminujący),
          </ListItem>
          <ListItem>
            <strong>PT</strong> – czas protrombinowy pacjenta (w sekundach),
          </ListItem>
          <ListItem>
            <strong>CT</strong> – czas protrombinowy prawidłowy (w sekundach),
          </ListItem>
          <ListItem>
            <strong>B</strong> – stężenie bilirubiny całkowitej (w mg/dl).
          </ListItem>
        </UnorderedList>

        <br />
        <Text>
          Wartość DF większa niż 32 sugeruje ciężki przebieg choroby i może wskazywać na konieczność
          intensywniejszego leczenia.
        </Text>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Wikipedia',
        title: 'Wskaźnik Maddreya',
        dateOfAccess: '20.09.2024',
        link: 'https://pl.wikipedia.org/wiki/Wska%C5%BAnik_Maddreya',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'prothrombinTime',
          text: 'Czas protrombinowy pacjenta (s)',
          min: 0.1,
          max: 1000,
        },
        {
          id: 'controlTime',
          text: 'Czas protrombinowy prawidłowy (s)',
          min: 0.1,
          max: 1000,
        },
        {
          id: 'bilirubin',
          text: 'Stężenie bilirubiny całkowitej (mg/dl)',
          min: 0.1,
          max: 1000,
        },
      ],
      checkboxes: null,
      radioGroups: null,
    },
    resultUnit: null,

    getResult: () => {
      const prothrombinTime: number = parseFloat(
        (document.getElementById('prothrombinTime') as HTMLInputElement).value
      )
      const controlTime: number = parseFloat(
        (document.getElementById('controlTime') as HTMLInputElement).value
      )
      const bilirubin: number = parseFloat(
        (document.getElementById('bilirubin') as HTMLInputElement).value
      )
      const result: number = (prothrombinTime - controlTime) * 4.6 + bilirubin
      return result
    },

    getResultInterpretation: (result: number) => {
      if (result > 32)
        return 'Ciężki stan pacjenta i ryzyko zgonu w przedziale 35-45% w ciągu 30 dni.'
      if (result <= 32 && result > 0)
        return 'Alkoholowe zapalenie wątroby o umiarkowanym lub niewielkim nasileniu.'
      return 'Uzupełnij wszystkie informacje.'
    },
  },

  {
    id: 12,
    name: 'Obliczanie dawki ibuprofenu',
    urlPath: 'obliczanie-dawki-ibuprofenu',
    category: 'dawkowanie leków',
    description:
      'Oblicza maksymalną dobową dawkę ibuprofenu biorąc pod uwagę wiek i masę ciała pacjenta.',
    methodology: (
      <>
        <Text>
          Maksymalna dobowa dawka ibuprofenu u dorosłych nie powinna przekraczać 3,2 g. U dzieci
          dawkę tę oblicza się na podstawie masy ciała według poniższego wzoru:
        </Text>

        <br />
        <MathJax>{'`D = (30 * M) / 1000`'}</MathJax>
        <br />

        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>D</strong> – maksymalna dobowa dawka ibuprofenu (w gramach),
          </ListItem>
          <ListItem>
            <strong>M</strong> – masa ciała pacjenta (w kilogramach).
          </ListItem>
        </UnorderedList>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Deksibuprofen (Portal lekarzy)',
        dateOfAccess: '20.09.2024',
        link: 'https://indeks.mp.pl/leki/desc.php?id=370',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'age',
          text: 'Wiek (lata)',
          min: 1,
          max: 120,
        },
        {
          id: 'weight',
          text: 'Masa ciała (kg)',
          min: 1,
          max: 200,
        },
      ],
      checkboxes: null,
      radioGroups: null,
    },
    resultUnit: 'g',

    getResult: () => {
      const age: number = parseFloat((document.getElementById('age') as HTMLInputElement).value)
      const weight: number = parseFloat(
        (document.getElementById('weight') as HTMLInputElement).value
      )
      let result: number
      if (age <= 12) {
        result = (30 * weight) / 1000
      } else {
        result = 3.2
      }
      return result
    },

    getResultInterpretation: (result: number) => {
      if (result === 0) return 'Uzupełnij wszystkie informacje.'
      return 'Maksymalna dobowa dawka ibuprofenu.'
    },
  },

  {
    id: 13,
    name: 'Skala PESI',
    urlPath: 'skala-pesi',
    category: 'kardiologia',
    description: 'Prognozuje wynik leczenia pacjentów z zatorowością płucną.',
    methodology: (
      <>
        <Text>
          Skala PESI (ang. <em>Pulmonary Embolism Severity Index</em>) służy do oceny ryzyka zgonu u
          pacjentów z ostrą zatorowością płucną. Wartość wskaźnika oblicza się na podstawie wieku
          pacjenta oraz obecności określonych czynników klinicznych, którym przypisano punktację.
        </Text>

        <br />
        <MathJax>{'`PESI = A + R`'}</MathJax>
        <br />

        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>A</strong> – wiek pacjenta (w latach),
          </ListItem>
          <ListItem>
            <strong>R</strong> – suma punktów przypisanych za obecność poszczególnych czynników
            ryzyka.
          </ListItem>
        </UnorderedList>

        <br />
        <Text>
          Na podstawie końcowego wyniku pacjenta kwalifikuje się do jednej z pięciu klas ryzyka
          (I–V), które pomagają w ocenie rokowania i podejmowaniu decyzji terapeutycznych.
        </Text>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Tabela 2.33-7. Ocena rokowania w zatorowości płucnej',
        dateOfAccess: '26.09.2024',
        link: 'https://www.mp.pl/interna/table/B16.2.33-15.',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'age',
          text: 'Wiek (lata)',
          min: 1,
          max: 125,
        },
      ],
      checkboxes: [
        {
          id: 1,
          value: 10,
          text: 'Płeć męska',
        },
        {
          id: 2,
          value: 30,
          text: 'Nowotwór złośliwy',
        },
        {
          id: 3,
          value: 10,
          text: 'Przewlekła niewydolność serca',
        },
        {
          id: 4,
          value: 10,
          text: 'Przewlekła choroba płuc',
        },
        {
          id: 5,
          value: 20,
          text: 'Tętno powyżej 110/min',
        },
        {
          id: 6,
          value: 30,
          text: 'Skurczowe ciśnienie tętnicze poniżej 100 mm Hg',
        },
        {
          id: 7,
          value: 20,
          text: 'Częstość oddechów powyżej 30/min',
        },
        {
          id: 8,
          value: 20,
          text: 'Temperatura poniżej 36°C',
        },
        {
          id: 9,
          value: 60,
          text: 'Zmiana stanu psychicznego',
        },
        {
          id: 10,
          value: 20,
          text: 'Wysycenie hemoglobiny krwi tętniczej tlenem poniżej 90%',
        },
      ],
      radioGroups: null,
    },
    resultUnit: null,

    getResult: () => {
      const age: number = parseFloat((document.getElementById('age') as HTMLInputElement).value)
      const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input')
      let sum: number = age

      inputs.forEach(input => {
        if (input.checked) sum += parseInt(input.value)
      })

      return sum
    },

    getResultInterpretation: (result: number) => {
      if (result > 125) return 'Klasa V: ryzyko bardzo duże.'
      if (result > 105) return 'Klasa IV: ryzyko duże.'
      if (result > 85) return 'Klasa III: ryzyko umiarkowane.'
      if (result > 65) return 'Klasa II: ryzyko małe.'
      return 'Klasa I: ryzyko bardzo małe.'
    },
  },

  {
    id: 14,
    name: 'Zmodyfikowana skala genewska (oryginalna)',
    urlPath: 'skala-genewska-oryginalna',
    category: 'kardiologia',
    description: 'Ocenia prawdopodobieństwo zatorowości płucnej.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title:
          'Tabela 2.33-9. Ocena prawdopodobieństwa klinicznego ZP wg zmodyfikowanej skali genewskiej',
        dateOfAccess: '30.09.2024',
        link: 'https://www.mp.pl/interna/table/B16.2.33-8.',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: [
        {
          id: 1,
          value: 1,
          text: 'Wiek powyżej 65 lat',
        },
        {
          id: 2,
          value: 3,
          text: 'Przebyta zakrzepica żył głębokich lub zatorowość płucna',
        },
        {
          id: 3,
          value: 2,
          text: 'Zabieg chirurgiczny lub złamanie w ciągu ostatniego miesiąca',
        },
        {
          id: 4,
          value: 2,
          text: 'Niewyleczony nowotwór złośliwy',
        },
        {
          id: 5,
          value: 3,
          text: 'Jednostronny ból kończyny dolnej',
        },
        {
          id: 6,
          value: 2,
          text: 'Krwioplucie',
        },
        {
          id: 7,
          value: 4,
          text: 'Ból podczas ucisku żył głębokich kończyny dolnej i jednostronny obrzęk',
        },
      ],
      radioGroups: [
        {
          id: 10,
          text: 'Tętno',
          radios: [
            {
              id: 11,
              value: 0,
              text: 'Poniżej 75',
            },
            {
              id: 12,
              value: 3,
              text: '75 - 94',
            },
            {
              id: 13,
              value: 5,
              text: '95 lub więcej',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result >= 11) return 'Duże prawdopodobieństwo kliniczne zatorowości płucnej.'
      if (result >= 4) return 'Pośrednie prawdopodobieństwo kliniczne zatorowości płucnej.'
      return 'Małe prawdopodobieństwo kliniczne zatorowości płucnej.'
    },
  },

  {
    id: 15,
    name: 'Skala CURB-65',
    urlPath: 'skala-curb65',
    category: 'pulmonologia',
    description: 'Ocenia ciężkość pozaszpitalnego zapalenia płuc.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title:
          'Rycina 3.13-2. Ocena ciężkości pozaszpitalnego zapalenia płuc u chorych w szpitalu – skala CURB-65',
        dateOfAccess: '30.09.2024',
        link: 'https://www.mp.pl/interna/image/B16.016_8678.',
      },
      {
        id: 2,
        author: 'Wikipedia',
        title: 'Skala CURB-65',
        dateOfAccess: '30.09.2024',
        link: 'https://pl.wikipedia.org/wiki/Skala_CURB-65',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: [
        {
          id: 1,
          value: 1,
          text: 'Zaburzenia świadomości',
        },
        {
          id: 2,
          value: 1,
          text: 'Poziom mocznika większy niż 7 mmol/l',
        },
        {
          id: 3,
          value: 1,
          text: 'Częstość oddechów równa lub większa 30 na minutę',
        },
        {
          id: 4,
          value: 1,
          text: 'Ciśnienie tętnicze krwi równe lub niższe od 90/60 mmHg',
        },
        {
          id: 5,
          value: 1,
          text: 'Wiek większy lub równy 65 lat',
        },
      ],
      radioGroups: null,
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result >= 3)
        return 'PZP ciężkie. Pacjent wymaga leczenia w szpitalu. Rozważ leczenie na oddziale intensywnej terapii.'
      if (result === 2) return 'PZP umiarkowane. Zaleca się przyjęcie pacjenta do szpitala.'
      return 'PZP lekkie. Pacjent może być leczony w domu, jeśli nie ma innych wskazań do hospitalizacji.'
    },
  },

  {
    id: 16,
    name: 'Kalkulator WHR (Waist-Hip Ratio)',
    urlPath: 'kalkulator-whr',
    category: 'antropometria',
    description: 'Oblicza stosunek obwodu talii do bioder.',
    methodology: (
      <>
        <Text>
          Wskaźnik WHR (ang. <em>Waist-Hip Ratio</em>) jest miarą rozmieszczenia tkanki tłuszczowej
          w organizmie i określa proporcję obwodu talii do obwodu bioder. Stosuje się go w ocenie
          ryzyka chorób sercowo-naczyniowych oraz metabolicznych.
        </Text>

        <br />
        <MathJax>{'`WHR = W / H`'}</MathJax>
        <br />

        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>W</strong> – obwód talii (w centymetrach),
          </ListItem>
          <ListItem>
            <strong>H</strong> – obwód bioder (w centymetrach).
          </ListItem>
        </UnorderedList>

        <br />
        <Text>
          Wyższe wartości WHR mogą wskazywać na otyłość brzuszną, która wiąże się ze zwiększonym
          ryzykiem wystąpienia nadciśnienia, cukrzycy typu 2 oraz chorób układu krążenia.
        </Text>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Wikipedia',
        title: 'Waist–hip ratio',
        dateOfAccess: '30.09.2024',
        link: 'https://en.wikipedia.org/wiki/Waist%E2%80%93hip_ratio',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'waist',
          text: 'Obwód talii (cm)',
          min: 1,
          max: 250,
        },
        {
          id: 'hips',
          text: 'Obwód bioder (cm)',
          min: 1,
          max: 250,
        },
      ],
      checkboxes: null,
      radioGroups: [
        {
          id: 'sex',
          text: 'Płeć',
          radios: [
            {
              id: 'female',
              value: 0.85,
              hideBadge: true,
              text: 'Kobieta',
            },
            {
              id: 'male',
              value: 0,
              hideBadge: true,
              text: 'Mężczyzna',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: () => {
      const waist = parseFloat((document.getElementById('waist') as HTMLInputElement).value)
      const hips = parseFloat((document.getElementById('hips') as HTMLInputElement).value)
      const result = waist / hips
      return result
    },

    getResultInterpretation: (result: number) => {
      const maleCheckbox = document.getElementById('male') as HTMLInputElement
      const isMale = maleCheckbox && maleCheckbox.checked ? true : false

      if (isMale) {
        if (result >= 1) return 'Otyłość androidalna (brzuszna).'
        return 'Waga w normie.'
      }
      if (result >= 0.85) return 'Otyłość androidalna (brzuszna).'
      return 'Waga w normie.'
    },
  },

  {
    id: 17,
    name: 'Uproszczona skala SOFA (qSOFA)',
    urlPath: 'skala-qsofa',
    category: 'anestezjologia',
    description: 'Identyfikuje pacjentów o wysokim ryzyku zgonu z powodu sepsy.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'MDCalc (dr Christopher Seymour)',
        title: 'qSOFA (Quick SOFA) Score for Sepsis',
        dateOfAccess: '30.09.2024',
        link: 'https://www.mdcalc.com/calc/2654/qsofa-quick-sofa-score-sepsis',
      },
      {
        id: 2,
        author: 'Medycyna i Statystyka',
        title: 'Uproszczona skala SOFA (qSOFA)',
        dateOfAccess: '30.09.2024',
        link: 'https://www.medycynaistatystyka.pl/skala-qsofa',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: [
        {
          id: 1,
          value: 1,
          text: 'Zaburzenia przytomności (mniej niż 15 punktów w skali Glasgow)',
        },
        {
          id: 2,
          value: 1,
          text: 'Częstotliwość oddechów większa lub równa 22/min',
        },
        {
          id: 3,
          value: 1,
          text: 'Ciśnienie skurczowe krwi mniejsze lub równe 100 mm Hg',
        },
      ],
      radioGroups: null,
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result >= 2) return 'Wysokie ryzyko zgonu.'
      return 'Niewysokie ryzyko zgonu.'
    },
  },

  {
    id: 18,
    name: 'Kwestionariusz Fagerströma',
    urlPath: 'kwestionariusz-fagerstroma',
    category: 'używki',
    description: 'Ocenia stopień uzależnienia od nikotyny.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Tabela 3.22-2. Kwestionariusz oceny uzależnienia od nikotyny wg Fagerströma',
        dateOfAccess: '01.10.2024',
        link: 'https://www.mp.pl/interna/table/B16.3.23-2.',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Kiedy po przebudzeniu pacjent zapala pierwszego papierosa?',
          radios: [
            {
              id: 11,
              value: 3,
              text: 'Do 5 minut',
            },
            {
              id: 12,
              value: 2,
              text: 'Od 6 do 30 minut',
            },
            {
              id: 13,
              value: 1,
              text: 'Od 31 do 60 minut',
            },
            {
              id: 14,
              value: 0,
              text: 'Po 60 minutach',
            },
          ],
        },
        {
          id: 20,
          text: 'Czy pacjent ma trudności z powstrzymaniem się od palenia w miejscach, gdzie jest to zabronione?',
          radios: [
            {
              id: 21,
              value: 1,
              text: 'Tak',
            },
            {
              id: 22,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 30,
          text: 'Z którego papierosa jest pacjentowi najtrudniej zrezygnować?',
          radios: [
            {
              id: 31,
              value: 1,
              text: 'Z pierwszego rano',
            },
            {
              id: 32,
              value: 0,
              text: 'Z każdego innego',
            },
          ],
        },
        {
          id: 40,
          text: 'Ile papierosów pacjent wypala dziennie?',
          radios: [
            {
              id: 41,
              value: 0,
              text: '10 lub mniej',
            },
            {
              id: 42,
              value: 1,
              text: 'Od 11 do 20',
            },
            {
              id: 43,
              value: 2,
              text: 'Od 21 do 30',
            },
            {
              id: 44,
              value: 3,
              text: '31 lub więcej',
            },
          ],
        },
        {
          id: 50,
          text: 'Czy rano pacjent pali więcej papierosów niż w ciągu dnia?',
          radios: [
            {
              id: 51,
              value: 1,
              text: 'Tak',
            },
            {
              id: 52,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 60,
          text: 'Czy pacjent pali papierosy nawet podczas choroby, gdy musi leżeć w łóżku?',
          radios: [
            {
              id: 61,
              value: 1,
              text: 'Tak',
            },
            {
              id: 62,
              value: 0,
              text: 'Nie',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result >= 7) return 'Silne uzależnienie od nikotyny.'
      if (result >= 4) return 'Średnie uzależnienie od nikotyny.'
      return 'Słabe uzależnienie od nikotyny.'
    },
  },

  {
    id: 19,
    name: 'Skala NYHA',
    urlPath: 'skala-nyha',
    category: 'kardiologia',
    description: 'Ocenia stopień niewydolności serca na podstawie objawów.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Tabela 2.19-1. Klasyfikacja niewydolności serca wg New York Heart Association',
        dateOfAccess: '01.10.2024',
        link: 'https://www.mp.pl/interna/table/B16.2.19-1.',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 1,
          text: 'Wydolność wysiłkowa',
          radios: [
            {
              id: 1,
              value: 1,
              text: 'Bez ograniczeń w aktywności fizycznej. Zwykły wysiłek fizyczny nie powoduje nadmiernego zmęczenia, duszności ani kołatania serca',
            },
            {
              id: 2,
              value: 2,
              text: 'Niewielkie ograniczenie aktywności fizycznej. Bez dolegliwości w spoczynku, ale zwykła aktywność powoduje zmęczenie, kołatanie serca lub duszność',
            },
            {
              id: 3,
              value: 3,
              text: 'Znaczne ograniczenie aktywności fizycznej. Bez dolegliwości w spoczynku, ale aktywność mniejsza niż zwykła powoduje wystąpienie objawów',
            },
            {
              id: 4,
              value: 4,
              text: 'Każda aktywność fizyczna wywołuje dolegliwości. Objawy podmiotowe niewydolności serca występują nawet w spoczynku, a jakakolwiek aktywność nasila dolegliwości',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result === 4) return 'NYHA IV'
      if (result === 3) return 'NYHA III'
      if (result === 2) return 'NYHA II'
      return 'NYHA I'
    },
  },

  {
    id: 20,
    name: 'Skala CCS',
    urlPath: 'skala-ccs',
    category: 'kardiologia',
    description: 'Ocenia zaawansowanie choroby niedokrwiennej serca.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title:
          'Tabela 2.5-1. Klasyfikacja dławicy piersiowej na podstawie jej nasilenia wg Canadian Cardiovascular Society (CCS)',
        dateOfAccess: '01.10.2024',
        link: 'https://www.mp.pl/interna/table/B16.2.5-1.',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 1,
          text: 'Aktywność fizyczna',
          radios: [
            {
              id: 1,
              value: 1,
              text: 'Zwyczajna aktywność fizyczna, taka jak chodzenie po płaskim terenie lub wchodzenie po schodach, nie wywołuje dławicy. Dławica występuje przy większym, gwałtowniejszym lub dłużej trwającym wysiłku fizycznym, związanym z pracą lub rekreacją',
            },
            {
              id: 2,
              value: 2,
              text: 'Niewielkie ograniczenie zwyczajnej aktywności fizycznej. Dławica występuje przy szybkim chodzeniu po płaskim terenie lub szybkim wchodzeniu po schodach, przy wchodzeniu pod górę, przy chodzeniu po płaskim terenie lub wchodzeniu po schodach, po posiłkach, gdy jest zimno, wieje wiatr, pod wpływem stresu emocjonalnego lub tylko w ciągu kilku godzin po przebudzeniu lub po przejściu ponad 200 m po terenie płaskim i przy wchodzeniu po schodach na więcej niż jedno piętro w normalnym tempie i w zwykłych warunkach',
            },
            {
              id: 3,
              value: 3,
              text: 'Znaczne ograniczenie zwykłej aktywności fizycznej. Dławica występuje po przejściu od 100 do 200 metrów po terenie płaskim lub przy wchodzeniu po schodach na jedno piętro w normalnym tempie i w zwykłych warunkach',
            },
            {
              id: 4,
              value: 4,
              text: 'Jakakolwiek aktywność fizyczna wywołuje dławicę. Może ona występować w spoczynku',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result === 4) return 'Klasa CCS IV'
      if (result === 3) return 'Klasa CCS III'
      if (result === 2) return 'Klasa CCS II'
      return 'Klasa CCS I'
    },
  },

  {
    id: 21,
    name: 'Wskaźnik eGFR (wzór Cockcrofta i Gaulta)',
    urlPath: 'wskaznik-gfr',
    category: 'nefrologia',
    description: 'Ocenia czynność nerek i szacuje klirens kreatyniny.',
    methodology: (
      <>
        <Text>
          Wzór Cockcrofta–Gaulta służy do szacowania klirensu kreatyniny (eGFR), który pozwala na
          ocenę czynności nerek. Uwzględnia wiek pacjenta, masę ciała oraz stężenie kreatyniny we
          krwi. Wartość ta pomaga dostosować dawki leków wydalanych przez nerki i monitorować
          funkcję nerek.
        </Text>

        <br />
        <MathJax>{'`eGFR = ((140 - A) * M) / (C * 72)`'}</MathJax>
        <br />

        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>eGFR</strong> – szacowany klirens kreatyniny (w ml/min),
          </ListItem>
          <ListItem>
            <strong>A</strong> – wiek pacjenta (w latach),
          </ListItem>
          <ListItem>
            <strong>M</strong> – masa ciała pacjenta (w kilogramach),
          </ListItem>
          <ListItem>
            <strong>C</strong> – stężenie kreatyniny w surowicy krwi (w mg/dl).
          </ListItem>
        </UnorderedList>

        <br />
        <Text>
          W przypadku kobiet otrzymany wynik należy pomnożyć przez współczynnik{' '}
          <strong>0,85</strong>, co pozwala uwzględnić fizjologicznie niższą masę mięśniową w
          porównaniu do mężczyzn.
        </Text>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'National Kidney Foundation',
        title: 'Cockcroft-Gault Formula',
        dateOfAccess: '02.10.2024',
        link: 'https://www.kidney.org/professionals/kdoqi/gfr_calculatorCoc',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'age',
          text: 'Wiek (lata)',
          min: 1,
          max: 120,
        },
        {
          id: 'weight',
          text: 'Masa ciała (kg)',
          min: 1,
          max: 250,
        },
        {
          id: 'creatinine',
          text: 'Stężenie kreatyniny (mg/dl)',
          min: 0.01,
          max: 100,
        },
      ],
      checkboxes: null,
      radioGroups: [
        {
          id: 'sex',
          text: 'Płeć',
          radios: [
            {
              id: 'female',
              value: 0.85,
              hideBadge: true,
              text: 'Kobieta',
            },
            {
              id: 'man',
              value: 1,
              hideBadge: true,
              text: 'Mężczyzna',
            },
          ],
        },
      ],
    },
    resultUnit: 'ml/min',

    getResult: () => {
      const age: number = parseFloat((document.getElementById('age') as HTMLInputElement).value)
      const weight: number = parseFloat(
        (document.getElementById('weight') as HTMLInputElement).value
      )
      const creatinine: number = parseFloat(
        (document.getElementById('creatinine') as HTMLInputElement).value
      )
      const femaleCheckbox = document.getElementById('female') as HTMLInputElement
      const isWoman: boolean = femaleCheckbox && femaleCheckbox.checked ? true : false

      let result: number = ((140 - age) * weight) / (creatinine * 72)
      if (isWoman) result = result * 0.85

      return result
    },

    getResultInterpretation: (result: number) => {
      if (result === 0) return 'Uzupełnij wszystkie informacje.'
      return 'Klirens kreatyniny.'
    },
  },

  {
    id: 22,
    name: 'Wskaźnik FIB-4',
    urlPath: 'wskaznik-fib-4',
    category: 'hepatologia',
    description: 'Ocenia stopień włóknienia wątroby.',
    methodology: (
      <>
        <Text>
          Wskaźnik FIB-4 jest narzędziem służącym do oceny stopnia włóknienia wątroby u pacjentów z
          chorobami wątroby, takimi jak wirusowe zapalenie wątroby typu C lub alkoholowe uszkodzenie
          wątroby. Wartość FIB-4 jest obliczana na podstawie wieku pacjenta, stężenia enzymów
          wątrobowych (ALT i AST) oraz liczby płytek krwi.
        </Text>

        <br />
        <MathJax>{'`FIB\\text{-}4 = (A * B) / (C * sqrt(D))`'}</MathJax>
        <br />

        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>A</strong> – wiek pacjenta (w latach),
          </ListItem>
          <ListItem>
            <strong>B</strong> – aktywność AST (w U/l),
          </ListItem>
          <ListItem>
            <strong>C</strong> – liczba płytek krwi (×10⁹/l),
          </ListItem>
          <ListItem>
            <strong>D</strong> – aktywność ALT (w U/l).
          </ListItem>
        </UnorderedList>

        <br />
        <Text>
          Wartość FIB-4 powyżej <strong>3,25</strong> sugeruje wysokie prawdopodobieństwo
          zaawansowanego włóknienia, natomiast wartość poniżej <strong>1,45</strong> wskazuje na
          niskie ryzyko obecności włóknienia.
        </Text>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Kalkulator FIB-4',
        dateOfAccess: '03.10.2024',
        link: 'https://www.mp.pl/gastrologia/skale/300695,fib-4',
      },
      {
        id: 2,
        author: 'remedium.md',
        title: 'Wskaźnik FIB-4',
        dateOfAccess: '03.10.2024',
        link: 'https://remedium.md/kalkulatory/hepatologia/wska%C5%BAnik-fib-4-ocena-prawdopodobie%C5%84stwa-zw%C5%82%C3%B3knienia-w%C4%85troby',
      },
      {
        id: 3,
        author: 'Hepatitis C Online',
        title: 'Fibrosis-4 (FIB-4) Calculator',
        dateOfAccess: '03.10.2024',
        link: 'https://www.hepatitisc.uw.edu/page/clinical-calculators/fib-4',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'age',
          text: 'Wiek (lata)',
          min: 1,
          max: 120,
        },
        {
          id: 'alt',
          text: 'ALT',
          min: 1,
          max: 2500,
        },
        {
          id: 'ast',
          text: 'AST',
          min: 1,
          max: 2500,
        },
        {
          id: 'platelet',
          text: 'Liczba płytek krwi (x10⁹/l)',
          min: 1,
          max: 1000,
        },
      ],
      checkboxes: null,
      radioGroups: null,
    },
    resultUnit: null,

    getResult: () => {
      const age: number = parseFloat((document.getElementById('age') as HTMLInputElement).value)
      const alt: number = parseFloat((document.getElementById('alt') as HTMLInputElement).value)
      const ast: number = parseFloat((document.getElementById('ast') as HTMLInputElement).value)
      const platelet: number = parseFloat(
        (document.getElementById('platelet') as HTMLInputElement).value
      )

      const result: number = (age * ast) / (platelet * Math.sqrt(alt))
      return result
    },

    getResultInterpretation: (result: number) => {
      if (result === 0) return 'Uzupełnij wszystkie informacje.'
      if (result > 3.25) return 'Duże prawdopodobieństwo zaawansowanego włóknienia.'
      if (result > 1.45)
        return 'Umiarkowane prawdopodobieństwo zaawansowanego włóknienia. Warto przeprowadzić dodatkowe badania.'
      return 'Małe prawdopodobieństwo zaawansowanego włóknienia.'
    },
  },

  {
    id: 23,
    name: 'Skala Childa-Pugha',
    urlPath: 'skala-childa-pugha',
    category: 'hepatologia',
    description:
      'Określa stopień niewydolności wątroby i klasyfikację pacjenta do przeszczepu wątroby.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title:
          'Tabela 7.12-1. Klasyfikacja Childa (zmodyfikowana przez Pugha) niewydolności wątroby',
        dateOfAccess: '03.10.2024',
        link: 'https://www.mp.pl/interna/table/B16.7.12-1.',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Encefalopatia',
          radios: [
            {
              id: 11,
              value: 1,
              text: 'Nie ma',
            },
            {
              id: 12,
              value: 2,
              text: 'Stopień 1–2',
            },
            {
              id: 13,
              value: 3,
              text: 'Stopień 3–4',
            },
          ],
        },
        {
          id: 20,
          text: 'Wodobrzusze',
          radios: [
            {
              id: 21,
              value: 1,
              text: 'Nie ma',
            },
            {
              id: 22,
              value: 2,
              text: 'Umiarkowane',
            },
            {
              id: 23,
              value: 3,
              text: 'Napięte',
            },
          ],
        },
        {
          id: 30,
          text: 'Stężenie bilirubiny',
          radios: [
            {
              id: 31,
              value: 1,
              text: 'Poniżej 2mg/dl (34.2 µmol/l)',
            },
            {
              id: 32,
              value: 2,
              text: '2-3mg/dl (34.2-51.3 µmol/l)',
            },
            {
              id: 33,
              value: 3,
              text: 'Ponad 3mg/dl (51.3 µmol/l)',
            },
          ],
        },
        {
          id: 40,
          text: 'Stężenie albuminy',
          radios: [
            {
              id: 41,
              value: 1,
              text: 'Powyżej 3.5 g/dl (35 g/l)',
            },
            {
              id: 42,
              value: 2,
              text: '2.8-3.5 g/dl (28-35 g/l)',
            },
            {
              id: 43,
              value: 3,
              text: 'Poniżej 2.8 g/dl (28 g/l)',
            },
          ],
        },
        {
          id: 50,
          text: 'Czas protrombinowy / INR',
          radios: [
            {
              id: 51,
              value: 1,
              text: 'Poniżej 5 / 1,70',
            },
            {
              id: 52,
              value: 2,
              text: '5–10 / 1,70–2,20',
            },
            {
              id: 53,
              value: 3,
              text: 'Ponad 10 / 2,20',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result === 0) return 'Uzupełnij wszystkie informacje.'
      if (result >= 10) return 'Klasa C. Są wskazania do przeszczepu wątroby.'
      if (result >= 7) return 'Klasa B. Są wskazania do przeszczepu wątroby.'
      return 'Klasa A. Nie ma wskazań do przeszczepu wątroby.'
    },
  },

  {
    id: 24,
    name: 'Kalkulator SCORE2 / SCORE2-OP',
    urlPath: 'kalkulator-score2',
    category: 'kardiologia',
    description: 'Ocenia ryzyko sercowo-naczyniowe dla populacji Polski.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Kalkulator ryzyka sercowo-naczyniowego SCORE2 i SCORE2-OP dla populacji Polski',
        dateOfAccess: '14.10.2024',
        link: 'https://www.mp.pl/kalkulatory/288285,ocena-ryzyka-sercowo-naczyniowego',
      },
      {
        id: 2,
        author: 'remedium.md',
        title: 'Wskaźnik SCORE2 i SCORE2-OP',
        dateOfAccess: '16.10.2024',
        link: 'https://remedium.md/kalkulatory/kardiologia/wska%C5%BAnik-score2-i-score2-op-ocena-ryzyka-sercowo-naczyniowego',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'age',
          text: 'Wiek (lata)',
          min: 40,
          max: 89,
        },
        {
          id: 'bloodPressure',
          text: 'Ciśnienie tętnicze skurczowe (mm Hg)',
          min: 100,
          max: 179,
        },
        {
          id: 'cholesterol',
          text: 'Cholesterol nie-HDL (mg/dl)',
          min: 116,
          max: 265,
        },
      ],
      checkboxes: null,
      radioGroups: [
        {
          id: 1,
          text: 'Płeć',
          radios: [
            {
              id: 'man',
              value: 'man',
              hideBadge: true,
              text: 'Mężczyzna',
            },
            {
              id: 'woman',
              value: 'woman',
              hideBadge: true,
              text: 'Kobieta',
            },
          ],
        },
        {
          id: 2,
          text: 'Palenie papierosów',
          radios: [
            {
              id: 'smoking',
              value: 'true',
              text: 'Tak',
            },
            {
              id: 2,
              value: 'false',
              text: 'Nie',
            },
          ],
        },
      ],
    },
    resultUnit: '%',

    getResult: () => {
      const age: number = parseInt((document.getElementById('age') as HTMLInputElement).value)
      const ageGroup: number = Math.floor((age - 40) / 5) * 5 + 40
      const bloodPressure: number = parseFloat(
        (document.getElementById('bloodPressure') as HTMLInputElement).value
      )
      const cholesterol: number = parseFloat(
        (document.getElementById('cholesterol') as HTMLInputElement).value
      )
      const manCheckbox = document.getElementById('man') as HTMLInputElement
      const gender: string = manCheckbox.checked ? 'male' : 'female'
      const smokingCheckbox = document.getElementById('smoking') as HTMLInputElement
      const smokingStatus: string = smokingCheckbox.checked ? 'smoking' : 'nonSmoking'

      function getCholesterolGroup(cholesterol: number) {
        if (cholesterol < 150) return 0
        if (cholesterol < 200) return 1
        if (cholesterol < 250) return 2
        return 3
      }

      function getBloodPressureGroup(bloodPressure: number) {
        if (bloodPressure < 120) return 0
        if (bloodPressure < 140) return 1
        if (bloodPressure < 160) return 2
        return 3
      }

      const cholesterolGroup: number = getCholesterolGroup(cholesterol)
      const bloodPressureGroup: number = getBloodPressureGroup(bloodPressure)

      const score2ValuesTable: any = {
        female: {
          nonSmoking: {
            40: [
              [1, 1, 1, 1],
              [1, 1, 1, 2],
              [1, 2, 2, 2],
              [2, 3, 3, 4],
            ],
            45: [
              [1, 1, 2, 3],
              [2, 2, 2, 2],
              [2, 3, 3, 4],
              [3, 4, 4, 5],
            ],
            50: [
              [2, 2, 2, 3],
              [3, 3, 3, 4],
              [3, 4, 4, 5],
              [5, 5, 6, 7],
            ],
            55: [
              [3, 3, 4, 4],
              [4, 4, 5, 5],
              [5, 6, 7, 7],
              [7, 8, 9, 10],
            ],
            60: [
              [5, 5, 6, 6],
              [6, 7, 7, 8],
              [8, 9, 9, 10],
              [11, 11, 12, 13],
            ],
            65: [
              [8, 8, 8, 9],
              [10, 10, 11, 11],
              [12, 13, 14, 14],
              [15, 16, 17, 18],
            ],
            70: [
              [11, 12, 13, 14],
              [14, 15, 16, 17],
              [17, 18, 19, 20],
              [21, 22, 24, 25],
            ],
            75: [
              [18, 19, 20, 22],
              [22, 23, 24, 25],
              [25, 27, 28, 29],
              [29, 31, 32, 34],
            ],
            80: [
              [29, 31, 32, 34],
              [32, 34, 36, 37],
              [36, 38, 39, 41],
              [40, 42, 44, 45],
            ],
            85: [
              [44, 46, 48, 50],
              [47, 49, 51, 52],
              [50, 52, 54, 55],
              [53, 55, 57, 58],
            ],
          },
          smoking: {
            40: [
              [2, 2, 3, 3],
              [3, 4, 4, 5],
              [4, 5, 6, 7],
              [6, 7, 9, 10],
            ],
            45: [
              [3, 3, 4, 5],
              [4, 5, 6, 6],
              [6, 7, 8, 9],
              [8, 10, 11, 13],
            ],
            50: [
              [4, 5, 6, 6],
              [6, 7, 8, 9],
              [8, 9, 10, 12],
              [11, 13, 14, 16],
            ],
            55: [
              [6, 7, 8, 8],
              [8, 9, 10, 11],
              [11, 12, 14, 15],
              [15, 16, 18, 20],
            ],
            60: [
              [9, 10, 11, 11],
              [12, 13, 14, 15],
              [15, 16, 18, 19],
              [20, 21, 23, 25],
            ],
            65: [
              [13, 14, 14, 15],
              [16, 17, 18, 19],
              [21, 22, 23, 24],
              [26, 27, 29, 30],
            ],
            70: [
              [19, 20, 21, 22],
              [23, 24, 26, 27],
              [28, 29, 31, 33],
              [33, 35, 37, 39],
            ],
            75: [
              [26, 28, 29, 31],
              [31, 32, 34, 36],
              [35, 37, 39, 41],
              [41, 43, 45, 47],
            ],
            80: [
              [36, 38, 40, 41],
              [40, 42, 44, 46],
              [44, 46, 48, 50],
              [49, 51, 53, 55],
            ],
            85: [
              [49, 51, 52, 54],
              [52, 53, 55, 57],
              [55, 56, 58, 60],
              [58, 59, 61, 63],
            ],
          },
        },
        male: {
          nonSmoking: {
            40: [
              [1, 2, 2, 3],
              [2, 2, 3, 4],
              [3, 3, 4, 5],
              [4, 5, 6, 7],
            ],
            45: [
              [2, 2, 3, 4],
              [3, 3, 4, 5],
              [4, 5, 6, 7],
              [5, 6, 8, 9],
            ],
            50: [
              [3, 3, 4, 5],
              [4, 5, 5, 6],
              [5, 6, 7, 9],
              [7, 8, 10, 11],
            ],
            55: [
              [4, 5, 6, 7],
              [6, 6, 7, 9],
              [7, 8, 10, 11],
              [9, 11, 12, 14],
            ],
            60: [
              [6, 7, 8, 9],
              [8, 9, 10, 11],
              [10, 11, 13, 14],
              [13, 14, 16, 18],
            ],
            65: [
              [9, 10, 11, 12],
              [11, 12, 13, 15],
              [14, 15, 16, 18],
              [17, 18, 20, 22],
            ],
            70: [
              [12, 14, 15, 16],
              [15, 17, 18, 20],
              [19, 20, 22, 24],
              [23, 25, 27, 29],
            ],
            75: [
              [18, 20, 23, 26],
              [21, 24, 27, 30],
              [24, 27, 31, 34],
              [28, 32, 35, 39],
            ],
            80: [
              [26, 30, 35, 40],
              [29, 33, 38, 44],
              [31, 36, 42, 47],
              [34, 40, 45, 51],
            ],
            85: [
              [36, 43, 51, 58],
              [38, 45, 53, 61],
              [40, 47, 55, 63],
              [42, 49, 57, 65],
            ],
          },
          smoking: {
            40: [
              [3, 4, 5, 6],
              [4, 5, 7, 8],
              [6, 7, 9, 11],
              [8, 10, 13, 16],
            ],
            45: [
              [4, 5, 6, 7],
              [6, 7, 8, 10],
              [8, 9, 11, 14],
              [10, 13, 15, 18],
            ],
            50: [
              [6, 7, 8, 9],
              [7, 9, 10, 12],
              [10, 12, 14, 16],
              [13, 15, 18, 21],
            ],
            55: [
              [8, 9, 10, 12],
              [10, 11, 13, 15],
              [13, 15, 17, 19],
              [16, 19, 21, 24],
            ],
            60: [
              [10, 12, 13, 15],
              [13, 15, 16, 18],
              [16, 18, 20, 23],
              [20, 23, 25, 28],
            ],
            65: [
              [14, 15, 17, 18],
              [17, 19, 20, 22],
              [21, 23, 25, 27],
              [25, 28, 30, 32],
            ],
            70: [
              [18, 20, 22, 23],
              [22, 24, 26, 28],
              [27, 29, 32, 34],
              [33, 35, 38, 41],
            ],
            75: [
              [23, 26, 29, 33],
              [27, 30, 34, 37],
              [31, 34, 38, 43],
              [35, 39, 44, 48],
            ],
            80: [
              [29, 34, 39, 44],
              [32, 37, 42, 48],
              [35, 40, 46, 52],
              [38, 44, 50, 56],
            ],
            85: [
              [36, 43, 50, 58],
              [38, 45, 52, 60],
              [40, 47, 54, 62],
              [41, 49, 56, 65],
            ],
          },
        },
      }

      const risk: number =
        score2ValuesTable[gender][smokingStatus][ageGroup][bloodPressureGroup][cholesterolGroup]

      return risk
    },

    getResultInterpretation: (result: number) => {
      if (result === 0) return 'Uzupełnij wszystkie informacje.'

      const age: number = parseInt((document.getElementById('age') as HTMLInputElement).value)
      if (age >= 70) {
        if (result < 7.5) return 'Małe do umiarkowanego ryzyko w skali SCORE2-OP.'
        if (result < 15) return 'Duże ryzyko w skali SCORE2-OP.'
        return 'Bardzo duże ryzyko w skali SCORE2-OP.'
      }
      if (age >= 50) {
        if (result < 5) return 'Małe do umiarkowanego ryzyko w skali SCORE2.'
        if (result < 10) return 'Duże ryzyko w skali SCORE2.'
        return 'Bardzo duże ryzyko w skali SCORE2.'
      }
      if (result < 2.5) return 'Małe do umiarkowanego ryzyko w skali SCORE2.'
      if (result < 7.5) return 'Duże ryzyko w skali SCORE2.'
      return 'Bardzo duże ryzyko w skali SCORE2.'
    },
  },

  {
    id: 25,
    name: 'Prognozowany wzrost dziecka',
    urlPath: 'prognozowany-wzrost-dziecka',
    category: 'antropometria',
    description: 'Przewiduje wzrost dziecka na podstawie wzrostu rodziców.',
    methodology: (
      <>
        <Text>
          Prognozowany wzrost dziecka można oszacować na podstawie wzrostu rodziców, korzystając z
          uproszczonego wzoru pediatrycznego. Pozwala on orientacyjnie określić, jaki wzrost dziecko
          może osiągnąć w wieku dorosłym.
        </Text>

        <br />
        <MathJax>{'`W = (M + O \\pm 13) / 2`'}</MathJax>
        <br />

        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>W</strong> – prognozowany wzrost dziecka (w cm),
          </ListItem>
          <ListItem>
            <strong>M</strong> – wzrost matki (w cm),
          </ListItem>
          <ListItem>
            <strong>O</strong> – wzrost ojca (w cm),
          </ListItem>
          <ListItem>
            <strong>± 13</strong> – dodaj <strong>13 cm</strong> w przypadku chłopców, odejmij{' '}
            <strong>13 cm</strong> w przypadku dziewczynek.
          </ListItem>
        </UnorderedList>

        <br />
        <Text>
          Należy pamiętać, że wzór ten dostarcza jedynie orientacyjnej wartości i nie uwzględnia
          czynników genetycznych, środowiskowych oraz zdrowotnych, które również wpływają na wzrost
          dziecka.
        </Text>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Jak prognozuje się wzrost chłopców i dziewcząt?',
        dateOfAccess: '17.10.2024',
        link: 'https://www.mp.pl/pacjent/pediatria/lista/122911,jak-prognozuje-sie-wzrost-chlopcow-i-dziewczat',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'mothersHeight',
          text: 'Wzrost matki (w cm)',
          min: 140,
          max: 220,
        },
        {
          id: 'fathersHeight',
          text: 'Wzrost ojca (w cm)',
          min: 140,
          max: 220,
        },
      ],
      checkboxes: null,
      radioGroups: [
        {
          id: 1,
          text: 'Płeć',
          radios: [
            {
              id: 'male',
              value: 'male',
              hideBadge: true,
              text: 'Chłopiec',
            },
            {
              id: 'female',
              value: 'female',
              hideBadge: true,
              text: 'Dziewczynka',
            },
          ],
        },
      ],
    },
    resultUnit: 'cm',

    getResult: () => {
      const mothersHeight: number = parseInt(
        (document.getElementById('mothersHeight') as HTMLInputElement).value
      )
      const fathersHeight: number = parseInt(
        (document.getElementById('fathersHeight') as HTMLInputElement).value
      )
      const maleCheckbox = document.getElementById('male') as HTMLInputElement
      const gender: string = maleCheckbox.checked ? 'male' : 'female'

      let childsHeight: number
      if (gender === 'male') {
        childsHeight = (mothersHeight + fathersHeight + 13) / 2
      } else {
        childsHeight = (mothersHeight + fathersHeight - 13) / 2
      }

      return childsHeight
    },

    getResultInterpretation: (result: number) => {
      if (result === 0) return 'Uzupełnij wszystkie informacje.'
      return 'Przewidywany wzrost dziecka.'
    },
  },

  {
    id: 26,
    name: 'Kwestionariusz MDQ',
    urlPath: 'kwestionariusz-mdq',
    category: 'psychiatria',
    description: 'Pozwala ocenić prawdopodobieństwo choroby dwubiegunowej.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'PsychiatriaPlus.pl (dr hab. n. med. Jarosław Jóźwiak)',
        title: 'Kwestionariusz Zaburzeń Nastroju (MDQ)',
        dateOfAccess: '20.10.2024',
        link: 'https://psychiatraplus.pl/wp-content/uploads/2022/10/Kwestionariusz-Zaburzen-Nastroju-MDQ.pdf',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i był w takiej euforii, że inni uważali, że nie jest sobą lub był w takiej euforii, że wdał się z tego powodu w kłopoty?',
          radios: [
            {
              id: 11,
              value: 1,
              text: 'Tak',
            },
            {
              id: 12,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 20,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i był tak poirytowany, że krzyczał na ludzi lub wdawał się z nimi w kłótnie?',
          radios: [
            {
              id: 21,
              value: 1,
              text: 'Tak',
            },
            {
              id: 22,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 30,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i czuł się znacznie bardziej pewny siebie, niż zwykle?',
          radios: [
            {
              id: 31,
              value: 1,
              text: 'Tak',
            },
            {
              id: 32,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 40,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i sypiał znacznie mniej niż zwykle, ale nie było to problemem?',
          radios: [
            {
              id: 41,
              value: 1,
              text: 'Tak',
            },
            {
              id: 42,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 50,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i był znacznie bardziej rozmowny lub mówił szybciej, niż zwykle?',
          radios: [
            {
              id: 51,
              value: 1,
              text: 'Tak',
            },
            {
              id: 52,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 60,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i miał natłok myśli lub nie mógł zwolnić toku myśli?',
          radios: [
            {
              id: 61,
              value: 1,
              text: 'Tak',
            },
            {
              id: 62,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 70,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i tak łatwo rozpraszał się rzeczami wokół, że miał problem z koncentracją i kontynuowaniem zadania?',
          radios: [
            {
              id: 71,
              value: 1,
              text: 'Tak',
            },
            {
              id: 72,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 80,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i miał znacznie więcej energii niż zazwyczaj?',
          radios: [
            {
              id: 81,
              value: 1,
              text: 'Tak',
            },
            {
              id: 82,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 90,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i był znacznie bardziej aktywny lub robił znacznie więcej, niż zazwyczaj?',
          radios: [
            {
              id: 91,
              value: 1,
              text: 'Tak',
            },
            {
              id: 92,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 100,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i znacznie bardziej niż zwykle udzielał się towarzysko, np. dzwonił do znajomych w środku nocy?',
          radios: [
            {
              id: 101,
              value: 1,
              text: 'Tak',
            },
            {
              id: 102,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 110,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i był znacznie bardziej zainteresowany seksem niż zazwyczaj?',
          radios: [
            {
              id: 111,
              value: 1,
              text: 'Tak',
            },
            {
              id: 112,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 120,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i robił rzeczy nietypowe dla siebie lub takie, które inni uznawali za przesadne, głupie lub ryzykowne?',
          radios: [
            {
              id: 121,
              value: 1,
              text: 'Tak',
            },
            {
              id: 122,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 130,
          text: 'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i wydawanie pieniędzy przysporzyło jemu lub jego rodzinie kłopotów?',
          radios: [
            {
              id: 131,
              value: 1,
              text: 'Tak',
            },
            {
              id: 132,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 14,
          text: 'Jeśli pacjent odpowiedział "tak" na 7 lub więcej pytań powyżej, czy kilka z powyższych objawów kiedykolwiek wystąpiło w tym samym czasie?',
          radios: [
            {
              id: 'happenedAtTheSameTime',
              value: 'happenedAtTheSameTime',
              text: 'Tak',
            },
            {
              id: 'notApplicable',
              value: 'notApplicable',
              text: 'Nie',
            },
          ],
        },
        {
          id: 'problem',
          text: 'Na ile problematyczne były dla pacjenta powyższe objawy, np. w pracy, rodzinie, zarabianiu pieniędzy, kłopotach z prawem lub wdawaniu się w kłótnie i bójki?',
          radios: [
            {
              id: 'no',
              value: 'no',
              text: 'Bez problemu',
            },
            {
              id: 'small',
              value: 'small',
              text: 'Mały problem',
            },
            {
              id: 'medium',
              value: 'medium',
              text: 'Średni problem',
            },
            {
              id: 'big',
              value: 'big',
              text: 'Duży problem',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      const happenedCheckbox = document.getElementById('happenedAtTheSameTime') as HTMLInputElement
      const happenedAtTheSameTime: boolean =
        happenedCheckbox && happenedCheckbox.checked ? true : false

      const problem = document.querySelector('input[name="problem"]:checked') as HTMLInputElement
      const isProblem: boolean =
        problem && (problem.value === 'medium' || problem.value === 'big') ? true : false

      if (result >= 7 && happenedAtTheSameTime && isProblem) {
        return 'Diagnostyka w kierunku choroby dwubiegunowej jest konieczna.'
      }
      return 'Diagnostyka w kierunku choroby dwubiegunowej nie jest konieczna.'
    },
  },

  {
    id: 27,
    name: 'Test AUDIT',
    urlPath: 'test-audit',
    category: 'używki',
    description: 'Ocenia stopień uzależnienia od alkoholu.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Centrum Dobrej Terapii (mgr Maria Kaleńczuk, mgr Teresa Janus)',
        title: 'Czy jesteś uzależniony od alkoholu – test AUDIT',
        dateOfAccess: '22.10.2024',
        link: 'https://www.centrumdobrejterapii.pl/materialy/czy-jestes-uzalezniony-od-alkoholu-test-audit/',
      },
      {
        id: 2,
        author: 'Państwowa Agencja Rozwiązywania Problemów Alkoholowych',
        title: 'Autodiagnoza - Jak ocenić swoje picie?',
        dateOfAccess: '22.10.2024',
        link: 'https://www.parpa.pl/images/autodiagnoza_20_10_2020_1.pdf',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 'sex',
          text: 'Płeć',
          radios: [
            {
              id: 'male',
              value: 'male',
              text: 'Mężczyzna',
            },
            {
              id: 'female',
              value: 'female',
              text: 'Kobieta',
            },
          ],
        },
        {
          id: 10,
          text: 'Jak często pacjent pije napoje alkoholowe?',
          radios: [
            {
              id: 11,
              value: 0,
              text: 'Nigdy',
            },
            {
              id: 12,
              value: 1,
              text: 'Raz w miesiącu',
            },
            {
              id: 13,
              value: 2,
              text: 'Od 2 do 4 razy w miesiącu',
            },
            {
              id: 14,
              value: 3,
              text: 'Od 2 do 3 razy w tygodniu',
            },
            {
              id: 15,
              value: 4,
              text: '4 razy w tygodniu lub częściej',
            },
          ],
        },
        {
          id: 20,
          text: 'Ile standardowych porcji alkoholu pacjent wypija w typowym dniu, gdy spożywa alkohol? Jedna standardowa porcja to 10 g czystego alkoholu, np. 250 ml piwa o mocy 5%, 100 ml wina o mocy 12% lub 30 ml wódki o mocy 40%',
          radios: [
            {
              id: 11,
              value: 0,
              text: '1 lub 2 porcje',
            },
            {
              id: 12,
              value: 1,
              text: '3 lub 4 porcje',
            },
            {
              id: 13,
              value: 2,
              text: '5 lub 6 porcji',
            },
            {
              id: 14,
              value: 3,
              text: 'Od 7 do 9 porcji',
            },
            {
              id: 15,
              value: 4,
              text: '10 porcji lub więcej',
            },
          ],
        },
        {
          id: 30,
          text: 'Jak często pacjent wypija co najmniej 6 porcji alkoholu podczas jednego dnia?',
          radios: [
            {
              id: 31,
              value: 0,
              text: 'Nigdy',
            },
            {
              id: 32,
              value: 1,
              text: 'Rzadziej niż raz w miesiącu',
            },
            {
              id: 33,
              value: 2,
              text: 'Około raz w miesiącu',
            },
            {
              id: 34,
              value: 3,
              text: 'Około raz w tygodniu',
            },
            {
              id: 35,
              value: 4,
              text: 'Codziennie lub prawie codziennie',
            },
          ],
        },
        {
          id: 40,
          text: 'Jak często w ostatnim roku pacjent nie mógł przerwać picia po jego rozpoczęciu?',
          radios: [
            {
              id: 41,
              value: 0,
              text: 'Nigdy',
            },
            {
              id: 42,
              value: 1,
              text: 'Rzadziej niż raz w miesiącu',
            },
            {
              id: 43,
              value: 2,
              text: 'Około raz w miesiącu',
            },
            {
              id: 44,
              value: 3,
              text: 'Około raz w tygodniu',
            },
            {
              id: 45,
              value: 4,
              text: 'Codziennie lub prawie codziennie',
            },
          ],
        },
        {
          id: 50,
          text: 'Jak często w ciągu ostatniego roku z powodu picia pacjent zrobił coś niewłaściwego, niezgodnego z przyjętymi w jego środowisku normami postępowania?',
          radios: [
            {
              id: 51,
              value: 0,
              text: 'Nigdy',
            },
            {
              id: 52,
              value: 1,
              text: 'Rzadziej niż raz w miesiącu',
            },
            {
              id: 53,
              value: 2,
              text: 'Około raz w miesiącu',
            },
            {
              id: 54,
              value: 3,
              text: 'Około raz w tygodniu',
            },
            {
              id: 55,
              value: 4,
              text: 'Codziennie lub prawie codziennie',
            },
          ],
        },
        {
          id: 60,
          text: 'Jak często w ostatnim roku pacjent musiał napić się alkoholu rano, aby móc dojść do siebie po intensywnym piciu poprzedniego dnia?',
          radios: [
            {
              id: 61,
              value: 0,
              text: 'Nigdy',
            },
            {
              id: 62,
              value: 1,
              text: 'Rzadziej niż raz w miesiącu',
            },
            {
              id: 63,
              value: 2,
              text: 'Około raz w miesiącu',
            },
            {
              id: 64,
              value: 3,
              text: 'Około raz w tygodniu',
            },
            {
              id: 65,
              value: 4,
              text: 'Codziennie lub prawie codziennie',
            },
          ],
        },
        {
          id: 70,
          text: 'Jak często w ostatnim roku pacjent miał poczucie winy lub wyrzuty sumienia po spożyciu alkoholu?',
          radios: [
            {
              id: 71,
              value: 0,
              text: 'Nigdy',
            },
            {
              id: 72,
              value: 1,
              text: 'Rzadziej niż raz w miesiącu',
            },
            {
              id: 73,
              value: 2,
              text: 'Około raz w miesiącu',
            },
            {
              id: 74,
              value: 3,
              text: 'Około raz w tygodniu',
            },
            {
              id: 75,
              value: 4,
              text: 'Codziennie lub prawie codziennie',
            },
          ],
        },
        {
          id: 80,
          text: 'Jak często w ostatnim roku z powodu picia pacjent nie mógł sobie przypomnieć, co zdarzyło się poprzedniego dnia?',
          radios: [
            {
              id: 81,
              value: 0,
              text: 'Nigdy',
            },
            {
              id: 82,
              value: 1,
              text: 'Rzadziej niż raz w miesiącu',
            },
            {
              id: 83,
              value: 2,
              text: 'Około raz w miesiącu',
            },
            {
              id: 84,
              value: 3,
              text: 'Około raz w tygodniu',
            },
            {
              id: 85,
              value: 4,
              text: 'Codziennie lub prawie codziennie',
            },
          ],
        },
        {
          id: 90,
          text: 'Czy pacjent lub ktoś inny kiedykolwiek doznał urazu fizycznego z powodu jego picia?',
          radios: [
            {
              id: 91,
              value: 0,
              text: 'Nie',
            },
            {
              id: 92,
              value: 2,
              text: 'Tak, ale nie w ostatnim roku',
            },
            {
              id: 93,
              value: 4,
              text: 'Tak, w ostatnim roku',
            },
          ],
        },
        {
          id: 100,
          text: 'Czy ktoś z rodziny, lekarz lub inny pracownik ochrony zdrowia interesował się piciem pacjenta lub sugerował jego ograniczenie?',
          radios: [
            {
              id: 101,
              value: 0,
              text: 'Nie',
            },
            {
              id: 102,
              value: 2,
              text: 'Tak, ale nie w ostatnim roku',
            },
            {
              id: 103,
              value: 4,
              text: 'Tak, w ostatnim roku',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      const sex: string = (document.querySelector('input[name="sex"]:checked') as HTMLInputElement)
        ?.value

      const lowRisk: string = 'Picie o niskim poziomie ryzyka.'
      const mediumRisk: string = 'Ryzykowne spożywanie alkoholu.'
      const highRisk: string = 'Szkodliwe picie alkoholu.'
      const criticalRisk: string = 'Podejrzenie uzależnienia od alkoholu.'

      if (result > 19) return criticalRisk
      if (result > 15) return highRisk
      if (sex === 'male' && result > 7) return mediumRisk
      if (sex === 'female' && result > 6) return mediumRisk
      return lowRisk
    },
  },

  {
    id: 28,
    name: 'Pediatryczna skala Glasgow',
    urlPath: 'pediatryczna-skala-glasgow',
    category: 'pediatria',
    description: 'Ocenia poziom przytomności u dzieci do 2 roku życia.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna i Statystyka',
        title: 'Pediatryczna skala Glasgow (Pediatric Glasgow Coma Scale)',
        dateOfAccess: '23.10.2024',
        link: 'https://medycynaistatystyka.pl/pediatryczna-skala-glasgow',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Otwieranie oczu',
          radios: [
            {
              id: 11,
              value: 4,
              text: 'Spontaniczne',
            },
            {
              id: 12,
              value: 3,
              text: 'W odpowiedzi na bodziec głosowy',
            },
            {
              id: 13,
              value: 2,
              text: 'W odpowiedzi na bodziec bólowy',
            },
            {
              id: 14,
              value: 1,
              text: 'Nie otwiera oczu',
            },
          ],
        },
        {
          id: 20,
          text: 'Odpowiedź słowna',
          radios: [
            {
              id: 21,
              value: 5,
              text: 'Uśmiech lub adekwatny płacz',
            },
            {
              id: 22,
              value: 4,
              text: 'Gwałtowny, nieustępujący płacz',
            },
            {
              id: 23,
              value: 3,
              text: 'Nieadekwatny płacz lub krzyk',
            },
            {
              id: 24,
              value: 2,
              text: 'Jęki lub pochrząkiwanie',
            },
            {
              id: 25,
              value: 1,
              text: 'Brak reakcji',
            },
          ],
        },
        {
          id: 30,
          text: 'Reakcja ruchowa',
          radios: [
            {
              id: 31,
              value: 6,
              text: 'Ruchy spontaniczne',
            },
            {
              id: 32,
              value: 5,
              text: 'Zlokalizowanie, próba usunięcia bodźca bólowego',
            },
            {
              id: 33,
              value: 4,
              text: 'Wycofanie przed bodźcem bólowym',
            },
            {
              id: 34,
              value: 3,
              text: 'Patologiczna reakcja zgięciowa w reakcji na bodziec bólowy',
            },
            {
              id: 35,
              value: 2,
              text: 'Patologiczna reakcja wyprostna w reakcji na bodziec bólowy',
            },
            {
              id: 36,
              value: 1,
              text: 'Brak reakcji',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result === 0) return 'Uzupełnij wszystkie informacje.'
      if (result >= 13) return 'Łagodne zaburzenia przytomności.'
      if (result >= 9) return 'Umiarkowane zaburzenia przytomności.'
      return 'Ciężkie zaburzenia przytomności.'
    },
  },

  {
    id: 29,
    name: 'Skala Apgar',
    urlPath: 'skala-apgar',
    category: 'pediatria',
    description: 'Ocenia noworodka w pierwszej i w piątej minucie życia.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Szpital Położniczo-Ginekologiczny Ujastek',
        title: 'Skala Apgar – za co przyznawane są noworodkowi punkty?',
        dateOfAccess: '23.10.2024',
        link: 'https://szpital.ujastek.pl/blogosfera/skala-apgar-za-co-przyznawane-sa-noworodkowi-punkty',
      },
      {
        id: 2,
        author: 'Serwis Zdrowie (Państwowa Agencja Prasowa)',
        title: 'Skala Apgar, czyli za co noworodek dostaje punkty',
        dateOfAccess: '23.10.2024',
        link: 'https://zdrowie.pap.pl/rodzice/skala-apgar-czyli-za-co-noworodek-dostaje-punkty',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Akcja serca',
          radios: [
            {
              id: 11,
              value: 0,
              text: 'Brak czynności',
            },
            {
              id: 12,
              value: 1,
              text: 'Poniżej 100 uderzeń na minutę',
            },
            {
              id: 13,
              value: 2,
              text: 'Co najmniej 100 uderzeń na minutę',
            },
          ],
        },
        {
          id: 20,
          text: 'Oddychanie',
          radios: [
            {
              id: 21,
              value: 0,
              text: 'Brak oddechu',
            },
            {
              id: 22,
              value: 1,
              text: 'Zwolnione lub nieregularne',
            },
            {
              id: 23,
              value: 2,
              text: 'Aktywne ruchy',
            },
          ],
        },
        {
          id: 30,
          text: 'Napięcie mięśni',
          radios: [
            {
              id: 31,
              value: 0,
              text: 'Wiotkie',
            },
            {
              id: 32,
              value: 1,
              text: 'Obecne',
            },
            {
              id: 33,
              value: 2,
              text: 'Aktywne ruchy',
            },
          ],
        },
        {
          id: 40,
          text: 'Odruchy (reakcja na wprowadzenie cewnika do nosa)',
          radios: [
            {
              id: 41,
              value: 0,
              text: 'Brak reakcji',
            },
            {
              id: 42,
              value: 1,
              text: 'Słaba reakcja (grymas)',
            },
            {
              id: 43,
              value: 2,
              text: 'Adekwatna reakcja (kichanie)',
            },
          ],
        },
        {
          id: 50,
          text: 'Zabarwienie skóry',
          radios: [
            {
              id: 51,
              value: 0,
              text: 'Blada',
            },
            {
              id: 52,
              value: 1,
              text: 'Sinica obwodowa',
            },
            {
              id: 53,
              value: 2,
              text: 'Różowa',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result >= 8) return 'Stan dobry.'
      if (result >= 4) return 'Stan średni.'
      return 'Stan zły (ciężki).'
    },
  },

  {
    id: 30,
    name: 'Skala Barthel',
    urlPath: 'skala-barthel',
    category: 'geriatria',
    description:
      'Ocenia poziom samodzielności i zdolność zaspokajania podstawowych potrzeb życiowych pacjentów.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Swissmed',
        title: 'Ocena pacjenta wg skali Barthel',
        dateOfAccess: '27.10.2024',
        link: 'https://swissmed.com.pl/pliki/seniorzy/ocena_pacjenta_barthel.pdf',
      },
      {
        id: 2,
        author: 'gov.pl',
        title: 'Karta oceny stanu pacjenta wg zmodyfikowanej skali Barthel',
        dateOfAccess: '27.10.2024',
        link: 'https://www.gov.pl/attachment/203e5ac4-0bac-42ec-9b86-3da58772bda4',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Spożywanie posiłków',
          radios: [
            {
              id: 11,
              value: 0,
              text: 'Nie jest w stanie samodzielnie jeść lub przełykać',
            },
            {
              id: 12,
              value: 5,
              text: 'Potrzebuje pomocy w krojeniu, smarowaniu, karmieniu doustnym',
            },
            {
              id: 13,
              value: 10,
              text: 'Samodzielny, niezależny',
            },
          ],
        },
        {
          id: 20,
          text: 'Przemieszczanie się z łóżka na krzesło i z powrotem/siadanie',
          radios: [
            {
              id: 21,
              value: 0,
              text: 'Nie jest w stanie się przemieszczać, nie zachowuje równowagi przy siadaniu oraz siedzeniu',
            },
            {
              id: 22,
              value: 5,
              text: 'Przemieszcza się z pomocą fizyczną jednej lub dwóch osób, może siedzieć',
            },
            {
              id: 23,
              value: 10,
              text: 'Mniejsza pomoc (słowna lub fizyczna)',
            },
            {
              id: 24,
              value: 15,
              text: 'Samodzielny',
            },
          ],
        },
        {
          id: 30,
          text: 'Utrzymanie higieny osobistej',
          radios: [
            {
              id: 31,
              value: 0,
              text: 'Nie jest w stanie wykonać żadnych czynności higienicznych',
            },
            {
              id: 32,
              value: 5,
              text: 'Potrzebuje pomocy przy wykonywaniu czynności higienicznych',
            },
            {
              id: 33,
              value: 10,
              text: 'Samodzielny przy myciu twarzy, czesaniu się, myciu zębów, także z zapewnionymi pomocami',
            },
          ],
        },
        {
          id: 40,
          text: 'Korzystanie z toalety',
          radios: [
            {
              id: 41,
              value: 0,
              text: 'Nie korzysta w ogóle z toalety',
            },
            {
              id: 42,
              value: 5,
              text: 'Potrzebuje lub częściowo potrzebuje pomocy przy korzystaniu z toalety',
            },
            {
              id: 43,
              value: 10,
              text: 'Samodzielny w dotarciu do toalety oraz w zdejmowaniu i zakładaniu części garderoby',
            },
          ],
        },
        {
          id: 50,
          text: 'Mycie i kąpiel całego ciała',
          radios: [
            {
              id: 51,
              value: 0,
              text: 'Kąpany w wannie przy pomocy podnośnika',
            },
            {
              id: 52,
              value: 5,
              text: 'Wymaga pomocy',
            },
            {
              id: 53,
              value: 10,
              text: 'Samodzielny',
            },
          ],
        },
        {
          id: 60,
          text: 'Poruszanie się po powierzchniach płaskich',
          radios: [
            {
              id: 61,
              value: 0,
              text: 'W ogóle nie porusza się',
            },
            {
              id: 62,
              value: 5,
              text: 'Porusza się na odległość do 50 m za pomocą sprzętu wspomagającego i z pomocą co najmniej jednej osoby',
            },
            {
              id: 63,
              value: 10,
              text: 'Samodzielny, niezależny w poruszaniu się na odległość powyżej 50m, także w użyciem sprzętu wspomagającego',
            },
          ],
        },
        {
          id: 70,
          text: 'Chodzenie po schodach',
          radios: [
            {
              id: 71,
              value: 0,
              text: 'Nie jest w stanie wchodzić i schodzić po schodach nawet z pomocą innej osoby',
            },
            {
              id: 72,
              value: 5,
              text: 'Potrzebuje pomocy fizycznej, asekuracji, przenoszenia',
            },
            {
              id: 73,
              value: 10,
              text: 'Samodzielny',
            },
          ],
        },
        {
          id: 90,
          text: 'Ubieranie i rozbieranie się',
          radios: [
            {
              id: 91,
              value: 0,
              text: 'Potrzebuje kompleksowej pomocy innej osoby',
            },
            {
              id: 92,
              value: 5,
              text: 'Potrzebuje częściowej pomocy innej osoby',
            },
            {
              id: 93,
              value: 10,
              text: 'Samodzielny, niezależny (także w zapinaniu guzików, zamka, zawiązywaniu sznurowadeł)',
            },
          ],
        },
        {
          id: 100,
          text: 'Kontrola zwieracza odbytu',
          radios: [
            {
              id: 101,
              value: 0,
              text: 'Nie panuje nad oddawaniem stolca',
            },
            {
              id: 102,
              value: 5,
              text: 'Sporadycznie bezwiednie oddaje stolec',
            },
            {
              id: 103,
              value: 10,
              text: 'Kontroluje oddawanie stolca',
            },
          ],
        },
        {
          id: 110,
          text: 'Kontrola zwieraczy pęcherza moczowego',
          radios: [
            {
              id: 111,
              value: 0,
              text: 'Nie panuje nad oddawaniem moczu',
            },
            {
              id: 112,
              value: 5,
              text: 'Sporadycznie bezwiednie oddaje mocz',
            },
            {
              id: 113,
              value: 10,
              text: 'Kontroluje oddawanie moczu',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result > 85) return 'Lekki stan pacjenta, osoba samodzielna.'
      if (result > 20) return 'Średnio ciężki stan pacjenta, osoba częściowo samodzielna.'
      return 'Ciężki stan pacjenta, osoba niesamodzielna, potrzebująca stałej opieki.'
    },
  },

  {
    id: 31,
    name: 'Obliczanie zawartości alkoholu we krwi (wzór Erika Widmarka)',
    urlPath: 'obliczanie-alkoholu-widmarka',
    category: 'używki',
    description: 'Wylicza przybliżoną zawartość alkoholu we krwi.',
    methodology: (
      <>
        <Text>
          Wzór Erika Widmarka służy do szacunkowego obliczenia stężenia alkoholu we krwi (BAC –
          <em>Blood Alcohol Concentration</em>) na podstawie ilości spożytego alkoholu, masy ciała
          oraz płci.
        </Text>

        <br />
        <MathJax>{'`BAC = A / (r \\cdot W)`'}</MathJax>
        <br />

        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>BAC</strong> – szacowane stężenie alkoholu we krwi (w ‰),
          </ListItem>
          <ListItem>
            <strong>A</strong> – ilość spożytego czystego alkoholu (w gramach),
          </ListItem>
          <ListItem>
            <strong>r</strong> – współczynnik dystrybucji alkoholu:
            <UnorderedList>
              <ListItem>0,7 dla mężczyzn,</ListItem>
              <ListItem>0,6 dla kobiet,</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <strong>W</strong> – masa ciała (w kilogramach),
          </ListItem>
        </UnorderedList>

        <br />
        <Text>
          Wzór ten daje jedynie przybliżony wynik i nie uwzględnia indywidualnych różnic w
          metabolizmie, stanie zdrowia czy sposobie spożywania alkoholu.
        </Text>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Kalibrujemy.pl',
        title: 'Przeliczanie zawartości alkoholu we krwi na promile - wzór',
        dateOfAccess: '28.10.2024',
        link: 'https://www.kalibrujemy.pl/blog/48-przeliczanie-zawartosci-alkoholu-we-krwi-na-promile-wzor-przyklady',
      },
      {
        id: 2,
        author: 'Polityka',
        title: 'Ile mam promili?',
        dateOfAccess: '28.10.2024',
        link: 'https://www.polityka.pl/tygodnikpolityka/kraj/1560509,1,ile-mam-promili.read',
      },
    ],
    fields: {
      numberInputs: [
        {
          id: 'consumedAlcohol',
          text: 'Ilość wypitego czystego alkoholu w gramach (1 ml czystego alkoholu to 0,8 g)',
          min: 1,
          max: 1000,
        },
        {
          id: 'bodyWeight',
          text: 'Masa ciała (w kg)',
          min: 1,
          max: 250,
        },
      ],
      checkboxes: null,
      radioGroups: [
        {
          id: 'sex',
          text: 'Płeć',
          radios: [
            {
              id: 'female',
              value: 0.6,
              hideBadge: true,
              text: 'Kobieta',
            },
            {
              id: 'male',
              value: 0.7,
              hideBadge: true,
              text: 'Mężczyzna',
            },
          ],
        },
      ],
    },
    resultUnit: '‰',

    getResult: () => {
      const consumedAlcohol: number = parseFloat(
        (document.getElementById('consumedAlcohol') as HTMLInputElement).value
      )
      const bodyWeight: number = parseFloat(
        (document.getElementById('bodyWeight') as HTMLInputElement).value
      )
      const sexIndex: number = parseFloat(
        (document.querySelector('input[name="sex"]:checked') as HTMLInputElement)?.value
      )

      const result = consumedAlcohol / (sexIndex * bodyWeight)
      return result
    },

    getResultInterpretation: () => {
      return 'Przybliżona zawartość alkoholu we krwi.'
    },
  },

  {
    id: 32,
    name: 'Skala Oakland',
    urlPath: 'skala-oakland',
    category: 'gastrologia',
    description: 'Ocenia ciężkość krwawienia z dolnego odcinka przewodu pokarmowego.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Rozpoznanie i leczenie ostrego krwawienia do dolnego odcinka przewodu pokarmowego',
        dateOfAccess: '29.10.2024',
        link: 'https://www.mp.pl/chirurgia/wytyczne-przegladowe/242727,rozpoznanie-i-leczenie-ostrego-krwawienia-do-dolnego-odcinka-przewodu-pokarmowego',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Wiek',
          radios: [
            {
              id: 11,
              value: 0,
              text: 'Mniej niż 40 lat',
            },
            {
              id: 12,
              value: 1,
              text: 'Od 40 do 59 lat',
            },
            {
              id: 13,
              value: 2,
              text: '70 lat lub więcej',
            },
          ],
        },
        {
          id: 20,
          text: 'Płeć',
          radios: [
            {
              id: 21,
              value: 0,
              text: 'Kobieta',
            },
            {
              id: 22,
              value: 1,
              text: 'Mężczyzna',
            },
          ],
        },
        {
          id: 30,
          text: 'Wcześniejsze hospitalizacje z powodu krwawienia do DOPP',
          radios: [
            {
              id: 31,
              value: 0,
              text: 'Nie',
            },
            {
              id: 32,
              value: 1,
              text: 'Tak',
            },
          ],
        },
        {
          id: 40,
          text: 'Wynik badania per rectum',
          radios: [
            {
              id: 41,
              value: 0,
              text: 'Bez krwi',
            },
            {
              id: 42,
              value: 1,
              text: 'Obecna krew',
            },
          ],
        },
        {
          id: 50,
          text: 'Częstotliwość rytmu serca',
          radios: [
            {
              id: 51,
              value: 0,
              text: 'Mniej niż 70 na minutę',
            },
            {
              id: 52,
              value: 1,
              text: 'Między 70 a 89 na minutę',
            },
            {
              id: 53,
              value: 2,
              text: 'Między 90 a 109 na minutę',
            },
            {
              id: 54,
              value: 3,
              text: '110 na minutę lub więcej',
            },
          ],
        },
        {
          id: 60,
          text: 'Ciśnienie tętnicze skurczowe',
          radios: [
            {
              id: 61,
              value: 5,
              text: 'Mniej niż 90 mm Hg',
            },
            {
              id: 62,
              value: 4,
              text: 'Od 90 do 119 mm Hg',
            },
            {
              id: 63,
              value: 3,
              text: 'Od 120 do 129 mm Hg',
            },
            {
              id: 64,
              value: 2,
              text: 'Od 130 do 159 mm Hg',
            },
            {
              id: 65,
              value: 0,
              text: '160 mm Hg lub więcej',
            },
          ],
        },
        {
          id: 70,
          text: 'Stężenie hemoglobiny',
          radios: [
            {
              id: 71,
              value: 22,
              text: 'Mniej niż 7 g/dl',
            },
            {
              id: 72,
              value: 17,
              text: 'Od 7 do 8,9 g/dl',
            },
            {
              id: 73,
              value: 13,
              text: 'Od 9 do 10,9 g/dl',
            },
            {
              id: 74,
              value: 8,
              text: 'Od 11 do 12,9 g/dl',
            },
            {
              id: 75,
              value: 4,
              text: 'Od 13 do 15,9 g/dl',
            },
            {
              id: 76,
              value: 0,
              text: '16 g/dl lub więcej',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result > 8) return 'Poważne krwawienie. Wskazana jest hospitalizacja.'
      return 'Umiarkowane krwawienie. Z dużym prawdopodobieństwem można wypisać pacjenta z SOR.'
    },
  },

  {
    id: 33,
    name: 'Kwestionariusz STOP-BANG',
    urlPath: 'stop-bang',
    category: 'pulmonologia',
    description: 'Ocenia ryzyko obturacyjnego bezdechu sennego.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'OBS – ocena obturacyjnego bezdechu sennego u dorosłych',
        dateOfAccess: '15.11.2024',
        link: 'https://www.mp.pl/kalkulatory/313248,obs-ocena-obturacyjnego-bezdechu-sennego-u-doroslych',
      },
      {
        id: 2,
        author: 'MDCalc (dr Frances Chung)',
        title: 'STOP-BANG Score for Obstructive Sleep Apnea',
        dateOfAccess: '15.11.2024',
        link: 'https://www.mdcalc.com/calc/3992/stop-bang-score-obstructive-sleep-apnea',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Czy pacjent chrapie na tyle głośno, że słychać to przez zamknięte drzwi lub partner/ka szturcha go przez to w nocy?',
          radios: [
            {
              id: 's',
              value: 1,
              text: 'Tak',
            },
            {
              id: 12,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 20,
          text: 'Czy pacjent często czuje się zmęczony, wyczerpany lub śpiący w ciągu dnia?',
          radios: [
            {
              id: 't',
              value: 1,
              text: 'Tak',
            },
            {
              id: 22,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 30,
          text: 'Czy ktoś zaobserwował u pacjenta przerwy w oddychaniu, krztuszenie się lub dławienie w czasie snu?',
          radios: [
            {
              id: 'o',
              value: 1,
              text: 'Tak',
            },
            {
              id: 32,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 40,
          text: 'Czy pacjent choruje na nadciśnienie tętnicze?',
          radios: [
            {
              id: 'p',
              value: 1,
              text: 'Tak',
            },
            {
              id: 42,
              value: 0,
              text: 'Nie',
            },
          ],
        },
        {
          id: 50,
          text: 'BMI pacjenta',
          radios: [
            {
              id: 51,
              value: 0,
              text: 'Mniejsze lub równe 35',
            },
            {
              id: 'b',
              value: 1,
              text: 'Powyżej 35',
            },
          ],
        },
        {
          id: 60,
          text: 'Wiek pacjenta',
          radios: [
            {
              id: 61,
              value: 0,
              text: 'Mniejszy lub równy 50 lat',
            },
            {
              id: 62,
              value: 1,
              text: 'Powyżej 50 lat',
            },
          ],
        },
        {
          id: 70,
          text: 'Obwód szyi pacjenta',
          radios: [
            {
              id: 71,
              value: 0,
              text: 'Mniejszy lub równy 40 cm',
            },
            {
              id: 'n',
              value: 1,
              text: 'Powyżej 40 cm',
            },
          ],
        },
        {
          id: 80,
          text: 'Płeć pacjenta',
          radios: [
            {
              id: 81,
              value: 0,
              text: 'Kobieta',
            },
            {
              id: 'g',
              value: 1,
              text: 'Mężczyzna',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      function checkIfHighRisk() {
        const stop = ['s', 't', 'o', 'p']
        const stopElements = stop.map(letter => document.querySelector(`input#${letter}`))
        const bng = ['b', 'n', 'g']
        const bngElements = bng.map(letter => document.querySelector(`input#${letter}`))

        let stopSum: number = 0
        let bngSum: number = 0

        stopElements.forEach(input => {
          if ((input as HTMLInputElement)?.checked) stopSum += 1
        })

        bngElements.forEach(input => {
          if ((input as HTMLInputElement)?.checked) bngSum += 1
        })

        return stopSum >= 2 && bngSum >= 1 ? true : false
      }

      const isHighRisk = checkIfHighRisk()

      if (result >= 5 || isHighRisk === true)
        return 'Wysokie ryzyko obturacyjnego bezdechu sennego.'
      if (result >= 3) return 'Umiarkowane ryzyko obturacyjnego bezdechu sennego.'
      return 'Niskie ryzyko obturacyjnego bezdechu sennego.'
    },
  },

  {
    id: 34,
    name: 'Skala NIHSS',
    urlPath: 'skala-nihss',
    category: 'neurologia',
    description: 'Określa ciężkość udaru mózgu.',
    methodology: null,
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Ocena kliniczna i leczenie w warunkach stanu naglącego (Portal lekarzy)',
        dateOfAccess: '15.01.2025',
        link: 'https://www.mp.pl/neurologia/udar-mozgu/195346,2-ocena-kliniczna-i-leczenie-w-warunkach-stanu-naglacego',
      },
      {
        id: 2,
        author:
          'Shenzhen Traditional Chinese Medicine Hospital (Yuanyuan Zhuo, Yimin Qu, Jiaman Wu, Xingxian Huang, Weiqu Yuan, Jack Lee, Zhuoxin Yang, Benny Zee)',
        title:
          'Estimation of stroke severity with National Institutes of Health Stroke Scale grading and retinal features: A cross-sectional study',
        dateOfAccess: '15.01.2025',
        link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8341321/pdf/medi-100-e26846.pdf',
      },
    ],
    fields: {
      numberInputs: null,
      checkboxes: null,
      radioGroups: [
        {
          id: 10,
          text: 'Stan przytomności',
          radios: [
            {
              id: 11,
              value: 0,
              text: 'Przytomny',
            },
            {
              id: 12,
              value: 1,
              text: 'Przebudza się przy niewielkiej stymulacji',
            },
            {
              id: 13,
              value: 2,
              text: 'Wymaga powtarzającej się stymulacji w celu pobudzenia',
            },
            {
              id: 14,
              value: 3,
              text: 'Brak reakcji na bodźce',
            },
          ],
        },
        {
          id: 20,
          text: 'Odpowiedzi na pytania dotyczące miesiąca i wieku',
          radios: [
            {
              id: 21,
              value: 0,
              text: 'Obie odpowiedzi prawidłowe',
            },
            {
              id: 22,
              value: 1,
              text: 'Jedna odpowiedź prawidłowa',
            },
            {
              id: 23,
              value: 2,
              text: 'Obie odpowiedzi nieprawidłowe',
            },
          ],
        },
        {
          id: 30,
          text: 'Reakcja na polecenia mrugania oczami i ściskania dłoni',
          radios: [
            {
              id: 31,
              value: 0,
              text: 'Spełnia prawidłowo oba polecenia',
            },
            {
              id: 32,
              value: 1,
              text: 'Spełnia prawidłowo jedno polecenie',
            },
            {
              id: 33,
              value: 2,
              text: 'Nie spełnia żadnego polecenia',
            },
          ],
        },
        {
          id: 40,
          text: 'Ruchy gałek ocznych w poziomie',
          radios: [
            {
              id: 41,
              value: 0,
              text: 'Prawidłowe',
            },
            {
              id: 42,
              value: 1,
              text: 'Częściowe porażenie',
            },
            {
              id: 43,
              value: 2,
              text: 'Całkowite porażenie',
            },
          ],
        },
        {
          id: 50,
          text: 'Pole widzenia',
          radios: [
            {
              id: 51,
              value: 0,
              text: 'Prawidłowe pole widzenia',
            },
            {
              id: 52,
              value: 1,
              text: 'Częściowe niedowidzenie połowicze',
            },
            {
              id: 53,
              value: 2,
              text: 'Całkowite niedowidzenie połowicze',
            },
            {
              id: 54,
              value: 3,
              text: 'Obustronne niedowidzenie połowicze',
            },
          ],
        },
        {
          id: 60,
          text: 'Niedowład mięśni twarzy',
          radios: [
            {
              id: 61,
              value: 0,
              text: 'Bez niedowładu',
            },
            {
              id: 62,
              value: 1,
              text: 'Niewielki niedowład',
            },
            {
              id: 63,
              value: 2,
              text: 'Umiarkowany niedowład',
            },
            {
              id: 64,
              value: 3,
              text: 'Jednostronne porażenie',
            },
          ],
        },
        {
          id: 70,
          text: 'Niedowład kończyny górnej lewej',
          radios: [
            {
              id: 71,
              value: 0,
              text: 'Utrzymuje uniesioną kończynę',
            },
            {
              id: 72,
              value: 1,
              text: 'Kończyna opada częściowo przed upływem 10 sekund',
            },
            {
              id: 73,
              value: 2,
              text: 'Kończyna opada całkowicie przed upływem 10 sekund',
            },
            {
              id: 74,
              value: 3,
              text: 'Brak ruchu przeciw sile ciężkości',
            },
            {
              id: 75,
              value: 4,
              text: 'Brak ruchu',
            },
          ],
        },
        {
          id: 80,
          text: 'Niedowład kończyny górnej prawej',
          radios: [
            {
              id: 81,
              value: 0,
              text: 'Utrzymuje uniesioną kończynę',
            },
            {
              id: 82,
              value: 1,
              text: 'Kończyna opada częściowo przed upływem 10 sekund',
            },
            {
              id: 83,
              value: 2,
              text: 'Kończyna opada całkowicie przed upływem 10 sekund',
            },
            {
              id: 84,
              value: 3,
              text: 'Brak ruchu przeciw sile ciężkości',
            },
            {
              id: 85,
              value: 4,
              text: 'Brak ruchu',
            },
          ],
        },
        {
          id: 90,
          text: 'Niedowład kończyny dolnej lewej',
          radios: [
            {
              id: 91,
              value: 0,
              text: 'Utrzymuje uniesioną kończynę',
            },
            {
              id: 92,
              value: 1,
              text: 'Kończyna opada częściowo przed upływem 5 sekund',
            },
            {
              id: 93,
              value: 2,
              text: 'Kończyna opada całkowicie przed upływem 5 sekund',
            },
            {
              id: 94,
              value: 3,
              text: 'Brak ruchu przeciw sile ciężkości',
            },
            {
              id: 95,
              value: 4,
              text: 'Brak ruchu',
            },
          ],
        },
        {
          id: 100,
          text: 'Niedowład kończyny dolnej prawej',
          radios: [
            {
              id: 101,
              value: 0,
              text: 'Utrzymuje uniesioną kończynę',
            },
            {
              id: 102,
              value: 1,
              text: 'Kończyna opada częściowo przed upływem 5 sekund',
            },
            {
              id: 103,
              value: 2,
              text: 'Kończyna opada całkowicie przed upływem 5 sekund',
            },
            {
              id: 104,
              value: 3,
              text: 'Brak ruchu przeciw sile ciężkości',
            },
            {
              id: 105,
              value: 4,
              text: 'Brak ruchu',
            },
          ],
        },
        {
          id: 110,
          text: 'Ataksja kończyn',
          radios: [
            {
              id: 111,
              value: 0,
              text: 'Bez ataksji',
            },
            {
              id: 112,
              value: 1,
              text: 'W jednej kończynie',
            },
            {
              id: 113,
              value: 2,
              text: 'W dwóch kończynach',
            },
          ],
        },
        {
          id: 120,
          text: 'Czucie',
          radios: [
            {
              id: 121,
              value: 0,
              text: 'Prawidłowe',
            },
            {
              id: 122,
              value: 1,
              text: 'Niewielka niedoczulica',
            },
            {
              id: 123,
              value: 2,
              text: 'Ciężka niedoczulica',
            },
          ],
        },
        {
          id: 130,
          text: 'Mowa',
          radios: [
            {
              id: 131,
              value: 0,
              text: 'Prawidłowa, bez afazji',
            },
            {
              id: 132,
              value: 1,
              text: 'Niewielka afazja',
            },
            {
              id: 133,
              value: 2,
              text: 'Ciężka afazja',
            },
            {
              id: 134,
              value: 3,
              text: 'Brak mowy, całkowita afazja',
            },
          ],
        },
        {
          id: 140,
          text: 'Dyzartria',
          radios: [
            {
              id: 141,
              value: 0,
              text: 'Bez dyzartii',
            },
            {
              id: 142,
              value: 1,
              text: 'Niewielka dyzartia',
            },
            {
              id: 143,
              value: 2,
              text: 'Ciężka dyzartia',
            },
          ],
        },
        {
          id: 150,
          text: 'Nieuwaga',
          radios: [
            {
              id: 151,
              value: 0,
              text: 'Nieobecna',
            },
            {
              id: 152,
              value: 1,
              text: 'Niewielka (w zakresie jednego zmysłu)',
            },
            {
              id: 153,
              value: 2,
              text: 'Ciężka (w zakresie dwóch zmysłów)',
            },
          ],
        },
      ],
    },
    resultUnit: null,

    getResult: sumInputValues,

    getResultInterpretation: (result: number) => {
      if (result > 20) return 'Ciężki udar.'
      if (result > 15) return 'Udar umiarkowany do ciężkiego.'
      if (result > 4) return 'Umiarkowany udar.'
      if (result > 0) return 'Niewielki udar.'
      return 'Brak objawów udaru.'
    },
  },

  // {
  // 	id: ,
  // 	name: '',
  // 	urlPath: '',
  // 	category: '',
  // 	description: '',
  // 	methodology: null,
  // 	sources: [
  // {
  //   id: 1,
  //   author: '',
  //   title: '',
  //   dateOfAccess: '',
  //   link: '',
  // },
  // 	],
  // 	fields: {
  // 		numberInputs: null,
  // 		checkboxes: null,
  // 		radioGroups: null,
  // 	},
  // 	resultUnit: null,

  // 	getResult: () => {},

  // 	getResultInterpretation: (result: number) => {},
  // },
]
