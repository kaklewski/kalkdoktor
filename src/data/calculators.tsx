import { sumInputValues } from '../utils/sumInputValues'

export interface Calculator {
	id: number
	name: string
	urlPath: string
	category: string
	description: string
	methodology: string | null
	sources: {
		id: number
		name: string
		link: string
	}[]
	fields: {
		numberInputs:
			| {
					id: string | number
					text: string
					min: number
					max: number
			  }[]
			| null
		checkboxes:
			| {
					id: string | number
					value: number
					text: string
			  }[]
			| null
		radioGroups:
			| {
					id: string | number
					text: string
					radios: {
						id: string | number
						value: number
						text: string
					}[]
			  }[]
			| null
	}
	resultUnit: string | null
	calculateResult: (setResult: (value: number) => void) => void
	interpretResult: (result: number) => string
}

export const calculators: Calculator[] = [
	{
		id: 1,
		name: 'Kalkulator BMI',
		urlPath: 'kalkulator-bmi',
		category: 'antropometria',
		description:
			'Oblicza wskaźnik masy ciała (BMI) i pomaga określić, czy masa ciała danej osoby jest w normie, zbyt niska czy zbyt wysoka w stosunku do wzrostu.',
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Narodowy Instytut Kardiologii, Badanie BMI, dostęp: 20.09.2024',
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

		calculateResult: function (setResult: (value: number) => void) {
			const bodyMass = parseFloat(
				(document.getElementById('bodyMass') as HTMLInputElement).value
			)
			const height =
				parseFloat(
					(document.getElementById('height') as HTMLInputElement)
						.value
				) / 100
			const result: number = Math.round(bodyMass / (height * height))
			setResult(result)
		},

		interpretResult: function (result: number) {
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
				name: 'MDCalc, CHA₂DS₂-VASc Score for Atrial Fibrillation Stroke Risk, dostęp: 20.09.2024',
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
							id: 'man',
							value: 0,
							text: 'Mężczyzna',
						},
						{
							id: 'woman',
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

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
			const sexCheckbox = document.getElementById(
				'man'
			) as HTMLInputElement
			const isMan = sexCheckbox ? sexCheckbox.checked : true

			const lowRisk: string =
				'Niskie ryzyko powikłań. Nie zaleca się leczenia.'
			const mediumRisk: string =
				'Umiarkowane ryzyko powikłań. Należy rozważyć doustny antykoagulant.'
			const highRisk: string =
				'Wysokie ryzyko powikłań. Należy zastosować doustny antykoagulant.'

			if (isMan) {
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
		category: 'pediatria',
		description:
			'Szacuje ryzyko zapalenia paciorkowcowego (PBHA) i dobrać odpowiednie postępowanie.',
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Medycyna Praktyczna, Tabela 3.3-1. Skala Centora w modyfikacji McIsaaca, dostęp: 20.09.2024',
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
					id: 1,
					text: 'Wiek',
					radios: [
						{
							id: 1,
							value: 1,
							text: '3 - 14 lat',
						},
						{
							id: 2,
							value: 0,
							text: '15 - 44 lata',
						},
						{
							id: 3,
							value: -1,
							text: '45 lat lub więcej',
						},
					],
				},
			],
		},
		resultUnit: null,

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
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
				name: 'Medycyna Praktyczna, Ocena prawdopodobieństwa klinicznego ZŻG w skali Wellsa, dostęp: 20.09.2024',
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

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
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
		urlPath: '/kalkulator-liczby-opakowan-na-okres',
		category: 'dawkowanie leków',
		description:
			'Oblicza liczbę opakowań leku, którą należy przepisać na podstawie dawkowania.',
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Opracowanie własne.',
				link: '',
			},
		],
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

		calculateResult: function (setResult: (value: number) => void) {
			const amountPerIntake = parseFloat(
				(document.getElementById('amountPerIntake') as HTMLInputElement)
					.value
			)
			const numberOfIntakes = parseFloat(
				(document.getElementById('numberOfIntakes') as HTMLInputElement)
					.value
			)
			const daysOfUse = parseFloat(
				(document.getElementById('daysOfUse') as HTMLInputElement).value
			)
			const packageSize = parseFloat(
				(document.getElementById('packageSize') as HTMLInputElement)
					.value
			)
			const result = Math.round(
				(amountPerIntake * numberOfIntakes * daysOfUse) / packageSize
			)
			setResult(result)
		},

		interpretResult: function () {
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
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Medycyna Praktyczna, Paracetamol (Portal lekarzy), dostęp: 20.09.2024',
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

		calculateResult: function (setResult: (value: number) => void) {
			const age = parseFloat(
				(document.getElementById('age') as HTMLInputElement).value
			)
			const weight = parseFloat(
				(document.getElementById('weight') as HTMLInputElement).value
			)
			let result: number = (60 * weight) / 1000
			if (age <= 12 && result > 2) result = 2
			if (result > 4) result = 4
			setResult(result)
		},

		interpretResult: function (result: number) {
			if (result === 0) return 'Uzupełnij wszystkie informacje.'
			return 'Maksymalna dobowa dawka paracetamolu.'
		},
	},

	{
		id: 7,
		name: 'Skala HAS-BLED',
		urlPath: 'skala-has-bled',
		category: 'kardiologia',
		description:
			'Szacuje ryzyko poważnego krwawienia u pacjentów z migotaniem przedsionków.',
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Medycyna Praktyczna, Tabela 2.6-8. Skala HAS-BLED do oceny ryzyka krwawienia u chorych z migotaniem przedsionków, dostęp: 20.09.2024',
				link: 'https://www.mp.pl/interna/table/016_4938',
			},
			{
				id: 2,
				name: 'MDCalc, HAS-BLED Score for Major Bleeding Risk, dostęp: 20.09.2024',
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

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
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
				name: 'Medycyna Praktyczna, Tabela 1.34-2. Skala Glasgow, dostęp: 20.09.2024',
				link: 'https://www.mp.pl/interna/table/B16.1.33-2.',
			},
			{
				id: 2,
				name: 'remedium.md, Skala Glasgow - ocena stopnia przytomności u dorosłych, dostęp: 20.09.2024',
				link: 'https://remedium.md/kalkulatory/neurologia/skala-glasgow-ocena-stopnia-przytomno%C5%9Bci-u-doros%C5%82ych',
			},
		],
		fields: {
			numberInputs: null,
			checkboxes: null,
			radioGroups: [
				{
					id: 1,
					text: 'Otwieranie oczu',
					radios: [
						{
							id: 1,
							value: 4,
							text: 'Spontaniczne',
						},
						{
							id: 2,
							value: 3,
							text: 'Na polecenie',
						},
						{
							id: 3,
							value: 2,
							text: 'W odpowiedzi na bodziec bólowy',
						},
						{
							id: 4,
							value: 1,
							text: 'Nie otwiera oczu',
						},
					],
				},
				{
					id: 2,
					text: 'Odpowiedź słowna',
					radios: [
						{
							id: 1,
							value: 5,
							text: 'Prawidłowa, pacjent jest w pełni zorientowany',
						},
						{
							id: 2,
							value: 4,
							text: 'Odpowiada, ale jest zdezorientowany',
						},
						{
							id: 3,
							value: 3,
							text: 'Używa niewłaściwych słów',
						},
						{
							id: 4,
							value: 2,
							text: 'Wydaje nieartykułowane dźwięki',
						},
						{
							id: 5,
							value: 1,
							text: 'Brak reakcji',
						},
					],
				},
				{
					id: 3,
					text: 'Reakcja ruchowa',
					radios: [
						{
							id: 1,
							value: 6,
							text: 'Na polecenie',
						},
						{
							id: 2,
							value: 5,
							text: 'Potrafi umiejscowić bodziec bólowy',
						},
						{
							id: 3,
							value: 4,
							text: 'Prawidłowa reakcja zgięciowa (wycofanie w odpowiedzi na bodziec bólowy)',
						},
						{
							id: 4,
							value: 3,
							text: 'Nieprawidłowa reakcja zgięciowa (odkorowanie)',
						},
						{
							id: 5,
							value: 2,
							text: 'Reakcja wyprostna (sztywność odmóżdżeniowa)',
						},
						{
							id: 6,
							value: 1,
							text: 'Brak reakcji',
						},
					],
				},
			],
		},
		resultUnit: null,

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
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
				name: 'PHQ-9, dostęp: 20.09.2024',
				link: 'https://www.phq9.pl/',
			},
			{
				id: 2,
				name: 'ECFS.eu, Microsoft Word - PHQ9_Polish for Poland.doc, dostęp: 20.09.2024',
				link: 'https://www.ecfs.eu/sites/default/files/general-content-files/working-groups/Mental%20Health/PHQ9_Polish%20for%20Poland.pdf',
			},
		],
		fields: {
			numberInputs: null,
			checkboxes: null,
			radioGroups: [
				{
					id: 1,
					text: 'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi niewielkie zainteresowanie lub odczuwanie przyjemności z wykonywania czynności',
					radios: [
						{
							id: 1,
							value: 0,
							text: 'Wcale nie dokuczało',
						},
						{
							id: 2,
							value: 1,
							text: 'Kilka dni',
						},
						{
							id: 3,
							value: 2,
							text: 'Więcej niż połowę dni',
						},
						{
							id: 4,
							value: 3,
							text: 'Niemal codziennie',
						},
					],
				},
				{
					id: 2,
					text: 'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi uczucie smutku, przygnębienia lub beznadziejności',
					radios: [
						{
							id: 1,
							value: 0,
							text: 'Wcale nie dokuczało',
						},
						{
							id: 2,
							value: 1,
							text: 'Kilka dni',
						},
						{
							id: 3,
							value: 2,
							text: 'Więcej niż połowę dni',
						},
						{
							id: 4,
							value: 3,
							text: 'Niemal codziennie',
						},
					],
				},
				{
					id: 3,
					text: 'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi kłopoty z zaśnięciem, przerywany sen albo zbyt długi sen',
					radios: [
						{
							id: 1,
							value: 0,
							text: 'Wcale nie dokuczały',
						},
						{
							id: 2,
							value: 1,
							text: 'Kilka dni',
						},
						{
							id: 3,
							value: 2,
							text: 'Więcej niż połowę dni',
						},
						{
							id: 4,
							value: 3,
							text: 'Niemal codziennie',
						},
					],
				},
				{
					id: 4,
					text: 'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi uczucie zmęczenia lub brak energii',
					radios: [
						{
							id: 1,
							value: 0,
							text: 'Wcale nie dokuczało',
						},
						{
							id: 2,
							value: 1,
							text: 'Kilka dni',
						},
						{
							id: 3,
							value: 2,
							text: 'Więcej niż połowę dni',
						},
						{
							id: 4,
							value: 3,
							text: 'Niemal codziennie',
						},
					],
				},
				{
					id: 5,
					text: 'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi brak apetytu lub przejadanie się',
					radios: [
						{
							id: 1,
							value: 0,
							text: 'Wcale nie dokuczały',
						},
						{
							id: 2,
							value: 1,
							text: 'Kilka dni',
						},
						{
							id: 3,
							value: 2,
							text: 'Więcej niż połowę dni',
						},
						{
							id: 4,
							value: 3,
							text: 'Niemal codziennie',
						},
					],
				},
				{
					id: 6,
					text: 'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi poczucie niezadowolenia z siebie lub uczucie, że jest do niczego albo że zawiódł/zawiodła siebie lub rodzinę',
					radios: [
						{
							id: 1,
							value: 0,
							text: 'Wcale nie dokuczało',
						},
						{
							id: 2,
							value: 1,
							text: 'Kilka dni',
						},
						{
							id: 3,
							value: 2,
							text: 'Więcej niż połowę dni',
						},
						{
							id: 4,
							value: 3,
							text: 'Niemal codziennie',
						},
					],
				},
				{
					id: 7,
					text: 'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi problemy ze skupieniem się, na przykład przy czytaniu gazety lub oglądaniu telewizji',
					radios: [
						{
							id: 1,
							value: 0,
							text: 'Wcale nie dokuczały',
						},
						{
							id: 2,
							value: 1,
							text: 'Kilka dni',
						},
						{
							id: 3,
							value: 2,
							text: 'Więcej niż połowę dni',
						},
						{
							id: 4,
							value: 3,
							text: 'Niemal codziennie',
						},
					],
				},
				{
					id: 8,
					text: 'Jak często w ciągu ostatnich 2 tygodni dokuczało pacjentowi spowolnienie albo niemożność usiedzenia w miejscu lub podenerwowanie powodujące ruchliwość znacznie większą niż zwykle',
					radios: [
						{
							id: 1,
							value: 0,
							text: 'Wcale nie dokuczało',
						},
						{
							id: 2,
							value: 1,
							text: 'Kilka dni',
						},
						{
							id: 3,
							value: 2,
							text: 'Więcej niż połowę dni',
						},
						{
							id: 4,
							value: 3,
							text: 'Niemal codziennie',
						},
					],
				},
				{
					id: 9,
					text: 'Jak często w ciągu ostatnich 2 tygodni dokuczały pacjentowi myśli, że lepiej byłoby umrzeć albo chęć zrobienia sobie jakiejś krzywdy',
					radios: [
						{
							id: 1,
							value: 0,
							text: 'Wcale nie dokuczały',
						},
						{
							id: 2,
							value: 1,
							text: 'Kilka dni',
						},
						{
							id: 3,
							value: 2,
							text: 'Więcej niż połowę dni',
						},
						{
							id: 4,
							value: 3,
							text: 'Niemal codziennie',
						},
					],
				},
			],
		},
		resultUnit: null,

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
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
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Medycyna i Statystyka, Skorygowany odstęp QT (QTc), dostęp: 20.09.2024',
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

		calculateResult: function (setResult: (value: number) => void) {
			const qtInterval: number = parseFloat(
				(document.getElementById('qtInterval') as HTMLInputElement)
					.value
			)
			const heartRate: number = parseFloat(
				(document.getElementById('heartRate') as HTMLInputElement).value
			)
			const rr: number = 60 / heartRate
			const result: number = qtInterval / Math.sqrt(rr)
			setResult(result)
		},

		interpretResult: function (result: number) {
			if (result === 0) return 'Uzupełnij wszystkie informacje.'
			return 'Skorygowany odstęp QTc.'
		},
	},

	{
		id: 11,
		name: 'Wskaźnik Maddreya',
		urlPath: 'wskaznik-maddreya',
		category: 'hepatologia',
		description:
			'Określa ryzyko zgonu u chorych z alkoholowym zapaleniem wątroby.',
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Wikipedia, Wskaźnik Maddreya, dostęp: 20.09.2024',
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

		calculateResult: function (setResult: (value: number) => void) {
			const prothrombinTime: number = parseFloat(
				(document.getElementById('prothrombinTime') as HTMLInputElement)
					.value
			)
			const controlTime: number = parseFloat(
				(document.getElementById('controlTime') as HTMLInputElement)
					.value
			)
			const bilirubin: number = parseFloat(
				(document.getElementById('bilirubin') as HTMLInputElement).value
			)
			const result: number =
				(prothrombinTime - controlTime) * 4.6 + bilirubin
			setResult(result)
		},

		interpretResult: function (result: number) {
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
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Medycyna Praktyczna, Deksibuprofen (Portal lekarzy), dostęp: 20.09.2024',
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

		calculateResult: function (setResult: (value: number) => void) {
			const age = parseFloat(
				(document.getElementById('age') as HTMLInputElement).value
			)
			const weight = parseFloat(
				(document.getElementById('weight') as HTMLInputElement).value
			)
			let result: number
			if (age <= 12) {
				result = (30 * weight) / 1000
			} else {
				result = 3.2
			}
			setResult(result)
		},

		interpretResult: function (result: number) {
			if (result === 0) return 'Uzupełnij wszystkie informacje.'
			return 'Maksymalna dobowa dawka ibuprofenu.'
		},
	},

	{
		id: 13,
		name: 'Skala PESI',
		urlPath: 'skala-pesi',
		category: 'kardiologia',
		description:
			'Prognozuje wynik leczenia pacjentów z zatorowością płucną.',
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Medycyna Praktyczna, Tabela 2.33-7. Ocena rokowania w zatorowości płucnej, dostęp: 26.09.2024',
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
		resultUnit: '',

		calculateResult: function (setResult: (value: number) => void) {
			const age = parseFloat(
				(document.getElementById('age') as HTMLInputElement).value
			)
			const inputs = document.querySelectorAll('input')
			let sum: number = age

			inputs.forEach(input => {
				if (input.checked) sum += parseInt(input.value)
			})

			setResult(sum)
		},

		interpretResult: function (result: number) {
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
				name: 'Medycyna Praktyczna, Tabela 2.33-9. Ocena prawdopodobieństwa klinicznego ZP wg zmodyfikowanej skali genewskiej, dostęp: 30.09.2024',
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
					id: 1,
					text: 'Tętno',
					radios: [
						{
							id: 1,
							value: 0,
							text: 'Poniżej 75',
						},
						{
							id: 2,
							value: 3,
							text: '75 - 94',
						},
						{
							id: 3,
							value: 5,
							text: '95 lub więcej',
						},
					],
				},
			],
		},
		resultUnit: '',

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
			if (result >= 11)
				return 'Duże prawdopodobieństwo kliniczne zatorowości płucnej.'
			if (result >= 4)
				return 'Pośrednie prawdopodobieństwo kliniczne zatorowości płucnej.'
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
				name: 'Medycyna Praktyczna, Rycina 3.13-2. Ocena ciężkości pozaszpitalnego zapalenia płuc u chorych w szpitalu – skala CURB-65, dostęp: 30.09.2024',
				link: 'https://www.mp.pl/interna/image/B16.016_8678.',
			},
			{
				id: 2,
				name: 'Wikipedia, Skala CURB-65, dostęp: 30.09.2024',
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
		resultUnit: '',

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
			if (result >= 3)
				return 'PZP ciężkie. Pacjent wymaga leczenia w szpitalu. Rozważ leczenie na oddziale intensywnej terapii.'
			if (result === 2)
				return 'PZP umiarkowane. Zaleca się przyjęcie pacjenta do szpitala.'
			return 'PZP lekkie. Pacjent może być leczony w domu, jeśli nie ma innych wskazań do hospitalizacji.'
		},
	},

	{
		id: 16,
		name: 'Kalkulator WHR (Waist-Hip Ratio)',
		urlPath: 'kalkulator-whr',
		category: 'antropometria',
		description: 'Oblicza stosunek obwodu talii do bioder.',
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Wikipedia, Waist–hip ratio: dostęp: 30.09.2024',
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
							id: 'woman',
							value: 0.85,
							text: 'Kobieta',
						},
						{
							id: 'man',
							value: 0,
							text: 'Mężczyzna',
						},
					],
				},
			],
		},
		resultUnit: '',

		calculateResult: function (setResult: (value: number) => void) {
			const waist = parseFloat(
				(document.getElementById('waist') as HTMLInputElement).value
			)
			const hips = parseFloat(
				(document.getElementById('hips') as HTMLInputElement).value
			)
			const result = waist / hips
			setResult(result)
		},

		interpretResult: function (result: number) {
			const sexCheckbox = document.getElementById(
				'man'
			) as HTMLInputElement
			const isMan = sexCheckbox ? sexCheckbox.checked : true

			if (isMan) {
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
		description:
			'Identyfikuje pacjentów o wysokim ryzyku zgonu z powodu sepsy.',
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'MDCalc, qSOFA (Quick SOFA) Score for Sepsis, dostęp: 30.09.2024',
				link: 'https://www.mdcalc.com/calc/2654/qsofa-quick-sofa-score-sepsis',
			},
			{
				id: 2,
				name: 'Medycyna i Statystyka, Uproszczona skala SOFA (qSOFA), dostęp: 30.09.2024',
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
		resultUnit: '',

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
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
				name: 'Medycyna Praktyczna, Tabela 3.22-2. Kwestionariusz oceny uzależnienia od nikotyny wg Fagerströma, dostęp: 01.10.2024',
				link: 'https://www.mp.pl/interna/table/B16.3.23-2.',
			},
		],
		fields: {
			numberInputs: null,
			checkboxes: null,
			radioGroups: [
				{
					id: 1,
					text: 'Kiedy po przebudzeniu zapalasz pierwszego papierosa',
					radios: [
						{
							id: 1,
							value: 3,
							text: 'Do 5 minut',
						},
						{
							id: 2,
							value: 2,
							text: 'Od 6 do 30 minut',
						},
						{
							id: 3,
							value: 1,
							text: 'Od 31 do 60 minut',
						},
						{
							id: 4,
							value: 0,
							text: 'Po 60 minutach',
						},
					],
				},
				{
					id: 2,
					text: 'Czy masz trudności z powstrzymaniem się od palenia w miejscach, gdzie jest to zabronione',
					radios: [
						{
							id: 1,
							value: 1,
							text: 'Tak',
						},
						{
							id: 2,
							value: 0,
							text: 'Nie',
						},
					],
				},
				{
					id: 3,
					text: 'Z którego papierosa jest Ci najtrudniej zrezygnować',
					radios: [
						{
							id: 1,
							value: 1,
							text: 'Z pierwszego rano',
						},
						{
							id: 2,
							value: 0,
							text: 'Z każdego innego',
						},
					],
				},
				{
					id: 4,
					text: 'Ile papierosów wypalasz dziennie',
					radios: [
						{
							id: 1,
							value: 0,
							text: '10 lub mniej',
						},
						{
							id: 2,
							value: 1,
							text: 'Od 11 do 20',
						},
						{
							id: 3,
							value: 2,
							text: 'Od 21 do 30',
						},
						{
							id: 4,
							value: 3,
							text: '31 lub więcej',
						},
					],
				},
				{
					id: 5,
					text: 'Czy rano palisz więcej papierosów niż w ciągu dnia',
					radios: [
						{
							id: 1,
							value: 1,
							text: 'Tak',
						},
						{
							id: 2,
							value: 0,
							text: 'Nie',
						},
					],
				},
				{
					id: 6,
					text: 'Czy palisz papierosy nawet podczas choroby, gdy musisz leżeć w łóżku',
					radios: [
						{
							id: 1,
							value: 1,
							text: 'Tak',
						},
						{
							id: 2,
							value: 0,
							text: 'Nie',
						},
					],
				},
			],
		},
		resultUnit: '',

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
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
				name: 'Medycyna Praktyczna, Tabela 2.19-1. Klasyfikacja niewydolności serca wg New York Heart Association, dostęp: 01.10.2024',
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
		resultUnit: '',

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
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
				name: 'Medycyna Praktyczna, Tabela 2.5-1. Klasyfikacja dławicy piersiowej na podstawie jej nasilenia wg Canadian Cardiovascular Society (CCS), dostęp: 01.10.2024',
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
		resultUnit: '',

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
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
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'National Kidney Foundation, Cockcroft-Gault Formula, dostęp: 02.10.2024',
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
							id: 'woman',
							value: 0.85,
							text: 'Kobieta',
						},
						{
							id: 'man',
							value: 1,
							text: 'Mężczyzna',
						},
					],
				},
			],
		},
		resultUnit: 'ml/min',

		calculateResult: function (setResult: (value: number) => void) {
			const age = parseFloat(
				(document.getElementById('age') as HTMLInputElement).value
			)
			const weight = parseFloat(
				(document.getElementById('weight') as HTMLInputElement).value
			)
			const creatinine = parseFloat(
				(document.getElementById('creatinine') as HTMLInputElement)
					.value
			)
			const sexCheckbox = document.getElementById(
				'woman'
			) as HTMLInputElement
			const isWoman = sexCheckbox ? sexCheckbox.checked : true

			let result = ((140 - age) * weight) / (creatinine * 72)
			if (isWoman) result = result * 0.85

			setResult(result)
		},

		interpretResult: function (result: number) {
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
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'Medycyna Praktyczna, Kalkulator FIB-4, dostęp: 03.10.2024',
				link: 'https://www.mp.pl/gastrologia/skale/300695,fib-4',
			},
			{
				id: 2,
				name: 'remedium.md, Wskaźnik FIB-4, dostęp: 03.10.2024',
				link: 'https://remedium.md/kalkulatory/hepatologia/wska%C5%BAnik-fib-4-ocena-prawdopodobie%C5%84stwa-zw%C5%82%C3%B3knienia-w%C4%85troby',
			},
			{
				id: 3,
				name: 'Hepatitis C Online, Fibrosis-4 (FIB-4) Calculator, dostęp: 03.10.2024',
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
		resultUnit: '',

		calculateResult: function (setResult: (value: number) => void) {
			const age = parseFloat(
				(document.getElementById('age') as HTMLInputElement).value
			)
			const alt = parseFloat(
				(document.getElementById('alt') as HTMLInputElement).value
			)
			const ast = parseFloat(
				(document.getElementById('ast') as HTMLInputElement).value
			)
			const platelet = parseFloat(
				(document.getElementById('platelet') as HTMLInputElement).value
			)

			const result = (age * ast) / (platelet * Math.sqrt(alt))
			setResult(result)
		},

		interpretResult: function (result: number) {
			if (result === 0) return 'Uzupełnij wszystkie informacje.'
			if (result > 3.25)
				return 'Duże prawdopodobieństwo zaawansowanego włóknienia.'
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
				name: 'Medycyna Praktyczna, Tabela 7.12-1. Klasyfikacja Childa (zmodyfikowana przez Pugha) niewydolności wątroby, dostęp: 03.10.2024',
				link: 'https://www.mp.pl/interna/table/B16.7.12-1.',
			},
		],
		fields: {
			numberInputs: null,
			checkboxes: null,
			radioGroups: [
				{
					id: 1,
					text: 'Encefalopatia',
					radios: [
						{
							id: 1,
							value: 1,
							text: 'Nie ma',
						},
						{
							id: 2,
							value: 2,
							text: 'Stopień 1–2',
						},
						{
							id: 3,
							value: 3,
							text: 'Stopień 3–4',
						},
					],
				},
				{
					id: 2,
					text: 'Wodobrzusze',
					radios: [
						{
							id: 1,
							value: 1,
							text: 'Nie ma',
						},
						{
							id: 2,
							value: 2,
							text: 'Umiarkowane',
						},
						{
							id: 3,
							value: 3,
							text: 'Napięte',
						},
					],
				},
				{
					id: 3,
					text: 'Stężenie bilirubiny',
					radios: [
						{
							id: 1,
							value: 1,
							text: 'Poniżej 2mg/dl (34.2 µmol/l)',
						},
						{
							id: 2,
							value: 2,
							text: '2-3mg/dl (34.2-51.3 µmol/l)',
						},
						{
							id: 3,
							value: 3,
							text: 'Ponad 3mg/dl (51.3 µmol/l)',
						},
					],
				},
				{
					id: 4,
					text: 'Stężenie albuminy',
					radios: [
						{
							id: 1,
							value: 1,
							text: 'Powyżej 3.5 g/dl (35 g/l)',
						},
						{
							id: 2,
							value: 2,
							text: '2.8-3.5 g/dl (28-35 g/l)',
						},
						{
							id: 3,
							value: 3,
							text: 'Poniżej 2.8 g/dl (28 g/l)',
						},
					],
				},
				{
					id: 5,
					text: 'Czas protrombinowy / INR',
					radios: [
						{
							id: 1,
							value: 1,
							text: 'Poniżej 5 / 1,70',
						},
						{
							id: 2,
							value: 2,
							text: '5–10 / 1,70–2,20',
						},
						{
							id: 3,
							value: 3,
							text: 'Ponad 10 / 2,20',
						},
					],
				},
			],
		},
		resultUnit: '',

		calculateResult: sumInputValues,

		interpretResult: function (result: number) {
			if (result === 0) return 'Uzupełnij wszystkie informacje.'
			if (result >= 10)
				return 'Klasa C. Są wskazania do przeszczepu wątroby.'
			if (result >= 7)
				return 'Klasa B. Są wskazania do przeszczepu wątroby.'
			return 'Klasa A. Nie ma wskazań do przeszczepu wątroby.'
		},
	},

	// {
	// 	id: ,
	// 	name: '',
	// 	link: '',
	// 	category: '',
	// 	description: '',
	// 	methodology: null,
	// 	sources: [
	// 		{
	// 			id: 1,
	// 			name: '',
	// 			link: '',
	// 		},
	// 	],
	// 	fields: {
	// 		numberInputs: null,
	// 		checkboxes: null,
	// 		radioGroups: null,
	// 	},
	// resultUnit: '',

	// 	calculateResult: function (setResult: (value: number) => void) {},

	// 	interpretResult: function (result: number) {},
	// },
]
