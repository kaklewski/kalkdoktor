import { ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { MathJax } from 'better-react-mathjax';

import { CalculatorType } from '../types/calculatorTypes';
import sumValues from '../utils/sumValues';

export const calculators: CalculatorType[] = [
  {
    id: 1,
    name: 'Kalkulator BMI',
    urlPath: '/kalkulator-bmi',
    category: 'antropometria',
    description:
      'Pomaga określić, czy masa ciała danej osoby jest w normie, zbyt niska lub zbyt wysoka w stosunku do wzrostu.',
    methodology: (
      <>
        <Text>
          Wskaźnik masy ciała (BMI, ang. <em>Body Mass Index</em>) oblicza się
          jako iloraz masy ciała i kwadratu wzrostu.
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
    form: [
      {
        type: 'numberInput',
        name: 'bodyMass',
        label: 'Masa ciała (kg)',
        min: 1,
        max: 200,
      },
      {
        type: 'numberInput',
        name: 'height',
        label: 'Wzrost (cm)',
        min: 1,
        max: 230,
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const bodyMass: number = parseFloat(formValues['bodyMass']);
      const height: number = parseFloat(formValues['height']) / 100;

      if (!bodyMass || !height) return [0, 'Uzupełnij wszystkie dane.'];

      const result: number = Math.round(bodyMass / (height * height));
      let interpretation: string = '';

      if (result > 0 && result < 18.5) interpretation = 'Niedowaga';
      if (result >= 18.5 && result < 25) interpretation = 'Wartość prawidłowa';
      if (result >= 25 && result < 30) interpretation = 'Nadwaga';
      if (result >= 30 && result < 35) interpretation = 'Otyłość I stopnia';
      if (result >= 35 && result < 40) interpretation = 'Otyłość II stopnia';
      if (result >= 40) interpretation = 'Otyłość III stopnia';

      return [result, interpretation];
    },
  },

  {
    id: 2,
    name: 'Skala CHA₂DS₂-VASc',
    urlPath: '/skala-cha2ds2-vasc',
    category: 'kardiologia',
    description:
      'Ocenia ryzyko wystąpienia powikłań zakrzepowo-zatorowych u pacjentów z migotaniem przedsionków.',
    sources: [
      {
        id: 1,
        author: 'MDCalc (dr Gregory Lip)',
        title: 'CHA₂DS₂-VASc Score for Atrial Fibrillation Stroke Risk',
        dateOfAccess: '20.09.2024',
        link: 'https://www.mdcalc.com/calc/801/cha2ds2-vasc-score-atrial-fibrillation-stroke-risk',
      },
    ],
    form: [
      {
        type: 'radioInput',
        name: 'gender',
        label: 'Płeć',
        options: [
          {
            value: 0,
            label: 'Mężczyzna',
          },
          {
            value: 1,
            label: 'Kobieta',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'age',
        label: 'Wiek',
        options: [
          {
            value: 0,
            label: 'Mniej niż 65 lat',
          },
          {
            value: 1,
            label: '65 - 74 lata',
          },
          {
            value: 2,
            label: '75 lat lub więcej',
          },
        ],
      },
      {
        type: 'checkbox',
        name: 'heartFailure',
        value: 1,
        label: 'Zastoinowa niewydolność serca / dysfunkcja lewej komory',
      },
      {
        type: 'checkbox',
        name: 'hypertension',
        value: 1,
        label: 'Nadciśnienie tętnicze',
      },
      {
        type: 'checkbox',
        name: 'diabetes',
        value: 1,
        label: 'Cukrzyca',
      },
      {
        type: 'checkbox',
        name: 'vascularDisease',
        value: 1,
        label:
          'Choroba naczyniowa (przebyty zawał serca, miażdżycowa choroba tętnic obwodowych, blaszki miażdżycowe w aorcie)',
      },
      {
        type: 'checkbox',
        name: 'stroke',
        value: 2,
        label: 'Przebyty udar mózgu / TIA / incydent zakrzepowo-zatorowy',
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const lowRisk: string =
        'Niskie ryzyko powikłań. Nie zaleca się leczenia.';
      const mediumRisk: string =
        'Umiarkowane ryzyko powikłań. Należy rozważyć doustny antykoagulant.';
      const highRisk: string =
        'Wysokie ryzyko powikłań. Należy zastosować doustny antykoagulant.';
      const isMale: boolean = formValues['gender'] === '0';

      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (isMale) {
        if (result <= 0) interpretation = lowRisk;
        if (result == 1) interpretation = mediumRisk;
        if (result >= 2) interpretation = highRisk;
      } else {
        if (result <= 1) interpretation = lowRisk;
        if (result == 2) interpretation = mediumRisk;
        if (result >= 3) interpretation = highRisk;
      }

      return [result, interpretation];
    },
  },

  {
    id: 3,
    name: 'Skala Centora w modyfikacji McIsaaca',
    urlPath: '/skala-centora-mcisaaca',
    category: 'choroby zakaźne',
    description:
      'Szacuje ryzyko zapalenia paciorkowcowego (PBHA) i dobrać odpowiednie postępowanie.',
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Tabela 3.3-1. Skala Centora w modyfikacji McIsaaca',
        dateOfAccess: '20.09.2024',
        link: 'https://www.mp.pl/interna/table/B16.3.3-1.',
      },
    ],
    form: [
      {
        type: 'radioInput',
        name: 'age',
        label: 'Wiek',
        options: [
          {
            value: 1,
            label: '3 - 14 lat',
          },
          {
            value: 0,
            label: '15 - 44 lata',
          },
          {
            value: -1,
            label: '45 lat lub więcej',
          },
        ],
      },
      {
        type: 'checkbox',
        name: 'fever',
        value: 1,
        label: 'Temperatura ciała powyżej 38°C',
      },
      {
        type: 'checkbox',
        name: 'cough',
        value: 1,
        label: 'Nie występuje kaszel',
      },
      {
        type: 'checkbox',
        name: 'swollenLymphNodes',
        value: 1,
        label: 'Powiększone węzły chłonne szyjne przednie',
      },
      {
        type: 'checkbox',
        name: 'exudate',
        value: 1,
        label: 'Wysięk na migdałkach i ich obrzęk',
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 4) {
        interpretation =
          'Przy nasilonych objawach należy stosować antybiotyk. Przy łagodnych objawach zalecane jest wykonanie szybkiego testu na obecność antygenu PBHA lub posiewu wymazu z gardła. Decyzja o leczeniu zależna od wyniku.';
      } else if (result >= 2 && result <= 3) {
        interpretation =
          'Zalecane jest wykonanie szybkiego testu na obecność antygenu PBHA lub posiewu wymazu z gardła. Decyzja o leczeniu zależna od wyniku.';
      } else {
        interpretation =
          'Zalecane leczenie objawowe. Diagnostyka bakteriologiczna nie jest potrzebna.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 4,
    name: 'Ocena ryzyka ZŻG w skali Wellsa',
    urlPath: '/ocena-zakrzepicy-wellsa',
    category: 'kardiologia',
    description:
      'Oblicza ryzyko wystąpienia zakrzepicy żył głębokich na podstawie kryteriów klinicznych.',
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title: 'Ocena prawdopodobieństwa klinicznego ZŻG w skali Wellsa',
        dateOfAccess: '20.09.2024',
        link: 'https://www.mp.pl/interna/table/B16.2.33-1.',
      },
    ],
    form: [
      {
        type: 'checkbox',
        name: 'malignantTumor',
        value: 1,
        label:
          'Nowotwór złośliwy (w trakcie leczenia lub rozpoznany w ciągu ostatnich 6 miesięcy)',
      },
      {
        type: 'checkbox',
        name: 'immobilization',
        value: 1,
        label:
          'Porażenie, niedowład lub niedawne unieruchomienie kończyny dolnej w opatrunku gipsowym',
      },
      {
        type: 'checkbox',
        name: 'recentImmobilization',
        value: 1,
        label:
          'Niedawne unieruchomienie w łóżku przez ponad 3 dni lub duża operacja w ciągu ostatnich 4 tygodni',
      },
      {
        type: 'checkbox',
        name: 'localPain',
        value: 1,
        label: 'Bolesność miejscowa w przebiegu żył głębokich kończyny dolnej',
      },
      {
        type: 'checkbox',
        name: 'swellingWholeLeg',
        value: 1,
        label: 'Obrzęk całej kończyny dolnej',
      },
      {
        type: 'checkbox',
        name: 'swellingCalf',
        value: 1,
        label:
          'Obrzęk łydki ponad 3 cm w porównaniu do drugiej nogi (mierzony 10 cm poniżej guzowatości kości piszczelowej)',
      },
      {
        type: 'checkbox',
        name: 'pittingEdema',
        value: 1,
        label: 'Obrzęk ciastowaty, większy na objawowej kończynie',
      },
      {
        type: 'checkbox',
        name: 'visibleVeins',
        value: 1,
        label: 'Widoczne żyły powierzchowne krążenia obocznego (nieżylakowe)',
      },
      {
        type: 'checkbox',
        name: 'alternativeDiagnosis',
        value: -2,
        label: 'Inne rozpoznanie niż ZŻG równie lub bardziej prawdopodobne',
      },
      {
        type: 'checkbox',
        name: 'previousDVT',
        value: 1,
        label: 'Wcześniej przebyta ZŻG',
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 3) {
        interpretation = 'Wysokie prawdopodobieństwo zakrzepicy żył głębokich.';
      } else if (result === 1 || result === 2) {
        interpretation = 'Średnie prawdopodobieństwo zakrzepicy żył głębokich.';
      } else {
        interpretation = 'Małe prawdopodobieństwo zakrzepicy żył głębokich.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 5,
    name: 'Kalkulator liczby opakowań leków na dany okres',
    urlPath: '/kalkulator-liczby-opakowan-na-okres',
    category: 'dawkowanie leków',
    description:
      'Oblicza liczbę opakowań leku, którą należy przepisać na podstawie dawkowania.',
    methodology: (
      <>
        <Text>
          Liczbę opakowań leku niezbędnych do przeprowadzenia terapii oblicza
          się według wzoru:
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
          Uzyskany wynik należy zaokrąglić w górę do najbliższej liczby
          całkowitej, aby zapewnić wystarczającą liczbę tabletek na cały okres
          terapii.
        </Text>
      </>
    ),
    form: [
      {
        type: 'numberInput',
        name: 'amountPerIntake',
        label: 'Liczba tabletek w jednej dawce',
        min: 1,
        max: 100,
      },
      {
        type: 'numberInput',
        name: 'numberOfIntakes',
        label: 'Liczba dawek dziennie',
        min: 1,
        max: 100,
      },
      {
        type: 'numberInput',
        name: 'daysOfUse',
        label: 'Okres (liczba dni) brania leku',
        min: 1,
        max: 365,
      },
      {
        type: 'numberInput',
        name: 'packageSize',
        label: 'Liczba tabletek w opakowaniu',
        min: 1,
        max: 200,
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const amountPerIntake: number = parseFloat(formValues['amountPerIntake']);
      const numberOfIntakes: number = parseFloat(formValues['numberOfIntakes']);
      const daysOfUse: number = parseFloat(formValues['daysOfUse']);
      const packageSize: number = parseFloat(formValues['packageSize']);

      if (!amountPerIntake || !numberOfIntakes || !daysOfUse || !packageSize) {
        return [0, 'Uzupełnij wszystkie dane.'];
      }

      const result: number = Math.round(
        (amountPerIntake * numberOfIntakes * daysOfUse) / packageSize,
      );

      return [result, 'Liczba opakowań, które należy przepisać.'];
    },
  },

  {
    id: 6,
    name: 'Obliczanie dawki paracetamolu',
    urlPath: '/obliczanie-dawki-paracetamolu',
    category: 'dawkowanie leków',
    description:
      'Oblicza maksymalną dobową dawkę paracetamolu biorąc pod uwagę wiek i masę ciała pacjenta.',
    methodology: (
      <>
        <Text>
          Maksymalna dobowa dawka paracetamolu jest obliczana na podstawie masy
          ciała pacjenta i ograniczeń wiekowych.
        </Text>
        <br />
        <MathJax>{'`d = (60 * m) / 1000`'}</MathJax>
        <br />
        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>d</strong> – maksymalna dobowa dawka paracetamolu wyrażona w
            gramach (g),
          </ListItem>
          <ListItem>
            <strong>m</strong> – masa ciała pacjenta wyrażona w kilogramach
            (kg).
          </ListItem>
        </UnorderedList>
        <br />
        <Text>
          W przypadku dzieci do 12. roku życia maksymalna dawka nie powinna
          przekraczać 2 g, a u dorosłych 4 g.
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
    form: [
      {
        type: 'numberInput',
        name: 'age',
        label: 'Wiek (lata)',
        min: 1,
        max: 120,
      },
      {
        type: 'numberInput',
        name: 'weight',
        label: 'Masa ciała (kg)',
        min: 1,
        max: 200,
      },
    ],
    calculateResult(formValues: Record<string, string>): [string, string] {
      const age: number = parseFloat(formValues['age']);
      const weight: number = parseFloat(formValues['weight']);

      if (!age || !weight) return [`${0} g`, 'Uzupełnij wszystkie dane.'];

      let result: number = (60 * weight) / 1000;
      let interpretation: string = 'Uzupełnij wszystkie dane.';

      if (age <= 12 && result > 2) result = 2;
      if (result > 4) result = 4;

      if (result > 0) interpretation = 'Maksymalna dobowa dawka paracetamolu.';

      return [`${result} g`, interpretation];
    },
  },

  {
    id: 7,
    name: 'Skala HAS-BLED',
    urlPath: '/skala-has-bled',
    category: 'kardiologia',
    description:
      'Szacuje ryzyko poważnego krwawienia u pacjentów z migotaniem przedsionków.',
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
    form: [
      {
        type: 'checkbox',
        name: 'hypertension',
        value: 1,
        label: 'Nadciśnienie tętnicze z SBP powyżej 160 mmHg',
      },
      {
        type: 'checkbox',
        name: 'renalFunction',
        value: 1,
        label:
          'Nieprawidłowa funkcja nerek: przewlekła dializoterapia, stan po przeszczepieniu nerki lub stężenie kreatyniny w surowicy powyżej 200 µmol/l (2.26 mg/dL)',
      },
      {
        type: 'checkbox',
        name: 'liverFunction',
        value: 1,
        label:
          'Nieprawidłowa funkcja wątroby: przewlekła choroba wątroby lub biochemiczne cechy istotnego uszkodzenia wątroby',
      },
      {
        type: 'checkbox',
        name: 'stroke',
        value: 1,
        label: 'Przebyty udar mózgu',
      },
      {
        type: 'checkbox',
        name: 'bleedingHistory',
        value: 1,
        label:
          'Predyspozycja do krwawienia i/lub poważne krwawienie w wywiadzie',
      },
      {
        type: 'checkbox',
        name: 'inrUnstable',
        value: 1,
        label:
          'Niestabilne wartości INR - wahające się duże wartości lub często poza przedziałem terapeutycznym',
      },
      {
        type: 'checkbox',
        name: 'age',
        value: 1,
        label: 'Wiek powyżej 65 lat',
      },
      {
        type: 'checkbox',
        name: 'anticoagulants',
        value: 1,
        label: 'Przyjmowanie leków z grupy NLPZ',
      },
      {
        type: 'checkbox',
        name: 'alcohol',
        value: 1,
        label: 'Nadmierne spożycie alkoholu',
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 4) {
        interpretation = 'Duże ryzyko krwawienia.';
      } else {
        interpretation = 'Nieduże ryzyko krwawienia.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 8,
    name: 'Skala Glasgow',
    urlPath: '/skala-glasgow',
    category: 'neurologia',
    description: 'Ocenia poziom przytomności u dorosłych.',
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
    form: [
      {
        type: 'radioInput',
        name: 'eyeOpening',
        label: 'Otwieranie oczu',
        options: [
          {
            value: 4,
            label: 'Spontaniczne',
          },
          {
            value: 3,
            label: 'Na polecenie',
          },
          {
            value: 2,
            label: 'W odpowiedzi na bodziec bólowy',
          },
          {
            value: 1,
            label: 'Nie otwiera oczu',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'speechResponse',
        label: 'Odpowiedź słowna',
        options: [
          {
            value: 5,
            label: 'Prawidłowa, pacjent jest w pełni zorientowany',
          },
          {
            value: 4,
            label: 'Odpowiada, ale jest zdezorientowany',
          },
          {
            value: 3,
            label: 'Używa niewłaściwych słów',
          },
          {
            value: 2,
            label: 'Wydaje nieartykułowane dźwięki',
          },
          {
            value: 1,
            label: 'Brak reakcji',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'motorResponse',
        label: 'Reakcja ruchowa',
        options: [
          {
            value: 6,
            label: 'Na polecenie',
          },
          {
            value: 5,
            label: 'Potrafi umiejscowić bodziec bólowy',
          },
          {
            value: 4,
            label:
              'Prawidłowa reakcja zgięciowa (wycofanie w odpowiedzi na bodziec bólowy)',
          },
          {
            value: 3,
            label: 'Nieprawidłowa reakcja zgięciowa (odkorowanie)',
          },
          {
            value: 2,
            label: 'Reakcja wyprostna (sztywność odmóżdżeniowa)',
          },
          {
            value: 1,
            label: 'Brak reakcji',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 13) interpretation = 'Łagodne zaburzenia świadomości.';
      else if (result >= 9 && result <= 12)
        interpretation = 'Umiarkowane zaburzenia świadomości.';
      else if (result >= 6 && result <= 8)
        interpretation = 'Brak przytomności.';
      else if (result === 5) interpretation = 'Odkorowanie.';
      else if (result === 4) interpretation = 'Odmóżdżenie.';
      else if (result === 3) interpretation = 'Śmierć mózgu.';
      else interpretation = 'Uzupełnij wszystkie dane.';

      return [result, interpretation];
    },
  },

  {
    id: 9,
    name: 'Kwestionariusz PHQ-9',
    urlPath: '/kwestionariusz-phq9',
    category: 'psychiatria',
    description: 'Pozwala ocenić stopień nasilenia epizodu depresyjnego.',
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
    form: [
      {
        type: 'radioInput',
        name: 'interest',
        label:
          'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi niewielkie zainteresowanie lub odczuwanie przyjemności z wykonywania czynności?',
        options: [
          {
            value: 0,
            label: 'Wcale nie dokuczało',
          },
          {
            value: 1,
            label: 'Kilka dni',
          },
          {
            value: 2,
            label: 'Więcej niż połowę dni',
          },
          {
            value: 3,
            label: 'Niemal codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'depression',
        label:
          'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi uczucie smutku, przygnębienia lub beznadziejności?',
        options: [
          {
            value: 0,
            label: 'Wcale nie dokuczało',
          },
          {
            value: 1,
            label: 'Kilka dni',
          },
          {
            value: 2,
            label: 'Więcej niż połowę dni',
          },
          {
            value: 3,
            label: 'Niemal codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'sleepProblems',
        label:
          'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi kłopoty z zaśnięciem, przerywany sen albo zbyt długi sen?',
        options: [
          {
            value: 0,
            label: 'Wcale nie dokuczały',
          },
          {
            value: 1,
            label: 'Kilka dni',
          },
          {
            value: 2,
            label: 'Więcej niż połowę dni',
          },
          {
            value: 3,
            label: 'Niemal codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'energy',
        label:
          'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi uczucie zmęczenia lub brak energii?',
        options: [
          {
            value: 0,
            label: 'Wcale nie dokuczało',
          },
          {
            value: 1,
            label: 'Kilka dni',
          },
          {
            value: 2,
            label: 'Więcej niż połowę dni',
          },
          {
            value: 3,
            label: 'Niemal codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'appetite',
        label:
          'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi brak apetytu lub przejadanie się?',
        options: [
          {
            value: 0,
            label: 'Wcale nie dokuczały',
          },
          {
            value: 1,
            label: 'Kilka dni',
          },
          {
            value: 2,
            label: 'Więcej niż połowę dni',
          },
          {
            value: 3,
            label: 'Niemal codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'selfEsteem',
        label:
          'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi poczucie niezadowolenia z siebie lub uczucie, że jest do niczego albo że zawiódł/zawiodła siebie lub rodzinę?',
        options: [
          {
            value: 0,
            label: 'Wcale nie dokuczało',
          },
          {
            value: 1,
            label: 'Kilka dni',
          },
          {
            value: 2,
            label: 'Więcej niż połowę dni',
          },
          {
            value: 3,
            label: 'Niemal codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'concentration',
        label:
          'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi problemy ze skupieniem się, na przykład przy czytaniu gazety lub oglądaniu telewizji?',
        options: [
          {
            value: 0,
            label: 'Wcale nie dokuczały',
          },
          {
            value: 1,
            label: 'Kilka dni',
          },
          {
            value: 2,
            label: 'Więcej niż połowę dni',
          },
          {
            value: 3,
            label: 'Niemal codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'movement',
        label:
          'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi spowolnienie albo niemożność usiedzenia w miejscu lub podenerwowanie powodujące ruchliwość znacznie większą niż zwykle?',
        options: [
          {
            value: 0,
            label: 'Wcale nie dokuczało',
          },
          {
            value: 1,
            label: 'Kilka dni',
          },
          {
            value: 2,
            label: 'Więcej niż połowę dni',
          },
          {
            value: 3,
            label: 'Niemal codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'suicidalThoughts',
        label:
          'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi myśli, że lepiej byłoby umrzeć albo chęć zrobienia sobie jakiejś krzywdy?',
        options: [
          {
            value: 0,
            label: 'Wcale nie dokuczały',
          },
          {
            value: 1,
            label: 'Kilka dni',
          },
          {
            value: 2,
            label: 'Więcej niż połowę dni',
          },
          {
            value: 3,
            label: 'Niemal codziennie',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 20) interpretation = 'Ciężki epizod depresyjny.';
      else if (result >= 15 && result < 20)
        interpretation = 'Umiarkowanie ciężki epizod depresyjny.';
      else if (result >= 10 && result < 15)
        interpretation = 'Umiarkowany epizod depresyjny.';
      else if (result >= 5 && result < 10)
        interpretation = 'Łagodny epizod depresyjny.';
      else interpretation = 'Brak depresji.';

      return [result, interpretation];
    },
  },

  {
    id: 10,
    name: 'Kalkulator odstępu QTc (wzór Bazetta)',
    urlPath: '/kalkulator-qtc-bazetta',
    category: 'kardiologia',
    description: 'Oblicza skorygowany odstęp QT.',
    methodology: (
      <>
        <Text>
          Skorygowany odstęp QT (QTc) oblicza się za pomocą poniższego wzoru:
        </Text>
        <br />
        <MathJax>{'`QTc = (QT) / sqrt(R"R)`'}</MathJax>
        <br />
        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>QT</strong> – odstęp QT w milisekundach (ms),
          </ListItem>
          <ListItem>
            <strong>RR</strong> – odstęp RR w sekundach, który można obliczyć
            jako 60 podzielone przez czynność serca (liczba uderzeń serca na
            minutę).
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
    form: [
      {
        type: 'numberInput',
        name: 'qtInterval',
        label: 'Odstęp QT (ms)',
        min: 1,
        max: 1000,
      },
      {
        type: 'numberInput',
        name: 'heartRate',
        label: 'Czynność serca (na minutę)',
        min: 1,
        max: 700,
      },
    ],
    calculateResult(formValues: {
      [key: string]: string;
    }): [string | number, string] {
      const qtInterval: number = parseFloat(formValues['qtInterval']);
      const heartRate: number = parseFloat(formValues['heartRate']);

      if (!qtInterval || !heartRate)
        return ['0 ms', 'Uzupełnij wszystkie dane.'];

      const rr: number = 60 / heartRate;
      const result: number = qtInterval / Math.sqrt(rr);
      const formattedResult: number = parseFloat(result.toFixed(1));

      return [`${formattedResult} ms`, 'Skorygowany odstęp QTc'];
    },
  },

  {
    id: 11,
    name: 'Wskaźnik Maddreya',
    urlPath: '/wskaznik-maddreya',
    category: 'hepatologia',
    description:
      'Określa ryzyko zgonu u chorych z alkoholowym zapaleniem wątroby.',
    methodology: (
      <>
        <Text>
          Wskaźnik Maddreya (DF, ang. <em>Discriminant Function</em>) służy do
          oceny rokowania u pacjentów z alkoholowym zapaleniem wątroby. Oblicza
          się go na podstawie czasu protrombinowego, wartości referencyjnej oraz
          stężenia bilirubiny całkowitej.
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
          Wartość DF większa niż 32 sugeruje ciężki przebieg choroby i może
          wskazywać na konieczność intensywniejszego leczenia.
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
    form: [
      {
        type: 'numberInput',
        name: 'prothrombinTime',
        label: 'Czas protrombinowy pacjenta (s)',
        min: 0.1,
        max: 1000,
      },
      {
        type: 'numberInput',
        name: 'controlTime',
        label: 'Czas protrombinowy prawidłowy (s)',
        min: 0.1,
        max: 1000,
      },
      {
        type: 'numberInput',
        name: 'bilirubin',
        label: 'Stężenie bilirubiny całkowitej (mg/dl)',
        min: 0.1,
        max: 1000,
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const prothrombinTime: number = parseFloat(formValues['prothrombinTime']);
      const controlTime: number = parseFloat(formValues['controlTime']);
      const bilirubin: number = parseFloat(formValues['bilirubin']);

      if (!prothrombinTime || !controlTime || !bilirubin)
        return [0, 'Uzupełnij wszystkie dane.'];

      const result: number = (prothrombinTime - controlTime) * 4.6 + bilirubin;
      const formattedResult: number = parseFloat(result.toFixed(0));
      let interpretation: string = '';

      if (result > 32) {
        interpretation =
          'Ciężki stan pacjenta i ryzyko zgonu w przedziale 35-45% w ciągu 30 dni.';
      } else if (result <= 32 && result > 0) {
        interpretation =
          'Alkoholowe zapalenie wątroby o umiarkowanym lub niewielkim nasileniu.';
      } else {
        interpretation = 'Podaj prawidłowe dane.';
      }

      return [formattedResult, interpretation];
    },
  },

  {
    id: 12,
    name: 'Obliczanie dawki ibuprofenu',
    urlPath: '/obliczanie-dawki-ibuprofenu',
    category: 'dawkowanie leków',
    description:
      'Oblicza maksymalną dobową dawkę ibuprofenu biorąc pod uwagę wiek i masę ciała pacjenta.',
    methodology: (
      <>
        <Text>
          Maksymalna dobowa dawka ibuprofenu u dorosłych nie powinna przekraczać
          3,2 g. U dzieci dawkę tę oblicza się na podstawie masy ciała według
          poniższego wzoru:
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
    form: [
      {
        type: 'numberInput',
        name: 'age',
        label: 'Wiek (lata)',
        min: 1,
        max: 120,
      },
      {
        type: 'numberInput',
        name: 'weight',
        label: 'Masa ciała (kg)',
        min: 1,
        max: 200,
      },
    ],
    calculateResult(formValues: Record<string, string>): [string, string] {
      const age: number = parseFloat(formValues['age']);
      const weight: number = parseFloat(formValues['weight']);

      if (!age || !weight) {
        return ['0 g', 'Uzupełnij wszystkie dane.'];
      }

      const result: number = age > 12 ? 3.2 : (30 * weight) / 1000;
      const formattedResult: number = parseFloat(result.toFixed(1));

      return [`${formattedResult} g`, 'Maksymalna dobowa dawka ibuprofenu.'];
    },
  },

  {
    id: 13,
    name: 'Skala PESI',
    urlPath: '/skala-pesi',
    category: 'kardiologia',
    description: 'Prognozuje wynik leczenia pacjentów z zatorowością płucną.',
    methodology: (
      <>
        <Text>
          Skala PESI (ang. <em>Pulmonary Embolism Severity Index</em>) służy do
          oceny ryzyka zgonu u pacjentów z ostrą zatorowością płucną. Wartość
          wskaźnika oblicza się na podstawie wieku pacjenta oraz obecności
          określonych czynników klinicznych, którym przypisano punktację.
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
            <strong>R</strong> – suma punktów przypisanych za obecność
            poszczególnych czynników ryzyka.
          </ListItem>
        </UnorderedList>

        <br />
        <Text>
          Na podstawie końcowego wyniku pacjenta kwalifikuje się do jednej z
          pięciu klas ryzyka (I–V), które pomagają w ocenie rokowania i
          podejmowaniu decyzji terapeutycznych.
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
    form: [
      {
        type: 'numberInput',
        name: 'age',
        label: 'Wiek (lata)',
        min: 1,
        max: 125,
      },
      {
        type: 'checkbox',
        name: 'gender',
        value: 10,
        label: 'Płeć męska',
      },
      {
        type: 'checkbox',
        name: 'malignantTumor',
        value: 30,
        label: 'Nowotwór złośliwy',
      },
      {
        type: 'checkbox',
        name: 'heartFailure',
        value: 10,
        label: 'Przewlekła niewydolność serca',
      },
      {
        type: 'checkbox',
        name: 'chronicLungDisease',
        value: 10,
        label: 'Przewlekła choroba płuc',
      },
      {
        type: 'checkbox',
        name: 'tachycardia',
        value: 20,
        label: 'Tętno powyżej 110/min',
      },
      {
        type: 'checkbox',
        name: 'lowBloodPressure',
        value: 30,
        label: 'Skurczowe ciśnienie tętnicze poniżej 100 mm Hg',
      },
      {
        type: 'checkbox',
        name: 'highRespiratoryRate',
        value: 20,
        label: 'Częstość oddechów powyżej 30/min',
      },
      {
        type: 'checkbox',
        name: 'lowTemperature',
        value: 20,
        label: 'Temperatura poniżej 36°C',
      },
      {
        type: 'checkbox',
        name: 'mentalChange',
        value: 60,
        label: 'Zmiana stanu psychicznego',
      },
      {
        type: 'checkbox',
        name: 'lowOxygenSaturation',
        value: 20,
        label: 'Wysycenie hemoglobiny krwi tętniczej tlenem poniżej 90%',
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result > 125) {
        interpretation = 'Klasa V: ryzyko bardzo duże.';
      } else if (result > 105 && result <= 125) {
        interpretation = 'Klasa IV: ryzyko duże.';
      } else if (result > 85 && result <= 105) {
        interpretation = 'Klasa III: ryzyko umiarkowane.';
      } else if (result > 65 && result <= 85) {
        interpretation = 'Klasa II: ryzyko małe.';
      } else if (result > 0 && result <= 65) {
        interpretation = 'Klasa I: ryzyko bardzo małe.';
      } else {
        interpretation = 'Uzupełnij wszystkie dane.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 14,
    name: 'Zmodyfikowana skala genewska (oryginalna)',
    urlPath: '/skala-genewska-oryginalna',
    category: 'kardiologia',
    description: 'Ocenia prawdopodobieństwo zatorowości płucnej.',
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
    form: [
      {
        type: 'radioInput',
        name: 'heartRate',
        label: 'Tętno',
        options: [
          {
            value: 0,
            label: 'Poniżej 75',
          },
          {
            value: 3,
            label: '75 - 94',
          },
          {
            value: 5,
            label: '95 lub więcej',
          },
        ],
      },
      {
        type: 'checkbox',
        name: 'age',
        value: 1,
        label: 'Wiek powyżej 65 lat',
      },
      {
        type: 'checkbox',
        name: 'previousDVT',
        value: 3,
        label: 'Przebyta zakrzepica żył głębokich lub zatorowość płucna',
      },
      {
        type: 'checkbox',
        name: 'surgeryOrFracture',
        value: 2,
        label: 'Zabieg chirurgiczny lub złamanie w ciągu ostatniego miesiąca',
      },
      {
        type: 'checkbox',
        name: 'malignantTumor',
        value: 2,
        label: 'Niewyleczony nowotwór złośliwy',
      },
      {
        type: 'checkbox',
        name: 'unilateralLegPain',
        value: 3,
        label: 'Jednostronny ból kończyny dolnej',
      },
      {
        type: 'checkbox',
        name: 'hemoptysis',
        value: 2,
        label: 'Krwioplucie',
      },
      {
        type: 'checkbox',
        name: 'deepVeinTenderness',
        value: 4,
        label:
          'Ból podczas ucisku żył głębokich kończyny dolnej i jednostronny obrzęk',
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 11) {
        interpretation =
          'Duże prawdopodobieństwo kliniczne zatorowości płucnej.';
      } else if (result >= 4 && result < 11) {
        interpretation =
          'Pośrednie prawdopodobieństwo kliniczne zatorowości płucnej.';
      } else {
        interpretation =
          'Małe prawdopodobieństwo kliniczne zatorowości płucnej.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 15,
    name: 'Skala CURB-65',
    urlPath: '/skala-curb65',
    category: 'pulmonologia',
    description: 'Ocenia ciężkość pozaszpitalnego zapalenia płuc.',

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
    form: [
      {
        type: 'checkbox',
        name: 'confusion',
        value: 1,
        label: 'Zaburzenia świadomości',
      },
      {
        type: 'checkbox',
        name: 'urea',
        value: 1,
        label: 'Poziom mocznika większy niż 7 mmol/l',
      },
      {
        type: 'checkbox',
        name: 'respiratoryRate',
        value: 1,
        label: 'Częstość oddechów równa lub większa 30 na minutę',
      },
      {
        type: 'checkbox',
        name: 'lowBloodPressure',
        value: 1,
        label: 'Ciśnienie tętnicze krwi równe lub niższe od 90/60 mmHg',
      },
      {
        type: 'checkbox',
        name: 'age',
        value: 1,
        label: 'Wiek większy lub równy 65 lat',
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 3) {
        interpretation =
          'PZP ciężkie. Pacjent wymaga leczenia w szpitalu. Rozważ leczenie na oddziale intensywnej terapii.';
      } else if (result === 2) {
        interpretation =
          'PZP umiarkowane. Zaleca się przyjęcie pacjenta do szpitala.';
      } else {
        interpretation =
          'PZP lekkie. Pacjent może być leczony w domu, jeśli nie ma innych wskazań do hospitalizacji.';
      }
      return [result, interpretation];
    },
  },

  {
    id: 16,
    name: 'Kalkulator WHR (Waist-Hip Ratio)',
    urlPath: '/kalkulator-whr',
    category: 'antropometria',
    description: 'Oblicza stosunek obwodu talii do bioder.',
    methodology: (
      <>
        <Text>
          Wskaźnik WHR (ang. <em>Waist-Hip Ratio</em>) jest miarą rozmieszczenia
          tkanki tłuszczowej w organizmie i określa proporcję obwodu talii do
          obwodu bioder. Stosuje się go w ocenie ryzyka chorób
          sercowo-naczyniowych oraz metabolicznych.
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
          Wyższe wartości WHR mogą wskazywać na otyłość brzuszną, która wiąże
          się ze zwiększonym ryzykiem wystąpienia nadciśnienia, cukrzycy typu 2
          oraz chorób układu krążenia.
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
    form: [
      {
        type: 'radioInput',
        name: 'gender',
        label: 'Płeć',
        options: [
          {
            value: 'female',
            hideBadge: true,
            label: 'Kobieta',
          },
          {
            value: 'male',
            hideBadge: true,
            label: 'Mężczyzna',
          },
        ],
      },
      {
        type: 'numberInput',
        name: 'waist',
        label: 'Obwód talii (cm)',
        min: 1,
        max: 250,
      },
      {
        type: 'numberInput',
        name: 'hips',
        label: 'Obwód bioder (cm)',
        min: 1,
        max: 250,
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const gender: string = formValues['gender'];
      const waist: number = parseFloat(formValues['waist']);
      const hips: number = parseFloat(formValues['hips']);

      if (!gender || !waist || !hips) {
        return [0, 'Uzupełnij wszystkie dane.'];
      }

      const result: number = waist / hips;
      const formattedResult: number = parseFloat(result.toFixed(2));
      let interpretation: string = '';

      if (gender === 'male') {
        if (result >= 1) interpretation = 'Otyłość androidalna (brzuszna).';
        interpretation = 'Waga w normie.';
      } else {
        if (result >= 0.85) interpretation = 'Otyłość androidalna (brzuszna).';
        interpretation = 'Waga w normie.';
      }

      return [formattedResult, interpretation];
    },
  },

  {
    id: 17,
    name: 'Uproszczona skala SOFA (qSOFA)',
    urlPath: '/skala-qsofa',
    category: 'anestezjologia',
    description:
      'Identyfikuje pacjentów o wysokim ryzyku zgonu z powodu sepsy.',
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
    form: [
      {
        type: 'checkbox',
        name: 'consciousness',
        value: 1,
        label: 'Zaburzenia przytomności (mniej niż 15 punktów w skali Glasgow)',
      },
      {
        type: 'checkbox',
        name: 'respiratoryRate',
        value: 1,
        label: 'Częstotliwość oddechów większa lub równa 22/min',
      },
      {
        type: 'checkbox',
        name: 'bloodPressure',
        value: 1,
        label: 'Ciśnienie skurczowe krwi mniejsze lub równe 100 mm Hg',
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      const interpretation: string =
        result >= 2 ? 'Wysokie ryzyko zgonu.' : 'Niewysokie ryzyko zgonu.';

      return [result, interpretation];
    },
  },

  {
    id: 18,
    name: 'Kwestionariusz Fagerströma',
    urlPath: '/kwestionariusz-fagerstroma',
    category: 'używki',
    description: 'Ocenia stopień uzależnienia od nikotyny.',

    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title:
          'Tabela 3.22-2. Kwestionariusz oceny uzależnienia od nikotyny wg Fagerströma',
        dateOfAccess: '01.10.2024',
        link: 'https://www.mp.pl/interna/table/B16.3.23-2.',
      },
    ],
    form: [
      {
        type: 'radioInput',
        name: 'firstCigarette',
        label: 'Kiedy po przebudzeniu pacjent zapala pierwszego papierosa?',
        options: [
          {
            value: 3,
            label: 'Do 5 minut',
          },
          {
            value: 2,
            label: 'Od 6 do 30 minut',
          },
          {
            value: 1,
            label: 'Od 31 do 60 minut',
          },
          {
            value: 0,
            label: 'Po 60 minutach',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'difficultyAvoidingSmoking',
        label:
          'Czy pacjent ma trudności z powstrzymaniem się od palenia w miejscach, gdzie jest to zabronione?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'hardestCigarette',
        label: 'Z którego papierosa jest pacjentowi najtrudniej zrezygnować?',
        options: [
          {
            value: 1,
            label: 'Z pierwszego rano',
          },
          {
            value: 0,
            label: 'Z każdego innego',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'cigarettesPerDay',
        label: 'Ile papierosów pacjent wypala dziennie?',
        options: [
          {
            value: 0,
            label: '10 lub mniej',
          },
          {
            value: 1,
            label: 'Od 11 do 20',
          },
          {
            value: 2,
            label: 'Od 21 do 30',
          },
          {
            value: 3,
            label: '31 lub więcej',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'earlyMorningSmoking',
        label: 'Czy rano pacjent pali więcej papierosów niż w ciągu dnia?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'smokingDuringIllness',
        label:
          'Czy pacjent pali papierosy nawet podczas choroby, gdy musi leżeć w łóżku?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 7) {
        interpretation = 'Silne uzależnienie od nikotyny.';
      } else if (result >= 4 && result < 7) {
        interpretation = 'Średnie uzależnienie od nikotyny.';
      } else {
        interpretation = 'Słabe uzależnienie od nikotyny.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 19,
    name: 'Skala NYHA',
    urlPath: '/skala-nyha',
    category: 'kardiologia',
    description: 'Ocenia stopień niewydolności serca na podstawie objawów.',
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title:
          'Tabela 2.19-1. Klasyfikacja niewydolności serca wg New York Heart Association',
        dateOfAccess: '01.10.2024',
        link: 'https://www.mp.pl/interna/table/B16.2.19-1.',
      },
    ],
    form: [
      {
        type: 'radioInput',
        name: 'exerciseTolerance',
        label: 'Wydolność wysiłkowa',
        options: [
          {
            value: 1,
            label:
              'Bez ograniczeń w aktywności fizycznej. Zwykły wysiłek fizyczny nie powoduje nadmiernego zmęczenia, duszności ani kołatania serca',
          },
          {
            value: 2,
            label:
              'Niewielkie ograniczenie aktywności fizycznej. Bez dolegliwości w spoczynku, ale zwykła aktywność powoduje zmęczenie, kołatanie serca lub duszność',
          },
          {
            value: 3,
            label:
              'Znaczne ograniczenie aktywności fizycznej. Bez dolegliwości w spoczynku, ale aktywność mniejsza niż zwykła powoduje wystąpienie objawów',
          },
          {
            value: 4,
            label:
              'Każda aktywność fizyczna wywołuje dolegliwości. Objawy podmiotowe niewydolności serca występują nawet w spoczynku, a jakakolwiek aktywność nasila dolegliwości',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result === 4) {
        interpretation = 'NYHA IV';
      } else if (result === 3) {
        interpretation = 'NYHA III';
      } else if (result === 2) {
        interpretation = 'NYHA II';
      } else if (result === 1) {
        interpretation = 'NYHA I';
      } else {
        interpretation = 'Uzupełnij wszystkie dane.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 20,
    name: 'Skala CCS',
    urlPath: '/skala-ccs',
    category: 'kardiologia',
    description: 'Ocenia zaawansowanie choroby niedokrwiennej serca.',
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
    form: [
      {
        type: 'radioInput',
        name: 'activityLevel',
        label: 'Aktywność fizyczna',
        options: [
          {
            value: 1,
            label:
              'Zwyczajna aktywność fizyczna, taka jak chodzenie po płaskim terenie lub wchodzenie po schodach, nie wywołuje dławicy. Dławica występuje przy większym, gwałtowniejszym lub dłużej trwającym wysiłku fizycznym, związanym z pracą lub rekreacją',
          },
          {
            value: 2,
            label:
              'Niewielkie ograniczenie zwyczajnej aktywności fizycznej. Dławica występuje przy szybkim chodzeniu po płaskim terenie lub szybkim wchodzeniu po schodach, przy wchodzeniu pod górę, przy chodzeniu po płaskim terenie lub wchodzeniu po schodach, po posiłkach, gdy jest zimno, wieje wiatr, pod wpływem stresu emocjonalnego lub tylko w ciągu kilku godzin po przebudzeniu lub po przejściu ponad 200 m po terenie płaskim i przy wchodzeniu po schodach na więcej niż jedno piętro w normalnym tempie i w zwykłych warunkach',
          },
          {
            value: 3,
            label:
              'Znaczne ograniczenie zwykłej aktywności fizycznej. Dławica występuje po przejściu od 100 do 200 metrów po terenie płaskim lub przy wchodzeniu po schodach na jedno piętro w normalnym tempie i w zwykłych warunkach',
          },
          {
            value: 4,
            label:
              'Jakakolwiek aktywność fizyczna wywołuje dławicę. Może ona występować w spoczynku',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result === 4) {
        interpretation = 'Klasa CCS IV';
      } else if (result === 3) {
        interpretation = 'Klasa CCS III';
      } else if (result === 2) {
        interpretation = 'Klasa CCS II';
      } else if (result === 1) {
        interpretation = 'Klasa CCS I';
      } else {
        interpretation = 'Uzupełnij wszystkie dane.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 21,
    name: 'Wskaźnik eGFR (wzór Cockcrofta i Gaulta)',
    urlPath: '/wskaznik-gfr',
    category: 'nefrologia',
    description: 'Ocenia czynność nerek i szacuje klirens kreatyniny.',
    methodology: (
      <>
        <Text>
          Wzór Cockcrofta–Gaulta służy do szacowania klirensu kreatyniny (eGFR),
          który pozwala na ocenę czynności nerek. Uwzględnia wiek pacjenta, masę
          ciała oraz stężenie kreatyniny we krwi. Wartość ta pomaga dostosować
          dawki leków wydalanych przez nerki i monitorować funkcję nerek.
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
          <strong>0,85</strong>, co pozwala uwzględnić fizjologicznie niższą
          masę mięśniową w porównaniu do mężczyzn.
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
    form: [
      {
        type: 'radioInput',
        name: 'gender',
        label: 'Płeć',
        options: [
          {
            value: 'female',
            hideBadge: true,
            label: 'Kobieta',
          },
          {
            value: 'male',
            hideBadge: true,
            label: 'Mężczyzna',
          },
        ],
      },
      {
        type: 'numberInput',
        name: 'age',
        label: 'Wiek (lata)',
        min: 1,
        max: 120,
      },
      {
        type: 'numberInput',
        name: 'weight',
        label: 'Masa ciała (kg)',
        min: 1,
        max: 250,
      },
      {
        type: 'numberInput',
        name: 'creatinine',
        label: 'Stężenie kreatyniny (mg/dl)',
        min: 0.01,
        max: 100,
      },
    ],
    calculateResult(formValues: Record<string, string>): [string, string] {
      const age: number = parseFloat(formValues['age']);
      const weight: number = parseFloat(formValues['weight']);
      const creatinine: number = parseFloat(formValues['creatinine']);
      const gender: string = formValues['gender'];

      if (!age || !weight || !creatinine || !gender) {
        return ['0 ml/min', 'Uzupełnij wszystkie dane.'];
      }

      let result: number = ((140 - age) * weight) / (creatinine * 72);
      if (gender === 'female') {
        result = result * 0.85;
      }
      const formattedResult: string = `${result.toFixed(2)} ml/min`;
      const interpretation: string = 'Klirens kreatyniny.';

      return [formattedResult, interpretation];
    },
  },

  {
    id: 22,
    name: 'Wskaźnik FIB-4',
    urlPath: '/wskaznik-fib-4',
    category: 'hepatologia',
    description: 'Ocenia stopień włóknienia wątroby.',
    methodology: (
      <>
        <Text>
          Wskaźnik FIB-4 jest narzędziem służącym do oceny stopnia włóknienia
          wątroby u pacjentów z chorobami wątroby, takimi jak wirusowe zapalenie
          wątroby typu C lub alkoholowe uszkodzenie wątroby. Wartość FIB-4 jest
          obliczana na podstawie wieku pacjenta, stężenia enzymów wątrobowych
          (ALT i AST) oraz liczby płytek krwi.
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
          Wartość FIB-4 powyżej <strong>3,25</strong> sugeruje wysokie
          prawdopodobieństwo zaawansowanego włóknienia, natomiast wartość
          poniżej <strong>1,45</strong> wskazuje na niskie ryzyko obecności
          włóknienia.
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
    form: [
      {
        type: 'numberInput',
        name: 'age',
        label: 'Wiek (lata)',
        min: 1,
        max: 120,
      },
      {
        type: 'numberInput',
        name: 'alt',
        label: 'ALT',
        min: 1,
        max: 2500,
      },
      {
        type: 'numberInput',
        name: 'ast',
        label: 'AST',
        min: 1,
        max: 2500,
      },
      {
        type: 'numberInput',
        name: 'platelet',
        label: 'Liczba płytek krwi (x10⁹/l)',
        min: 1,
        max: 1000,
      },
    ],
    calculateResult(formValues: Record<string, string>): [string, string] {
      const age: number = parseFloat(formValues['age']);
      const alt: number = parseFloat(formValues['alt']);
      const ast: number = parseFloat(formValues['ast']);
      const platelet: number = parseFloat(formValues['platelet']);

      if (!age || !alt || !ast || !platelet) {
        return ['0', 'Uzupełnij wszystkie dane.'];
      }

      const result: number = (age * ast) / (platelet * Math.sqrt(alt));
      const formattedResult: string = result.toFixed(2);
      let interpretation: string = '';

      if (result > 3.25) {
        interpretation = 'Duże prawdopodobieństwo zaawansowanego włóknienia.';
      } else if (result > 1.45 && result <= 3.25) {
        interpretation =
          'Umiarkowane prawdopodobieństwo zaawansowanego włóknienia. Warto przeprowadzić dodatkowe badania.';
      } else {
        interpretation = 'Małe prawdopodobieństwo zaawansowanego włóknienia.';
      }

      return [formattedResult, interpretation];
    },
  },

  {
    id: 23,
    name: 'Skala Childa-Pugha',
    urlPath: '/skala-childa-pugha',
    category: 'hepatologia',
    description:
      'Określa stopień niewydolności wątroby i klasyfikację pacjenta do przeszczepu wątroby.',
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
    form: [
      {
        type: 'radioInput',
        name: 'encephalopathy',
        label: 'Encefalopatia',
        options: [
          {
            value: 1,
            label: 'Nie ma',
          },
          {
            value: 2,
            label: 'Stopień 1–2',
          },
          {
            value: 3,
            label: 'Stopień 3–4',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'ascites',
        label: 'Wodobrzusze',
        options: [
          {
            value: 1,
            label: 'Nie ma',
          },
          {
            value: 2,
            label: 'Umiarkowane',
          },
          {
            value: 3,
            label: 'Napięte',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'bilirubin',
        label: 'Stężenie bilirubiny',
        options: [
          {
            value: 1,
            label: 'Poniżej 2mg/dl (34.2 µmol/l)',
          },
          {
            value: 2,
            label: '2-3mg/dl (34.2-51.3 µmol/l)',
          },
          {
            value: 3,
            label: 'Ponad 3mg/dl (51.3 µmol/l)',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'albumin',
        label: 'Stężenie albuminy',
        options: [
          {
            value: 1,
            label: 'Powyżej 3.5 g/dl (35 g/l)',
          },
          {
            value: 2,
            label: '2.8-3.5 g/dl (28-35 g/l)',
          },
          {
            value: 3,
            label: 'Poniżej 2.8 g/dl (28 g/l)',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'prothrombinTime',
        label: 'Czas protrombinowy / INR',
        options: [
          {
            value: 1,
            label: 'Poniżej 5 / 1,70',
          },
          {
            value: 2,
            label: '5–10 / 1,70–2,20',
          },
          {
            value: 3,
            label: 'Ponad 10 / 2,20',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 10) {
        interpretation = 'Klasa C. Są wskazania do przeszczepu wątroby.';
      } else if (result >= 7 && result < 10) {
        interpretation = 'Klasa B. Są wskazania do przeszczepu wątroby.';
      } else if (result < 7 && result > 0) {
        interpretation = 'Klasa A. Nie ma wskazań do przeszczepu wątroby.';
      } else {
        interpretation = 'Uzupełnij wszystkie dane.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 24,
    name: 'Kalkulator SCORE2 / SCORE2-OP',
    urlPath: '/kalkulator-score2',
    category: 'kardiologia',
    description: 'Ocenia ryzyko sercowo-naczyniowe dla populacji Polski.',
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title:
          'Kalkulator ryzyka sercowo-naczyniowego SCORE2 i SCORE2-OP dla populacji Polski',
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
    form: [
      {
        type: 'radioInput',
        name: 'gender',
        label: 'Płeć',
        options: [
          {
            value: 'male',
            hideBadge: true,
            label: 'Mężczyzna',
          },
          {
            value: 'female',
            hideBadge: true,
            label: 'Kobieta',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'smokingStatus',
        label: 'Palenie papierosów',
        options: [
          {
            value: 'smoking',
            label: 'Tak',
          },
          {
            value: 'nonSmoking',
            label: 'Nie',
          },
        ],
      },
      {
        type: 'numberInput',
        name: 'age',
        label: 'Wiek (lata)',
        min: 40,
        max: 89,
      },
      {
        type: 'numberInput',
        name: 'bloodPressure',
        label: 'Ciśnienie tętnicze skurczowe (mm Hg)',
        min: 100,
        max: 179,
      },
      {
        type: 'numberInput',
        name: 'cholesterol',
        label: 'Cholesterol nie-HDL (mg/dl)',
        min: 116,
        max: 265,
      },
    ],
    calculateResult(formValues: Record<string, string>): [string, string] {
      const age: number = parseFloat(formValues['age']);
      const bloodPressure: number = parseFloat(formValues['bloodPressure']);
      const cholesterol: number = parseFloat(formValues['cholesterol']);
      const gender = formValues['gender'] as 'male' | 'female';
      const smokingStatus = formValues['smokingStatus'] as
        | 'smoking'
        | 'nonSmoking';

      if (!age || !bloodPressure || !cholesterol || !gender || !smokingStatus) {
        return ['0%', 'Uzupełnij wszystkie dane.'];
      }

      const getCholesterolGroup = (cholesterol: number) => {
        if (cholesterol < 150) return 0;
        if (cholesterol < 200) return 1;
        if (cholesterol < 250) return 2;
        return 3;
      };

      const getBloodPressureGroup = (bloodPressure: number) => {
        if (bloodPressure < 120) return 0;
        if (bloodPressure < 140) return 1;
        if (bloodPressure < 160) return 2;
        return 3;
      };

      const ageGroup: number = Math.floor((age - 40) / 5) * 5 + 40;
      const cholesterolGroup: number = getCholesterolGroup(cholesterol);
      const bloodPressureGroup: number = getBloodPressureGroup(bloodPressure);

      type Score2ValuesTable = {
        female: GenderGroup;
        male: GenderGroup;
      };

      type GenderGroup = {
        nonSmoking: AgeGroups;
        smoking: AgeGroups;
      };

      type AgeGroups = {
        [age: number]: number[][];
      };

      const score2ValuesTable: Score2ValuesTable = {
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
      };

      const result: number =
        score2ValuesTable[gender][smokingStatus][ageGroup][bloodPressureGroup][
          cholesterolGroup
        ];

      let interpretation = '';

      if (result === 0) {
        interpretation = 'Uzupełnij wszystkie dane.';
      } else if (age >= 70) {
        if (result < 7.5) {
          interpretation = 'Małe do umiarkowanego ryzyko w skali SCORE2-OP.';
        } else if (result < 15) {
          interpretation = 'Duże ryzyko w skali SCORE2-OP.';
        } else {
          interpretation = 'Bardzo duże ryzyko w skali SCORE2-OP.';
        }
      } else if (age >= 50) {
        if (result < 5) {
          interpretation = 'Małe do umiarkowanego ryzyko w skali SCORE2.';
        } else if (result < 10) {
          interpretation = 'Duże ryzyko w skali SCORE2.';
        } else {
          interpretation = 'Bardzo duże ryzyko w skali SCORE2.';
        }
      } else {
        if (result < 2.5) {
          interpretation = 'Małe do umiarkowanego ryzyko w skali SCORE2.';
        } else if (result < 7.5) {
          interpretation = 'Duże ryzyko w skali SCORE2.';
        } else {
          interpretation = 'Bardzo duże ryzyko w skali SCORE2.';
        }
      }

      return [`${result}%`, interpretation];
    },
  },

  {
    id: 25,
    name: 'Prognozowany wzrost dziecka',
    urlPath: '/prognozowany-wzrost-dziecka',
    category: 'antropometria',
    description: 'Przewiduje wzrost dziecka na podstawie wzrostu rodziców.',
    methodology: (
      <>
        <Text>
          Prognozowany wzrost dziecka można oszacować na podstawie wzrostu
          rodziców, korzystając z uproszczonego wzoru pediatrycznego. Pozwala on
          orientacyjnie określić, jaki wzrost dziecko może osiągnąć w wieku
          dorosłym.
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
            <strong>± 13</strong> – dodaj <strong>13 cm</strong> w przypadku
            chłopców, odejmij <strong>13 cm</strong> w przypadku dziewczynek.
          </ListItem>
        </UnorderedList>

        <br />
        <Text>
          Należy pamiętać, że wzór ten dostarcza jedynie orientacyjnej wartości
          i nie uwzględnia czynników genetycznych, środowiskowych oraz
          zdrowotnych, które również wpływają na wzrost dziecka.
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
    form: [
      {
        type: 'radioInput',
        name: 'gender',
        label: 'Płeć',
        options: [
          {
            value: 'male',
            hideBadge: true,
            label: 'Chłopiec',
          },
          {
            value: 'female',
            hideBadge: true,
            label: 'Dziewczynka',
          },
        ],
      },
      {
        type: 'numberInput',
        name: 'mothersHeight',
        label: 'Wzrost matki (w cm)',
        min: 140,
        max: 220,
      },
      {
        type: 'numberInput',
        name: 'fathersHeight',
        label: 'Wzrost ojca (w cm)',
        min: 140,
        max: 220,
      },
    ],
    calculateResult(formValues: Record<string, string>): [string, string] {
      const mothersHeight: number = parseInt(formValues['mothersHeight']);
      const fathersHeight: number = parseInt(formValues['fathersHeight']);
      const gender = formValues['gender'] as 'male' | 'female';

      if (!mothersHeight || !fathersHeight || !gender) {
        return ['0 cm', 'Uzupełnij wszystkie dane.'];
      }

      const result: number =
        gender === 'male'
          ? (mothersHeight + fathersHeight + 13) / 2
          : (mothersHeight + fathersHeight - 13) / 2;

      const interpretation = 'Przewidywany wzrost dziecka.';

      return [`${result.toFixed(0)} cm`, interpretation];
    },
  },

  {
    id: 26,
    name: 'Kwestionariusz MDQ',
    urlPath: '/kwestionariusz-mdq',
    category: 'psychiatria',
    description: 'Pozwala ocenić prawdopodobieństwo choroby dwubiegunowej.',
    sources: [
      {
        id: 1,
        author: 'PsychiatriaPlus.pl (dr hab. n. med. Jarosław Jóźwiak)',
        title: 'Kwestionariusz Zaburzeń Nastroju (MDQ)',
        dateOfAccess: '20.10.2024',
        link: 'https://psychiatraplus.pl/wp-content/uploads/2022/10/Kwestionariusz-Zaburzen-Nastroju-MDQ.pdf',
      },
    ],
    form: [
      {
        type: 'radioInput',
        name: 'euphoria',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i był w takiej euforii, że inni uważali, że nie jest sobą lub był w takiej euforii, że wdał się z tego powodu w kłopoty?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'nervousness',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i był tak poirytowany, że krzyczał na ludzi lub wdawał się z nimi w kłótnie?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'confidence',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i czuł się znacznie bardziej pewny siebie, niż zwykle?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'sleep',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i sypiał znacznie mniej niż zwykle, ale nie było to problemem?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'talkativeness',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i był znacznie bardziej rozmowny lub mówił szybciej, niż zwykle?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'rushOfThoughts',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i miał natłok myśli lub nie mógł zwolnić toku myśli?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'concentration',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i tak łatwo rozpraszał się rzeczami wokół, że miał problem z koncentracją i kontynuowaniem zadania?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'energy',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i miał znacznie więcej energii niż zazwyczaj?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'activity',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i był znacznie bardziej aktywny lub robił znacznie więcej, niż zazwyczaj?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'sociability',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i znacznie bardziej niż zwykle udzielał się towarzysko, np. dzwonił do znajomych w środku nocy?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'sexuality',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i był znacznie bardziej zainteresowany seksem niż zazwyczaj?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'riskyBehavior',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i robił rzeczy nietypowe dla siebie lub takie, które inni uznawali za przesadne, głupie lub ryzykowne?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'moneySpending',
        label:
          'Czy kiedykolwiek zdarzyło się, że pacjent nie czuł się sobą i wydawanie pieniędzy przysporzyło jemu lub jego rodzinie kłopotów?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'happenedAtTheSameTime',
        label:
          'Jeśli pacjent odpowiedział "tak" na 7 lub więcej pytań powyżej, czy kilka z powyższych objawów kiedykolwiek wystąpiło w tym samym czasie?',
        options: [
          {
            value: 'true',
            label: 'Tak',
          },
          {
            value: 'false',
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'problem',
        label:
          'Na ile problematyczne były dla pacjenta powyższe objawy, np. w pracy, rodzinie, zarabianiu pieniędzy, kłopotach z prawem lub wdawaniu się w kłótnie i bójki?',
        options: [
          {
            value: 'no',
            label: 'Bez problemu',
          },
          {
            value: 'small',
            label: 'Mały problem',
          },
          {
            value: 'medium',
            label: 'Średni problem',
          },
          {
            value: 'big',
            label: 'Duży problem',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      const happenedAtTheSameTime: boolean =
        formValues['happenedAtTheSameTime'] === 'true';
      const problem: string = formValues['problem'];
      const isProblem: boolean =
        problem === 'medium' || problem === 'big' ? true : false;
      let interpretation: string = '';

      if (result >= 7 && happenedAtTheSameTime && isProblem) {
        interpretation =
          'Diagnostyka w kierunku choroby dwubiegunowej jest konieczna.';
      } else {
        interpretation =
          'Diagnostyka w kierunku choroby dwubiegunowej nie jest konieczna.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 27,
    name: 'Test AUDIT',
    urlPath: '/test-audit',
    category: 'używki',
    description: 'Ocenia stopień uzależnienia od alkoholu.',
    sources: [
      {
        id: 1,
        author:
          'Centrum Dobrej Terapii (mgr Maria Kaleńczuk, mgr Teresa Janus)',
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
    form: [
      {
        type: 'radioInput',
        name: 'gender',
        label: 'Płeć',
        options: [
          {
            value: 'male',
            label: 'Mężczyzna',
            hideBadge: true,
          },
          {
            value: 'female',
            label: 'Kobieta',
            hideBadge: true,
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'frequency',
        label: 'Jak często pacjent pije napoje alkoholowe?',
        options: [
          {
            value: 0,
            label: 'Nigdy',
          },
          {
            value: 1,
            label: 'Raz w miesiącu',
          },
          {
            value: 2,
            label: 'Od 2 do 4 razy w miesiącu',
          },
          {
            value: 3,
            label: 'Od 2 do 3 razy w tygodniu',
          },
          {
            value: 4,
            label: '4 razy w tygodniu lub częściej',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'amount',
        label:
          'Ile standardowych porcji alkoholu pacjent wypija w typowym dniu, gdy spożywa alkohol? Jedna standardowa porcja to 10 g czystego alkoholu, np. 250 ml piwa o mocy 5%, 100 ml wina o mocy 12% lub 30 ml wódki o mocy 40%',
        options: [
          {
            value: 0,
            label: '1 lub 2 porcje',
          },
          {
            value: 1,
            label: '3 lub 4 porcje',
          },
          {
            value: 2,
            label: '5 lub 6 porcji',
          },
          {
            value: 3,
            label: 'Od 7 do 9 porcji',
          },
          {
            value: 4,
            label: '10 porcji lub więcej',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'amountPerDay',
        label:
          'Jak często pacjent wypija co najmniej 6 porcji alkoholu podczas jednego dnia?',
        options: [
          {
            value: 0,
            label: 'Nigdy',
          },
          {
            value: 1,
            label: 'Rzadziej niż raz w miesiącu',
          },
          {
            value: 2,
            label: 'Około raz w miesiącu',
          },
          {
            value: 3,
            label: 'Około raz w tygodniu',
          },
          {
            value: 4,
            label: 'Codziennie lub prawie codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'inabilityToStop',
        label:
          'Jak często w ostatnim roku pacjent nie mógł przerwać picia po jego rozpoczęciu?',
        options: [
          {
            value: 0,
            label: 'Nigdy',
          },
          {
            value: 1,
            label: 'Rzadziej niż raz w miesiącu',
          },
          {
            value: 2,
            label: 'Około raz w miesiącu',
          },
          {
            value: 3,
            label: 'Około raz w tygodniu',
          },
          {
            value: 4,
            label: 'Codziennie lub prawie codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'inappropriateBehavior',
        label:
          'Jak często w ciągu ostatniego roku z powodu picia pacjent zrobił coś niewłaściwego, niezgodnego z przyjętymi w jego środowisku normami postępowania?',
        options: [
          {
            value: 0,
            label: 'Nigdy',
          },
          {
            value: 1,
            label: 'Rzadziej niż raz w miesiącu',
          },
          {
            value: 2,
            label: 'Około raz w miesiącu',
          },
          {
            value: 3,
            label: 'Około raz w tygodniu',
          },
          {
            value: 4,
            label: 'Codziennie lub prawie codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'morningDrinking',
        label:
          'Jak często w ostatnim roku pacjent musiał napić się alkoholu rano, aby móc dojść do siebie po intensywnym piciu poprzedniego dnia?',
        options: [
          {
            value: 0,
            label: 'Nigdy',
          },
          {
            value: 1,
            label: 'Rzadziej niż raz w miesiącu',
          },
          {
            value: 2,
            label: 'Około raz w miesiącu',
          },
          {
            value: 3,
            label: 'Około raz w tygodniu',
          },
          {
            value: 4,
            label: 'Codziennie lub prawie codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'remorse',
        label:
          'Jak często w ostatnim roku pacjent miał poczucie winy lub wyrzuty sumienia po spożyciu alkoholu?',
        options: [
          {
            value: 0,
            label: 'Nigdy',
          },
          {
            value: 1,
            label: 'Rzadziej niż raz w miesiącu',
          },
          {
            value: 2,
            label: 'Około raz w miesiącu',
          },
          {
            value: 3,
            label: 'Około raz w tygodniu',
          },
          {
            value: 4,
            label: 'Codziennie lub prawie codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'memory',
        label:
          'Jak często w ostatnim roku z powodu picia pacjent nie mógł sobie przypomnieć, co zdarzyło się poprzedniego dnia?',
        options: [
          {
            value: 0,
            label: 'Nigdy',
          },
          {
            value: 1,
            label: 'Rzadziej niż raz w miesiącu',
          },
          {
            value: 2,
            label: 'Około raz w miesiącu',
          },
          {
            value: 3,
            label: 'Około raz w tygodniu',
          },
          {
            value: 4,
            label: 'Codziennie lub prawie codziennie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'injury',
        label:
          'Czy pacjent lub ktoś inny kiedykolwiek doznał urazu fizycznego z powodu jego picia?',
        options: [
          {
            value: 0,
            label: 'Nie',
          },
          {
            value: 2,
            label: 'Tak, ale nie w ostatnim roku',
          },
          {
            value: 4,
            label: 'Tak, w ostatnim roku',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'signaling',
        label:
          'Czy ktoś z rodziny, lekarz lub inny pracownik ochrony zdrowia interesował się piciem pacjenta lub sugerował jego ograniczenie?',
        options: [
          {
            value: 0,
            label: 'Nie',
          },
          {
            value: 2,
            label: 'Tak, ale nie w ostatnim roku',
          },
          {
            value: 4,
            label: 'Tak, w ostatnim roku',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result = sumValues(formValues);
      const gender = formValues['gender'];
      let interpretation: string = '';

      const lowRisk: string = 'Picie o niskim poziomie ryzyka.';
      const mediumRisk: string = 'Ryzykowne spożywanie alkoholu.';
      const highRisk: string = 'Szkodliwe picie alkoholu.';
      const criticalRisk: string = 'Podejrzenie uzależnienia od alkoholu.';

      if (result > 19) {
        interpretation = criticalRisk;
      } else if (result > 15 && result <= 19) {
        interpretation = highRisk;
      } else if (
        (gender === 'male' && result > 7 && result <= 15) ||
        (gender === 'female' && result > 6 && result <= 15)
      ) {
        interpretation = mediumRisk;
      } else {
        interpretation = lowRisk;
      }

      return [result, interpretation];
    },
  },

  {
    id: 28,
    name: 'Pediatryczna skala Glasgow',
    urlPath: '/pediatryczna-skala-glasgow',
    category: 'pediatria',
    description: 'Ocenia poziom przytomności u dzieci do 2 roku życia.',
    sources: [
      {
        id: 1,
        author: 'Medycyna i Statystyka',
        title: 'Pediatryczna skala Glasgow (Pediatric Glasgow Coma Scale)',
        dateOfAccess: '23.10.2024',
        link: 'https://medycynaistatystyka.pl/pediatryczna-skala-glasgow',
      },
    ],
    form: [
      {
        type: 'radioInput',
        name: 'openingEyes',
        label: 'Otwieranie oczu',
        options: [
          {
            value: 4,
            label: 'Spontaniczne',
          },
          {
            value: 3,
            label: 'W odpowiedzi na bodziec głosowy',
          },
          {
            value: 2,
            label: 'W odpowiedzi na bodziec bólowy',
          },
          {
            value: 1,
            label: 'Nie otwiera oczu',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'verbalResponse',
        label: 'Odpowiedź słowna',
        options: [
          {
            value: 5,
            label: 'Uśmiech lub adekwatny płacz',
          },
          {
            value: 4,
            label: 'Gwałtowny, nieustępujący płacz',
          },
          {
            value: 3,
            label: 'Nieadekwatny płacz lub krzyk',
          },
          {
            value: 2,
            label: 'Jęki lub pochrząkiwanie',
          },
          {
            value: 1,
            label: 'Brak reakcji',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'motorReaction',
        label: 'Reakcja ruchowa',
        options: [
          {
            value: 6,
            label: 'Ruchy spontaniczne',
          },
          {
            value: 5,
            label: 'Zlokalizowanie, próba usunięcia bodźca bólowego',
          },
          {
            value: 4,
            label: 'Wycofanie przed bodźcem bólowym',
          },
          {
            value: 3,
            label: 'Patologiczna reakcja zgięciowa w reakcji na bodziec bólowy',
          },
          {
            value: 2,
            label: 'Patologiczna reakcja wyprostna w reakcji na bodziec bólowy',
          },
          {
            value: 1,
            label: 'Brak reakcji',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 13) {
        interpretation = 'Łagodne zaburzenia przytomności.';
      } else if (result >= 9 && result < 13) {
        interpretation = 'Umiarkowane zaburzenia przytomności.';
      } else if (result < 9 && result > 0) {
        interpretation = 'Ciężkie zaburzenia przytomności.';
      } else {
        interpretation = 'Uzupełnij wszystkie dane.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 29,
    name: 'Skala Apgar',
    urlPath: '/skala-apgar',
    category: 'pediatria',
    description: 'Ocenia noworodka w pierwszej i w piątej minucie życia.',
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
    form: [
      {
        type: 'radioInput',
        name: 'heartbeat',
        label: 'Akcja serca',
        options: [
          {
            value: 0,
            label: 'Brak czynności',
          },
          {
            value: 1,
            label: 'Poniżej 100 uderzeń na minutę',
          },
          {
            value: 2,
            label: 'Co najmniej 100 uderzeń na minutę',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'breathing',
        label: 'Oddychanie',
        options: [
          {
            value: 0,
            label: 'Brak oddechu',
          },
          {
            value: 1,
            label: 'Zwolnione lub nieregularne',
          },
          {
            value: 2,
            label: 'Aktywne ruchy',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'muscleTension',
        label: 'Napięcie mięśni',
        options: [
          {
            value: 0,
            label: 'Wiotkie',
          },
          {
            value: 1,
            label: 'Obecne',
          },
          {
            value: 2,
            label: 'Aktywne ruchy',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'reflexes',
        label: 'Odruchy (reakcja na wprowadzenie cewnika do nosa)',
        options: [
          {
            value: 0,
            label: 'Brak reakcji',
          },
          {
            value: 1,
            label: 'Słaba reakcja (grymas)',
          },
          {
            value: 2,
            label: 'Adekwatna reakcja (kichanie)',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'skinColor',
        label: 'Zabarwienie skóry',
        options: [
          {
            value: 0,
            label: 'Blada',
          },
          {
            value: 1,
            label: 'Sinica obwodowa',
          },
          {
            value: 2,
            label: 'Różowa',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result >= 8) {
        interpretation = 'Stan dobry.';
      } else if (result >= 4 && result < 8) {
        interpretation = 'Stan średni.';
      } else {
        interpretation = 'Stan zły (ciężki).';
      }

      return [result, interpretation];
    },
  },

  {
    id: 30,
    name: 'Skala Barthel',
    urlPath: '/skala-barthel',
    category: 'geriatria',
    description:
      'Ocenia poziom samodzielności i zdolność zaspokajania podstawowych potrzeb życiowych pacjentów.',
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
    form: [
      {
        type: 'radioInput',
        name: 'eatingMeals',
        label: 'Spożywanie posiłków',
        options: [
          {
            value: 0,
            label: 'Nie jest w stanie samodzielnie jeść lub przełykać',
          },
          {
            value: 5,
            label:
              'Potrzebuje pomocy w krojeniu, smarowaniu, karmieniu doustnym',
          },
          {
            value: 10,
            label: 'Samodzielny, niezależny',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'movingAndSitting',
        label: 'Przemieszczanie się z łóżka na krzesło i z powrotem/siadanie',
        options: [
          {
            value: 0,
            label:
              'Nie jest w stanie się przemieszczać, nie zachowuje równowagi przy siadaniu oraz siedzeniu',
          },
          {
            value: 5,
            label:
              'Przemieszcza się z pomocą fizyczną jednej lub dwóch osób, może siedzieć',
          },
          {
            value: 10,
            label: 'Mniejsza pomoc (słowna lub fizyczna)',
          },
          {
            value: 15,
            label: 'Samodzielny',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'keepingPersonalHygiene',
        label: 'Utrzymanie higieny osobistej',
        options: [
          {
            value: 0,
            label: 'Nie jest w stanie wykonać żadnych czynności higienicznych',
          },
          {
            value: 5,
            label: 'Potrzebuje pomocy przy wykonywaniu czynności higienicznych',
          },
          {
            value: 10,
            label:
              'Samodzielny przy myciu twarzy, czesaniu się, myciu zębów, także z zapewnionymi pomocami',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'usingToilet',
        label: 'Korzystanie z toalety',
        options: [
          {
            value: 0,
            label: 'Nie korzysta w ogóle z toalety',
          },
          {
            value: 5,
            label:
              'Potrzebuje lub częściowo potrzebuje pomocy przy korzystaniu z toalety',
          },
          {
            value: 10,
            label:
              'Samodzielny w dotarciu do toalety oraz w zdejmowaniu i zakładaniu części garderoby',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'washingBody',
        label: 'Mycie i kąpiel całego ciała',
        options: [
          {
            value: 0,
            label: 'Kąpany w wannie przy pomocy podnośnika',
          },
          {
            value: 5,
            label: 'Wymaga pomocy',
          },
          {
            value: 10,
            label: 'Samodzielny',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'movingOnFlatSurfaces',
        label: 'Poruszanie się po powierzchniach płaskich',
        options: [
          {
            value: 0,
            label: 'W ogóle nie porusza się',
          },
          {
            value: 5,
            label:
              'Porusza się na odległość do 50 m za pomocą sprzętu wspomagającego i z pomocą co najmniej jednej osoby',
          },
          {
            value: 10,
            label:
              'Samodzielny, niezależny w poruszaniu się na odległość powyżej 50m, także w użyciem sprzętu wspomagającego',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'usingStairs',
        label: 'Chodzenie po schodach',
        options: [
          {
            value: 0,
            label:
              'Nie jest w stanie wchodzić i schodzić po schodach nawet z pomocą innej osoby',
          },
          {
            value: 5,
            label: 'Potrzebuje pomocy fizycznej, asekuracji, przenoszenia',
          },
          {
            value: 10,
            label: 'Samodzielny',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'dressing',
        label: 'Ubieranie i rozbieranie się',
        options: [
          {
            value: 0,
            label: 'Potrzebuje kompleksowej pomocy innej osoby',
          },
          {
            value: 5,
            label: 'Potrzebuje częściowej pomocy innej osoby',
          },
          {
            value: 10,
            label:
              'Samodzielny, niezależny (także w zapinaniu guzików, zamka, zawiązywaniu sznurowadeł)',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'analSphincterControl',
        label: 'Kontrola zwieracza odbytu',
        options: [
          {
            value: 0,
            label: 'Nie panuje nad oddawaniem stolca',
          },
          {
            value: 5,
            label: 'Sporadycznie bezwiednie oddaje stolec',
          },
          {
            value: 10,
            label: 'Kontroluje oddawanie stolca',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'bladderSphincterControl',
        label: 'Kontrola zwieraczy pęcherza moczowego',
        options: [
          {
            value: 0,
            label: 'Nie panuje nad oddawaniem moczu',
          },
          {
            value: 5,
            label: 'Sporadycznie bezwiednie oddaje mocz',
          },
          {
            value: 10,
            label: 'Kontroluje oddawanie moczu',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result > 85) {
        interpretation = 'Lekki stan pacjenta, osoba samodzielna.';
      } else if (result > 20 && result <= 85) {
        interpretation =
          'Średnio ciężki stan pacjenta, osoba częściowo samodzielna.';
      } else {
        interpretation =
          'Ciężki stan pacjenta, osoba niesamodzielna, potrzebująca stałej opieki.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 31,
    name: 'Obliczanie zawartości alkoholu we krwi (wzór Erika Widmarka)',
    urlPath: '/obliczanie-alkoholu-widmarka',
    category: 'używki',
    description: 'Wylicza przybliżoną zawartość alkoholu we krwi.',
    methodology: (
      <>
        <Text>
          Wzór Erika Widmarka służy do szacunkowego obliczenia stężenia alkoholu
          we krwi (BAC –<em>Blood Alcohol Concentration</em>) na podstawie
          ilości spożytego alkoholu, masy ciała oraz płci.
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
          Wzór ten daje jedynie przybliżony wynik i nie uwzględnia
          indywidualnych różnic w metabolizmie, stanie zdrowia czy sposobie
          spożywania alkoholu.
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
    form: [
      {
        type: 'radioInput',
        name: 'gender',
        label: 'Płeć',
        options: [
          {
            value: 'female',
            label: 'Kobieta',
            hideBadge: true,
          },
          {
            value: 'male',
            label: 'Mężczyzna',
            hideBadge: true,
          },
        ],
      },
      {
        type: 'numberInput',
        name: 'bodyWeight',
        label: 'Masa ciała (w kg)',
        min: 1,
        max: 250,
      },
      {
        type: 'numberInput',
        name: 'consumedAlcohol',
        label:
          'Ilość wypitego czystego alkoholu w gramach (1 ml czystego alkoholu to 0,8 g)',
        min: 1,
        max: 1000,
      },
    ],
    calculateResult(formValues: Record<string, string>): [string, string] {
      const gender = formValues['gender'] as 'male' | 'female';
      const genderIndex: number = gender === 'male' ? 0.7 : 0.6;
      const consumedAlcohol: number = parseFloat(formValues['consumedAlcohol']);
      const bodyWeight: number = parseFloat(formValues['bodyWeight']);

      if (!gender || !consumedAlcohol || !bodyWeight) {
        return ['0‰', 'Przybliżona zawartość alkoholu we krwi.'];
      }

      const result: number = consumedAlcohol / (genderIndex * bodyWeight);
      const formattedResult: number = parseFloat(result.toFixed(1));
      const interpretation: string = 'Przybliżona zawartość alkoholu we krwi.';

      return [`${formattedResult} ‰`, interpretation];
    },
  },

  {
    id: 32,
    name: 'Skala Oakland',
    urlPath: '/skala-oakland',
    category: 'gastrologia',
    description:
      'Ocenia ciężkość krwawienia z dolnego odcinka przewodu pokarmowego.',
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title:
          'Rozpoznanie i leczenie ostrego krwawienia do dolnego odcinka przewodu pokarmowego',
        dateOfAccess: '29.10.2024',
        link: 'https://www.mp.pl/chirurgia/wytyczne-przegladowe/242727,rozpoznanie-i-leczenie-ostrego-krwawienia-do-dolnego-odcinka-przewodu-pokarmowego',
      },
    ],
    form: [
      {
        type: 'radioInput',
        name: 'age',
        label: 'Wiek',
        options: [
          {
            value: 0,
            label: 'Mniej niż 40 lat',
          },
          {
            value: 1,
            label: 'Od 40 do 59 lat',
          },
          {
            value: 2,
            label: '70 lat lub więcej',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'gender',
        label: 'Płeć',
        options: [
          {
            value: 0,
            label: 'Kobieta',
          },
          {
            value: 1,
            label: 'Mężczyzna',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'previousHospitalization',
        label: 'Wcześniejsze hospitalizacje z powodu krwawienia do DOPP',
        options: [
          {
            value: 0,
            label: 'Nie',
          },
          {
            value: 1,
            label: 'Tak',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'rectalExamination',
        label: 'Wynik badania per rectum',
        options: [
          {
            value: 0,
            label: 'Bez krwi',
          },
          {
            value: 1,
            label: 'Obecna krew',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'heartRate',
        label: 'Częstotliwość rytmu serca',
        options: [
          {
            value: 0,
            label: 'Mniej niż 70 na minutę',
          },
          {
            value: 1,
            label: 'Między 70 a 89 na minutę',
          },
          {
            value: 2,
            label: 'Między 90 a 109 na minutę',
          },
          {
            value: 3,
            label: '110 na minutę lub więcej',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'bloodPressure',
        label: 'Ciśnienie tętnicze skurczowe',
        options: [
          {
            value: 5,
            label: 'Mniej niż 90 mm Hg',
          },
          {
            value: 4,
            label: 'Od 90 do 119 mm Hg',
          },
          {
            value: 3,
            label: 'Od 120 do 129 mm Hg',
          },
          {
            value: 2,
            label: 'Od 130 do 159 mm Hg',
          },
          {
            value: 0,
            label: '160 mm Hg lub więcej',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'hemoglobinConcentration',
        label: 'Stężenie hemoglobiny',
        options: [
          {
            value: 22,
            label: 'Mniej niż 7 g/dl',
          },
          {
            value: 17,
            label: 'Od 7 do 8,9 g/dl',
          },
          {
            value: 13,
            label: 'Od 9 do 10,9 g/dl',
          },
          {
            value: 8,
            label: 'Od 11 do 12,9 g/dl',
          },
          {
            value: 4,
            label: 'Od 13 do 15,9 g/dl',
          },
          {
            value: 0,
            label: '16 g/dl lub więcej',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      const interpretation: string =
        result > 8
          ? 'Poważne krwawienie. Wskazana jest hospitalizacja.'
          : 'Umiarkowane krwawienie. Z dużym prawdopodobieństwem można wypisać pacjenta z SOR.';

      return [result, interpretation];
    },
  },

  {
    id: 33,
    name: 'Kwestionariusz STOP-BANG',
    urlPath: '/stop-bang',
    category: 'pulmonologia',
    description: 'Ocenia ryzyko obturacyjnego bezdechu sennego.',

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
    form: [
      {
        type: 'radioInput',
        name: 's',
        label:
          'Czy pacjent chrapie na tyle głośno, że słychać to przez zamknięte drzwi lub partner/ka szturcha go przez to w nocy?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 't',
        label:
          'Czy pacjent często czuje się zmęczony, wyczerpany lub śpiący w ciągu dnia?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'o',
        label:
          'Czy ktoś zaobserwował u pacjenta przerwy w oddychaniu, krztuszenie się lub dławienie w czasie snu?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'p',
        label: 'Czy pacjent choruje na nadciśnienie tętnicze?',
        options: [
          {
            value: 1,
            label: 'Tak',
          },
          {
            value: 0,
            label: 'Nie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'b',
        label: 'BMI pacjenta',
        options: [
          {
            value: 0,
            label: 'Mniejsze lub równe 35',
          },
          {
            value: 1,
            label: 'Powyżej 35',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'a',
        label: 'Wiek pacjenta',
        options: [
          {
            value: 0,
            label: 'Mniejszy lub równy 50 lat',
          },
          {
            value: 1,
            label: 'Powyżej 50 lat',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'n',
        label: 'Obwód szyi pacjenta',
        options: [
          {
            value: 0,
            label: 'Mniejszy lub równy 40 cm',
          },
          {
            value: 1,
            label: 'Powyżej 40 cm',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'g',
        label: 'Płeć pacjenta',
        options: [
          {
            value: 0,
            label: 'Kobieta',
          },
          {
            value: 1,
            label: 'Mężczyzna',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      const s: number = parseInt(formValues['s']);
      const t: number = parseInt(formValues['t']);
      const o: number = parseInt(formValues['o']);
      const p: number = parseInt(formValues['p']);
      const b: number = parseInt(formValues['b']);
      const n: number = parseInt(formValues['n']);
      const g: number = parseInt(formValues['g']);
      const stopSum: number = s + t + o + p;
      const bngSum: number = b + n + g;
      const isHighRisk: boolean = stopSum >= 2 && bngSum >= 1 ? true : false;
      let interpretation: string = '';

      if (result >= 5 || isHighRisk) {
        interpretation = 'Wysokie ryzyko obturacyjnego bezdechu sennego.';
      } else if (result >= 3 && result < 5) {
        interpretation = 'Umiarkowane ryzyko obturacyjnego bezdechu sennego.';
      } else {
        interpretation = 'Niskie ryzyko obturacyjnego bezdechu sennego.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 34,
    name: 'Skala NIHSS',
    urlPath: '/skala-nihss',
    category: 'neurologia',
    description: 'Określa ciężkość udaru mózgu.',
    sources: [
      {
        id: 1,
        author: 'Medycyna Praktyczna',
        title:
          'Ocena kliniczna i leczenie w warunkach stanu naglącego (Portal lekarzy)',
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
    form: [
      {
        type: 'radioInput',
        name: 'consciousness',
        label: 'Stan przytomności',
        options: [
          {
            value: 0,
            label: 'Przytomny',
          },
          {
            value: 1,
            label: 'Przebudza się przy niewielkiej stymulacji',
          },
          {
            value: 2,
            label: 'Wymaga powtarzającej się stymulacji w celu pobudzenia',
          },
          {
            value: 3,
            label: 'Brak reakcji na bodźce',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'dateAnswers',
        label: 'Odpowiedzi na pytania dotyczące miesiąca i wieku',
        options: [
          {
            value: 0,
            label: 'Obie odpowiedzi prawidłowe',
          },
          {
            value: 1,
            label: 'Jedna odpowiedź prawidłowa',
          },
          {
            value: 2,
            label: 'Obie odpowiedzi nieprawidłowe',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'blinking',
        label: 'Reakcja na polecenia mrugania oczami i ściskania dłoni',
        options: [
          {
            value: 0,
            label: 'Spełnia prawidłowo oba polecenia',
          },
          {
            value: 1,
            label: 'Spełnia prawidłowo jedno polecenie',
          },
          {
            value: 2,
            label: 'Nie spełnia żadnego polecenia',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'eyeMovement',
        label: 'Ruchy gałek ocznych w poziomie',
        options: [
          {
            value: 0,
            label: 'Prawidłowe',
          },
          {
            value: 1,
            label: 'Częściowe porażenie',
          },
          {
            value: 2,
            label: 'Całkowite porażenie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'eyeSight',
        label: 'Pole widzenia',
        options: [
          {
            value: 0,
            label: 'Prawidłowe pole widzenia',
          },
          {
            value: 1,
            label: 'Częściowe niedowidzenie połowicze',
          },
          {
            value: 2,
            label: 'Całkowite niedowidzenie połowicze',
          },
          {
            value: 3,
            label: 'Obustronne niedowidzenie połowicze',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'muscleParesis',
        label: 'Niedowład mięśni twarzy',
        options: [
          {
            value: 0,
            label: 'Bez niedowładu',
          },
          {
            value: 1,
            label: 'Niewielki niedowład',
          },
          {
            value: 2,
            label: 'Umiarkowany niedowład',
          },
          {
            value: 3,
            label: 'Jednostronne porażenie',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'leftArmParesis',
        label: 'Niedowład kończyny górnej lewej',
        options: [
          {
            value: 0,
            label: 'Utrzymuje uniesioną kończynę',
          },
          {
            value: 1,
            label: 'Kończyna opada częściowo przed upływem 10 sekund',
          },
          {
            value: 2,
            label: 'Kończyna opada całkowicie przed upływem 10 sekund',
          },
          {
            value: 3,
            label: 'Brak ruchu przeciw sile ciężkości',
          },
          {
            value: 4,
            label: 'Brak ruchu',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'rightArmParesis',
        label: 'Niedowład kończyny górnej prawej',
        options: [
          {
            value: 0,
            label: 'Utrzymuje uniesioną kończynę',
          },
          {
            value: 1,
            label: 'Kończyna opada częściowo przed upływem 10 sekund',
          },
          {
            value: 2,
            label: 'Kończyna opada całkowicie przed upływem 10 sekund',
          },
          {
            value: 3,
            label: 'Brak ruchu przeciw sile ciężkości',
          },
          {
            value: 4,
            label: 'Brak ruchu',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'leftLegParesis',
        label: 'Niedowład kończyny dolnej lewej',
        options: [
          {
            value: 0,
            label: 'Utrzymuje uniesioną kończynę',
          },
          {
            value: 1,
            label: 'Kończyna opada częściowo przed upływem 5 sekund',
          },
          {
            value: 2,
            label: 'Kończyna opada całkowicie przed upływem 5 sekund',
          },
          {
            value: 3,
            label: 'Brak ruchu przeciw sile ciężkości',
          },
          {
            value: 4,
            label: 'Brak ruchu',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'rightLegParesis',
        label: 'Niedowład kończyny dolnej prawej',
        options: [
          {
            value: 0,
            label: 'Utrzymuje uniesioną kończynę',
          },
          {
            value: 1,
            label: 'Kończyna opada częściowo przed upływem 5 sekund',
          },
          {
            value: 2,
            label: 'Kończyna opada całkowicie przed upływem 5 sekund',
          },
          {
            value: 3,
            label: 'Brak ruchu przeciw sile ciężkości',
          },
          {
            value: 4,
            label: 'Brak ruchu',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'limbAtaxia',
        label: 'Ataksja kończyn',
        options: [
          {
            value: 0,
            label: 'Bez ataksji',
          },
          {
            value: 1,
            label: 'W jednej kończynie',
          },
          {
            value: 2,
            label: 'W dwóch kończynach',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'feeling',
        label: 'Czucie',
        options: [
          {
            value: 0,
            label: 'Prawidłowe',
          },
          {
            value: 1,
            label: 'Niewielka niedoczulica',
          },
          {
            value: 2,
            label: 'Ciężka niedoczulica',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'speech',
        label: 'Mowa',
        options: [
          {
            value: 0,
            label: 'Prawidłowa, bez afazji',
          },
          {
            value: 1,
            label: 'Niewielka afazja',
          },
          {
            value: 2,
            label: 'Ciężka afazja',
          },
          {
            value: 3,
            label: 'Brak mowy, całkowita afazja',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'dysarthria',
        label: 'Dyzartria',
        options: [
          {
            value: 0,
            label: 'Bez dyzartii',
          },
          {
            value: 1,
            label: 'Niewielka dyzartia',
          },
          {
            value: 2,
            label: 'Ciężka dyzartia',
          },
        ],
      },
      {
        type: 'radioInput',
        name: 'inattention',
        label: 'Nieuwaga',
        options: [
          {
            value: 0,
            label: 'Nieobecna',
          },
          {
            value: 1,
            label: 'Niewielka (w zakresie jednego zmysłu)',
          },
          {
            value: 2,
            label: 'Ciężka (w zakresie dwóch zmysłów)',
          },
        ],
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      const result: number = sumValues(formValues);
      let interpretation: string = '';

      if (result > 20) {
        interpretation = 'Ciężki udar.';
      } else if (result > 15 && result <= 20) {
        interpretation = 'Udar umiarkowany do ciężkiego.';
      } else if (result > 4 && result <= 15) {
        interpretation = 'Umiarkowany udar.';
      } else if (result > 0 && result <= 4) {
        interpretation = 'Niewielki udar.';
      } else {
        interpretation = 'Brak objawów udaru.';
      }

      return [result, interpretation];
    },
  },

  {
    id: 35,
    name: 'Kalkulator beztłuszczowej masy ciała',
    urlPath: '/kalkulator-beztluszczowej-masy-ciala',
    category: 'antropometria',
    description:
      'Pomaga obliczyć beztłuszczową masę ciała (LBM) na podstawie wzrostu, wagi i płci.',
    methodology: (
      <>
        <Text>
          Beztłuszczowa masa ciała (LBM – <em>Lean Body Mass</em>) to masa
          organizmu po odjęciu tkanki tłuszczowej. Jest to istotny wskaźnik w
          ocenie składu ciała, wykorzystywany do monitorowania postępów w
          redukcji masy tłuszczowej lub w budowaniu masy mięśniowej.
        </Text>

        <br />
        <Text>Wzór do obliczenia LBM jest różny dla kobiet i mężczyzn:</Text>

        <UnorderedList>
          <ListItem>
            <strong>Mężczyźni:</strong>{' '}
            <MathJax>
              {'`LBM = 0.407 \\times M + 0.267 \\times H - 19.2`'}
            </MathJax>
          </ListItem>
          <ListItem>
            <strong>Kobiety:</strong>{' '}
            <MathJax>
              {'`LBM = 0.252 \\times M + 0.473 \\times H - 48.3`'}
            </MathJax>
          </ListItem>
        </UnorderedList>

        <br />
        <Text>Gdzie:</Text>
        <UnorderedList>
          <ListItem>
            <strong>LBM</strong> – beztłuszczowa masa ciała (w kg),
          </ListItem>
          <ListItem>
            <strong>M</strong> – masa ciała (w kg),
          </ListItem>
          <ListItem>
            <strong>H</strong> – wzrost (w cm).
          </ListItem>
        </UnorderedList>

        <br />
        <Text>
          Wzory te oparte są na badaniach populacyjnych i stanowią przybliżenie,
          które może być wykorzystywane u dorosłych w celu orientacyjnego
          oszacowania beztłuszczowej masy ciała.
        </Text>
      </>
    ),
    sources: [
      {
        id: 1,
        author:
          'Omni Calculator (Mateusz Mucha, Piotr Małek, Łucja Zaborowska)',
        title: 'Kalkulator beztłuszczowej masy ciała',
        dateOfAccess: '01.07.2025',
        link: 'https://www.omnicalculator.com/pl/zdrowie/beztluszczowa-masa-ciala',
      },
    ],
    form: [
      {
        type: 'radioInput',
        name: 'gender',
        label: 'Płeć',
        options: [
          {
            value: 'female',
            label: 'Kobieta',
            hideBadge: true,
          },
          {
            value: 'male',
            label: 'Mężczyzna',
            hideBadge: true,
          },
        ],
      },
      {
        type: 'numberInput',
        name: 'height',
        label: 'Wzrost (cm)',
        min: 1,
        max: 230,
      },
      {
        type: 'numberInput',
        name: 'weight',
        label: 'Masa ciała (kg)',
        min: 1,
        max: 250,
      },
    ],
    calculateResult(formValues: Record<string, string>): [string, string] {
      const gender = formValues['gender'] as 'male' | 'female';
      const height: number = parseFloat(formValues['height']);
      const weight: number = parseFloat(formValues['weight']);

      if (!gender || !height || !weight) {
        return ['0 kg', 'Uzupełnij wszystkie dane.'];
      }

      let result: number = 0;

      if (gender === 'male') {
        result = 0.407 * weight + 0.267 * height - 19.2;
      } else {
        result = 0.252 * weight + 0.473 * height - 48.3;
      }

      const formattedResult = result.toFixed(1);

      const interpretation: string =
        result > 0 ? 'Beztłuszczowa masa ciała.' : 'Uzupełnij wszystkie dane.';

      return [`${formattedResult} kg`, interpretation];
    },
  },

  {
    id: 36,
    name: 'Skala klinicznego prawdopodobieństwa choroby wieńcowej (CAD)',
    urlPath: '/skala-prawdopodobienstwa-cad',
    category: 'kardiologia',
    description:
      'Oszacowuje prawdopodobieństwo choroby wieńcowej u pacjentów z dusznością lub bólem w klatce piersiowej.',
    methodology: (
      <>
        <Text>
          Skala klinicznego prawdopodobieństwa choroby wieńcowej (CAD – Coronary
          Artery Disease) została opracowana przez Europejskie Towarzystwo
          Kardiologiczne (ESC) i służy do oceny prawdopodobieństwa istotnej ChW
          u pacjentów z dusznością lub bólem w klatce piersiowej.
        </Text>
        <br />
        <Text>Uwzględnia:</Text>
        <UnorderedList>
          <ListItem>Charakterystykę objawów (ból/duszność),</ListItem>
          <ListItem>
            Liczbę czynników ryzyka (wywiad rodzinny, nikotynizm, dyslipidemia,
            nadciśnienie tętnicze, cukrzyca),
          </ListItem>
          <ListItem>Wiek i płeć pacjenta.</ListItem>
        </UnorderedList>
        <br />
        <Text>
          Końcowy wynik obliczany jest na podstawie tabeli prawdopodobieństwa
          CAD, która przypisuje wartości punktowe w zależności od kombinacji
          powyższych czynników. Przykładowa tabela znajduje się na stronie nr 25
          w dokumencie PDF załączonym w źródłach.
        </Text>
      </>
    ),
    sources: [
      {
        id: 1,
        author: 'Medcyna Praktyczna',
        title:
          'Oszacowanie prawdopodobieństwa przed testem (PTL) choroby wieńcowej (ChW) z istotnymi zwężeniami tętnic nasierdziowych za pomocą modelu klinicznego opartego na sile poszczególnych czynników ryzyka sercowo-naczyniowego (RF-CL)',
        dateOfAccess: '03.11.2025',
        link: 'https://www.mp.pl/interna/table/B16.2.5-2.',
      },
      {
        id: 2,
        author: 'European Society of Cardiology (ESC)',
        title:
          '2024 ESC Guidelines for the management of chronic coronary syndromes (dokument PDF)',
        dateOfAccess: '03.11.2025',
        link: 'https://icus-society.org/wp-content/uploads/2024/09/ESCCCS-2024-guideline7.pdf',
      },
    ],
    form: [
      {
        type: 'radioInput',
        name: 'gender',
        label: 'Płeć',
        options: [
          {
            value: 'female',
            hideBadge: true,
            label: 'Kobieta',
          },
          {
            value: 'male',
            hideBadge: true,
            label: 'Mężczyzna',
          },
        ],
      },
      {
        type: 'numberInput',
        name: 'age',
        label: 'Wiek (lata)',
        min: 30,
        max: 120,
      },
      {
        type: 'radioInput',
        name: 'mainSymptom',
        label: 'Główny objaw',
        options: [
          {
            value: 'dyspnoea',
            label: 'Duszność',
            hideBadge: true,
          },
          {
            value: 'painWithThreeCharacteristics',
            label:
              'Ból w klatce piersiowej z trzema cechami: \n 1) Ściskający, promieniujący za mostek, do szyi, żuchwy lub ramienia \n 2) Wysiłek lub stres jako czynniki wyzwalające \n 3) Wystąpienie w spoczynku lub w ciągu 5 min po przyjęciu azotanu',
            hideBadge: true,
          },
          {
            value: 'painWithTwoCharacteristics',
            label:
              'Ból w klatce piersiowej z dwoma z wymienionych powyżej cech',
            hideBadge: true,
          },
          {
            value: 'painWithOneCharacteristic',
            label:
              'Ból w klatce piersiowej z jedną z wymienionych powyżej cech lub bez żadnej z nich',
            hideBadge: true,
          },
        ],
      },
      {
        type: 'checkbox',
        name: 'coronaryArteryDisease',
        value: 1,
        label:
          'Choroba wieńcowa w wywiadzie rodzinnym (krewny pierwszego stopnia z wczesnymi objawami: kobieta poniżej 65 r.ż., mężczyzna poniżej 55 r.ż.)',
        hideBadge: true,
      },
      {
        type: 'checkbox',
        name: 'smoking',
        value: 1,
        label: 'Palenie papierosów (obecnie lub w przeszłości)',
        hideBadge: true,
      },
      {
        type: 'checkbox',
        name: 'dyslipidemia',
        value: 1,
        label: 'Dyslipidemia',
        hideBadge: true,
      },
      {
        type: 'checkbox',
        name: 'hypertension',
        value: 1,
        hideBadge: true,
        label: 'Nadciśnienie tętnicze',
      },
      {
        type: 'checkbox',
        name: 'diabetes',
        value: 1,
        label: 'Cukrzyca',
        hideBadge: true,
      },
    ],
    calculateResult(formValues: Record<string, string>): [number, string] {
      type Sex = 'male' | 'female';
      type AgeGroup = 30 | 40 | 50 | 60 | 70;
      type RiskFactorGroup = [number, number, number];
      type MainSymptomValue = 1 | 2 | 3;
      type CadProbabilityTable = Record<
        MainSymptomValue,
        Record<Sex, Record<AgeGroup, RiskFactorGroup>>
      >;

      const age: number = parseFloat(formValues['age']);
      const ageGroup: AgeGroup = (() => {
        let result = Math.floor((age - 30) / 10) * 10 + 30;
        if (result > 70) result = 70;
        return result;
      })() as AgeGroup;
      const gender = formValues['gender'] as 'male' | 'female';
      const mainSymptom = formValues['mainSymptom'];
      const mainSymptomValue = (() => {
        if (
          mainSymptom === 'dyspnoea' ||
          mainSymptom === 'painWithTwoCharacteristics'
        ) {
          return 2;
        } else if (mainSymptom === 'painWithThreeCharacteristics') {
          return 3;
        } else {
          return 1;
        }
      })();
      const coronaryArteryDisease: number = parseFloat(
        formValues['coronaryArteryDisease'],
      );
      const smoking: number = parseFloat(formValues['smoking']);
      const dyslipidemia: number = parseFloat(
        formValues['coronaryArteryDisease'],
      );
      const hypertension: number = parseFloat(formValues['hypertension']);
      const diabetes: number = parseFloat(formValues['diabetes']);
      const riskFactors = [
        coronaryArteryDisease,
        smoking,
        dyslipidemia,
        hypertension,
        diabetes,
      ];

      const riskFactorsSum: number = riskFactors.reduce(
        (sum, value) => sum + (isNaN(value) ? 0 : value),
        0,
      );

      const riskFactorGroup: number = (() => {
        if (riskFactorsSum <= 1) {
          return 0;
        } else if (riskFactorsSum <= 3) {
          return 1;
        } else {
          return 2;
        }
      })();

      if (!age || !gender || !mainSymptom) {
        return [0, 'Uzupełnij wszystkie dane.'];
      }

      const cadProbabilityTable: CadProbabilityTable = {
        // mainSymptomValue -> sex -> ageGroup -> riskFactorGroup -> probability %
        1: {
          female: {
            30: [0, 1, 2],
            40: [1, 1, 3],
            50: [1, 2, 5],
            60: [2, 4, 7],
            70: [4, 7, 11],
          },
          male: {
            30: [1, 2, 5],
            40: [2, 4, 8],
            50: [4, 7, 12],
            60: [8, 12, 17],
            70: [15, 19, 24],
          },
        },
        2: {
          female: {
            30: [0, 1, 3],
            40: [1, 2, 5],
            50: [2, 3, 7],
            60: [3, 6, 11],
            70: [6, 10, 16],
          },
          male: {
            30: [2, 4, 8],
            40: [3, 6, 12],
            50: [6, 11, 17],
            60: [12, 17, 25],
            70: [22, 27, 34],
          },
        },
        3: {
          female: {
            30: [2, 5, 10],
            40: [4, 7, 12],
            50: [6, 10, 15],
            60: [10, 14, 19],
            70: [16, 19, 23],
          },
          male: {
            30: [9, 14, 22],
            40: [14, 20, 27],
            50: [21, 27, 33],
            60: [32, 35, 39],
            70: [44, 44, 45],
          },
        },
      };

      const result: number =
        cadProbabilityTable[mainSymptomValue as MainSymptomValue][
          gender as Sex
        ][ageGroup as AgeGroup][riskFactorGroup];

      let interpretation: string = '';

      if (result <= 5) {
        interpretation = 'Bardzo niskie prawdopodobieństwo choroby wieńcowej.';
      } else if (result <= 15) {
        interpretation = 'Niskie prawdopodobieństwo choroby wieńcowej.';
      } else {
        interpretation = 'Umiarkowane prawdopodobieństwo choroby wieńcowej.';
      }

      return [result, interpretation];
    },
  },
];
