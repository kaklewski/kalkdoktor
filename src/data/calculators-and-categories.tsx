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
				name: 'Badanie BMI – Narodowy Instytut Kardiologii',
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

		calculateResult: function (setResult: (value: number) => void) {
			const bodyMass = parseInt(
				(document.getElementById('bodyMass') as HTMLInputElement).value
			)
			const height =
				parseInt(
					(document.getElementById('height') as HTMLInputElement)
						.value
				) / 100
			let sum: number = parseInt(
				(bodyMass / (height * height)).toFixed(2)
			)

			if (Number.isNaN(sum)) sum = 0

			setResult(sum)
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
			'Ocenia ryzyko wystąpienia powikłań zakrzepowo–zatorowych u pacjentów z migotaniem przedsionków.',
		methodology: null,
		sources: [
			{
				id: 1,
				name: 'CHA₂DS₂-VASc Score for Atrial Fibrillation Stroke Risk – MDCalc',
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
							text: '65 – 74 lata',
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
				name: 'Tabela 3.3-1. Skala Centora w modyfikacji McIsaaca – Medycyna Praktyczna',
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
							text: '3 – 14 lat',
						},
						{
							id: 2,
							value: 0,
							text: '15 – 44 lata',
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
				name: 'Ocena prawdopodobieństwa klinicznego ZŻG w skali Wellsa – Medycyna Praktyczna',
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
			const numberOfPackages = Math.round(
				(amountPerIntake * numberOfIntakes * daysOfUse) / packageSize
			)
			setResult(numberOfPackages)
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
		methodology: 'Lorem ipsum',
		sources: [
			{
				id: 1,
				name: 'Paracetamol – Medycyna Praktyczna',
				link: 'https://www.mp.pl/pacjent/leki/subst.html?id=643',
			},
			{
				id: 2,
				name: 'Paracetamol Dosage Calculator - Omni Calculator',
				link: 'https://www.omnicalculator.com/health/paracetamol-dosage',
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

		calculateResult: function (setResult: (value: number) => void) {
			const age = parseInt(
				(document.getElementById('age') as HTMLInputElement).value
			)
			const weight = parseInt(
				(document.getElementById('weight') as HTMLInputElement).value
			)

			let calculatedDosage: number = (60 * weight) / 1000

			if (age <= 12 && calculatedDosage > 2) calculatedDosage = 2
			if (calculatedDosage > 4) calculatedDosage = 4

			setResult(calculatedDosage)
		},

		interpretResult: function (result: number) {
			if (result === 0) return 'Uzupełnij wszystkie informacje.'
			return 'Maksymalna dobowa dawka paracetamolu, w gramach.'
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
				name: 'Tabela 2.6-8. Skala HAS-BLED do oceny ryzyka krwawienia u chorych z migotaniem przedsionków – Medycyna Praktyczna',
				link: 'https://www.mp.pl/interna/table/016_4938',
			},
			{
				id: 2,
				name: 'HAS-BLED Score for Major Bleeding Risk – MDCalc',
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
					text: 'Nieprawidłowa funkcja wątroby: przewlekła choroba wątroby lub cechy biochemiczne istotnego uszkodzenia wątroby',
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
				name: 'Tabela 1.34-2. Skala Glasgow – Medycyna Praktyczna',
				link: 'https://www.mp.pl/interna/table/B16.1.33-2.',
			},
			{
				id: 2,
				name: 'Skala Glasgow - ocena stopnia przytomności u dorosłych – remedium.md',
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

	// {
	// 	id: ,
	// 	name: '',
	// 	link: '',
	// 	category: '',
	// 	description: '',
	// 	methodology: '',
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
