import { sumInputValues } from '../functions/sumInputValues'

export interface Calculator {
	id: number
	name: string
	link: string
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
		link: 'kalkulator-bmi',
		category: 'antropometria',
		description:
			'Oblicza wskaźnik masy ciała (BMI) i pomaga określić, czy masa ciała danej osoby jest w normie, zbyt niska czy zbyt wysoka w stosunku do wzrostu.',
		methodology:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus reiciendis aperiam placeat nobis, dolorum laborum, nemo, eos quidem esse ducimus expedita amet repellendus nesciunt enim. Quae pariatur numquam aliquam doloremque.',
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
		link: 'skala-cha2ds2-vasc',
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
		link: 'skala-centora-mcisaaca',
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
		link: 'ocena-zakrzepicy-wellsa',
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
		link: '/kalkulator-liczby-opakowan-na-okres',
		category: 'dawkowanie leków',
		description:
			'Oblicza liczbę opakowań leku, którą należy przepisać na podstawie dawkowania.',
		methodology:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae reiciendis in perferendis dignissimos eaque consequatur quod asperiores iure vel at!',
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
					max: 100,
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
		link: 'obliczanie-dawki-paracetamolu',
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
					max: 100,
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
		link: 'skala-has-bled',
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
		link: 'skala-glasgow',
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
		link: 'kwestionariusz-phq9',
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
		link: 'kalkulator-qtc-bazetta',
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
					max: 1000,
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
		link: 'wskaznik-maddreya',
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
					min: 1,
					max: 1000,
				},
				{
					id: 'controlTime',
					text: 'Czas protrombinowy prawidłowy (s)',
					min: 1,
					max: 1000,
				},
				{
					id: 'bilirubin',
					text: 'Stężenie bilirubiny całkowitej (mg/dl)',
					min: 1,
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
		link: 'obliczanie-dawki-ibuprofenu',
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
					max: 100,
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

	// 	calculateResult: function () {},

	// 	interpretResult: function (result: number) {},
	// },
]

export const categories: string[] = (() => {
	let categoryArray: string[] = []

	calculators.forEach(calculator => {
		if (!categoryArray.includes(calculator.category))
			categoryArray.push(calculator.category)
	})

	return categoryArray.sort()
})()

export const sortedCalculators = calculators.sort(
	(a: Calculator, b: Calculator) => {
		const keyA = a.name.toLowerCase()
		const keyB = b.name.toLowerCase()
		if (keyA < keyB) return -1
		if (keyA > keyB) return 1
		return 0
	}
)
