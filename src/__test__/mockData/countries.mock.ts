import type { ICountry } from '@/interfaces';

export const mockCountries: ICountry[] = [
  {
    name: {
      common: 'Test Country',
      official: 'Official Test Country',
      nativeName: {
        spa: {
          common: 'common-spa-name',
          official: 'official-spa-name',
        },
      },
    },
    flags: { png: 'test-flag.png', alt: 'Test flag', svg: 'test-flag.png' },
    capital: ['Test Capital'],
    area: 100000,
  },
  {
    name: {
      common: 'Test Country 2',
      official: 'Official Test Country 2',
      nativeName: {
        spa: {
          common: 'common-spa-name 2',
          official: 'official-spa-name 2',
        },
      },
    },
    flags: {
      png: 'test-flag-2.png',
      alt: 'Test flag 2',
      svg: 'test-flag-2.png',
    },
    capital: ['Test Capital 2'],
    area: 100000,
  },
  {
    name: {
      common: 'Test Country 3',
      official: 'Official Test Country 3',
      nativeName: {
        spa: {
          common: 'common-spa-name-3',
          official: 'official-spa-name-3',
        },
      },
    },
    flags: {
      png: 'test-flag-3.png',
      alt: 'Test flag 3',
      svg: 'test-flag-3.png',
    },
    capital: ['Test Capital 3'],
    area: 100000,
  },
];
export const longListOfMockCountries: ICountry[] = [
  {
    flags: {
      png: 'https://flagcdn.com/w320/li.png',
      svg: 'https://flagcdn.com/li.svg',
      alt: 'The flag of Liechtenstein is composed of two equal horizontal bands of blue and red, with a golden-yellow crown on the hoist side of the blue band.',
    },
    name: {
      common: 'Liechtenstein',
      official: 'Principality of Liechtenstein',
      nativeName: {
        deu: {
          official: 'Fürstentum Liechtenstein',
          common: 'Liechtenstein',
        },
      },
    },
    capital: ['Vaduz'],
    area: 160,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ru.png',
      svg: 'https://flagcdn.com/ru.svg',
      alt: 'The flag of Russia is composed of three equal horizontal bands of white, blue and red.',
    },
    name: {
      common: 'Russia',
      official: 'Russian Federation',
      nativeName: {
        rus: {
          official: 'Российская Федерация',
          common: 'Россия',
        },
      },
    },
    capital: ['Moscow'],
    area: 17098242,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/gy.png',
      svg: 'https://flagcdn.com/gy.svg',
      alt: 'The flag of Guyana has a green field with two isosceles triangles which share a common base on the hoist end. The smaller black-edged red triangle spanning half the width of the field is superimposed on the larger white-edged yellow triangle which spans the full width of the field.',
    },
    name: {
      common: 'Guyana',
      official: 'Co-operative Republic of Guyana',
      nativeName: {
        eng: {
          official: 'Co-operative Republic of Guyana',
          common: 'Guyana',
        },
      },
    },
    capital: ['Georgetown'],
    area: 214969,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/cv.png',
      svg: 'https://flagcdn.com/cv.svg',
      alt: 'The flag of Cape Verde is composed of five horizontal bands of blue, white, red, white and blue in the ratio of 6:1:1:1:3. A ring of ten five-pointed yellow stars is centered at three-eighth of the height from the bottom edge and three-eighth of the width from the hoist end of the field.',
    },
    name: {
      common: 'Cape Verde',
      official: 'Republic of Cabo Verde',
      nativeName: {
        por: {
          official: 'República de Cabo Verde',
          common: 'Cabo Verde',
        },
      },
    },
    capital: ['Praia'],
    area: 4033,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/no.png',
      svg: 'https://flagcdn.com/no.svg',
      alt: 'The flag of Norway has a red field with a large white-edged navy blue cross that extends to the edges of the field. The vertical part of this cross is offset towards the hoist side.',
    },
    name: {
      common: 'Norway',
      official: 'Kingdom of Norway',
      nativeName: {
        nno: {
          official: 'Kongeriket Noreg',
          common: 'Noreg',
        },
        nob: {
          official: 'Kongeriket Norge',
          common: 'Norge',
        },
        smi: {
          official: 'Norgga gonagasriika',
          common: 'Norgga',
        },
      },
    },
    capital: ['Oslo'],
    area: 323802,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ro.png',
      svg: 'https://flagcdn.com/ro.svg',
      alt: 'The flag of Romania is composed of three equal vertical bands of navy blue, yellow and red.',
    },
    name: {
      common: 'Romania',
      official: 'Romania',
      nativeName: {
        ron: {
          official: 'România',
          common: 'România',
        },
      },
    },
    capital: ['Bucharest'],
    area: 238391,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/se.png',
      svg: 'https://flagcdn.com/se.svg',
      alt: 'The flag of Sweden has a blue field with a large golden-yellow cross that extend to the edges of the field. The vertical part of this cross is offset towards the hoist side.',
    },
    name: {
      common: 'Sweden',
      official: 'Kingdom of Sweden',
      nativeName: {
        swe: {
          official: 'Konungariket Sverige',
          common: 'Sverige',
        },
      },
    },
    capital: ['Stockholm'],
    area: 450295,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/tl.png',
      svg: 'https://flagcdn.com/tl.svg',
      alt: 'The flag of Timor-Leste has a red field with two isosceles triangles which share a common base on the hoist end. The smaller black triangle, which bears a five-pointed white star at its center and spans one-third the width of the field, is superimposed on the larger yellow triangle that extends to the center of the field.',
    },
    name: {
      common: 'Timor-Leste',
      official: 'Democratic Republic of Timor-Leste',
      nativeName: {
        por: {
          official: 'República Democrática de Timor-Leste',
          common: 'Timor-Leste',
        },
        tet: {
          official: 'Repúblika Demokrátika Timór-Leste',
          common: 'Timór-Leste',
        },
      },
    },
    capital: ['Dili'],
    area: 14874,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ad.png',
      svg: 'https://flagcdn.com/ad.svg',
      alt: 'The flag of Andorra features three equal vertical bands of blue, yellow and red, with the coat of arms of Andorra centered in the yellow band.',
    },
    name: {
      common: 'Andorra',
      official: 'Principality of Andorra',
      nativeName: {
        cat: {
          official: "Principat d'Andorra",
          common: 'Andorra',
        },
      },
    },
    capital: ['Andorra la Vella'],
    area: 468,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/mg.png',
      svg: 'https://flagcdn.com/mg.svg',
      alt: 'The flag of Madagascar features a white vertical band on the hoist side that takes up about one-third the width of the field, and two equal horizontal bands of red and green adjoining the vertical band.',
    },
    name: {
      common: 'Madagascar',
      official: 'Republic of Madagascar',
      nativeName: {
        fra: {
          official: 'République de Madagascar',
          common: 'Madagascar',
        },
        mlg: {
          official: "Repoblikan'i Madagasikara",
          common: 'Madagasikara',
        },
      },
    },
    capital: ['Antananarivo'],
    area: 587041,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/vi.png',
      svg: 'https://flagcdn.com/vi.svg',
    },
    name: {
      common: 'United States Virgin Islands',
      official: 'Virgin Islands of the United States',
      nativeName: {
        eng: {
          official: 'Virgin Islands of the United States',
          common: 'United States Virgin Islands',
        },
      },
    },
    capital: ['Charlotte Amalie'],
    area: 347,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/bn.png',
      svg: 'https://flagcdn.com/bn.svg',
      alt: 'The flag of Brunei has a yellow field with two adjoining diagonal bands of white and black that extend from the upper hoist side of the field to the lower fly side. The red emblem of Brunei is centered on the field.',
    },
    name: {
      common: 'Brunei',
      official: 'Nation of Brunei, Abode of Peace',
      nativeName: {
        msa: {
          official: 'Nation of Brunei, Abode Damai',
          common: 'Negara Brunei Darussalam',
        },
      },
    },
    capital: ['Bandar Seri Begawan'],
    area: 5765,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/mo.png',
      svg: 'https://flagcdn.com/mo.svg',
    },
    name: {
      common: 'Macau',
      official:
        "Macao Special Administrative Region of the People's Republic of China",
      nativeName: {
        por: {
          official:
            'Região Administrativa Especial de Macau da República Popular da China',
          common: 'Macau',
        },
        zho: {
          official: '中华人民共和国澳门特别行政区',
          common: '澳门',
        },
      },
    },
    area: 30,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ma.png',
      svg: 'https://flagcdn.com/ma.svg',
      alt: 'The flag of Morocco features a green pentagram — a five-pointed linear star — centered on a red field.',
    },
    name: {
      common: 'Morocco',
      official: 'Kingdom of Morocco',
      nativeName: {
        ara: {
          official: 'المملكة المغربية',
          common: 'المغرب',
        },
        ber: {
          official: 'ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ',
          common: 'ⵍⵎⴰⵖⵔⵉⴱ',
        },
      },
    },
    capital: ['Rabat'],
    area: 446550,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ne.png',
      svg: 'https://flagcdn.com/ne.svg',
      alt: 'The flag of Niger features three equal horizontal bands of orange, white and green, with an orange circle centered in the white band.',
    },
    name: {
      common: 'Niger',
      official: 'Republic of Niger',
      nativeName: {
        fra: {
          official: 'République du Niger',
          common: 'Niger',
        },
      },
    },
    capital: ['Niamey'],
    area: 1267000,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/uy.png',
      svg: 'https://flagcdn.com/uy.svg',
      alt: "The flag of Uruguay is composed of nine equal horizontal bands of white alternating with blue, with a white square superimposed in the canton. In the white square is a yellow sun bearing a human face — the Sun of May — from which sixteen rays extend. The sun's rays alternate between triangular and wavy.",
    },
    name: {
      common: 'Uruguay',
      official: 'Oriental Republic of Uruguay',
      nativeName: {
        spa: {
          official: 'República Oriental del Uruguay',
          common: 'Uruguay',
        },
      },
    },
    capital: ['Montevideo'],
    area: 181034,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/cm.png',
      svg: 'https://flagcdn.com/cm.svg',
      alt: 'The flag of Cameroon is composed of three equal vertical bands of green, red and yellow, with a yellow five-pointed star in the center.',
    },
    name: {
      common: 'Cameroon',
      official: 'Republic of Cameroon',
      nativeName: {
        eng: {
          official: 'Republic of Cameroon',
          common: 'Cameroon',
        },
        fra: {
          official: 'République du Cameroun',
          common: 'Cameroun',
        },
      },
    },
    capital: ['Yaoundé'],
    area: 475442,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/gg.png',
      svg: 'https://flagcdn.com/gg.svg',
    },
    name: {
      common: 'Guernsey',
      official: 'Bailiwick of Guernsey',
      nativeName: {
        eng: {
          official: 'Bailiwick of Guernsey',
          common: 'Guernsey',
        },
        fra: {
          official: 'Bailliage de Guernesey',
          common: 'Guernesey',
        },
        nfr: {
          official: 'Dgèrnésiais',
          common: 'Dgèrnésiais',
        },
      },
    },
    capital: ['St. Peter Port'],
    area: 78,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/vg.png',
      svg: 'https://flagcdn.com/vg.svg',
    },
    name: {
      common: 'British Virgin Islands',
      official: 'Virgin Islands',
      nativeName: {
        eng: {
          official: 'Virgin Islands',
          common: 'British Virgin Islands',
        },
      },
    },
    capital: ['Road Town'],
    area: 151,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/hk.png',
      svg: 'https://flagcdn.com/hk.svg',
    },
    name: {
      common: 'Hong Kong',
      official:
        "Hong Kong Special Administrative Region of the People's Republic of China",
      nativeName: {
        eng: {
          official:
            "Hong Kong Special Administrative Region of the People's Republic of China",
          common: 'Hong Kong',
        },
        zho: {
          official: '中华人民共和国香港特别行政区',
          common: '香港',
        },
      },
    },
    capital: ['City of Victoria'],
    area: 1104,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/li.png',
      svg: 'https://flagcdn.com/li.svg',
      alt: 'The flag of Liechtenstein is composed of two equal horizontal bands of blue and red, with a golden-yellow crown on the hoist side of the blue band.',
    },
    name: {
      common: 'Liechtenstein',
      official: 'Principality of Liechtenstein 2',
      nativeName: {
        deu: {
          official: 'Fürstentum Liechtenstein',
          common: 'Liechtenstein',
        },
      },
    },
    capital: ['Vaduz'],
    area: 160,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ru.png',
      svg: 'https://flagcdn.com/ru.svg',
      alt: 'The flag of Russia is composed of three equal horizontal bands of white, blue and red.',
    },
    name: {
      common: 'Russia',
      official: 'Russian Federation 2',
      nativeName: {
        rus: {
          official: 'Российская Федерация',
          common: 'Россия',
        },
      },
    },
    capital: ['Moscow'],
    area: 17098242,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/gy.png',
      svg: 'https://flagcdn.com/gy.svg',
      alt: 'The flag of Guyana has a green field with two isosceles triangles which share a common base on the hoist end. The smaller black-edged red triangle spanning half the width of the field is superimposed on the larger white-edged yellow triangle which spans the full width of the field.',
    },
    name: {
      common: 'Guyana',
      official: 'Co-operative Republic of Guyana 2',
      nativeName: {
        eng: {
          official: 'Co-operative Republic of Guyana',
          common: 'Guyana',
        },
      },
    },
    capital: ['Georgetown'],
    area: 214969,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/cv.png',
      svg: 'https://flagcdn.com/cv.svg',
      alt: 'The flag of Cape Verde is composed of five horizontal bands of blue, white, red, white and blue in the ratio of 6:1:1:1:3. A ring of ten five-pointed yellow stars is centered at three-eighth of the height from the bottom edge and three-eighth of the width from the hoist end of the field.',
    },
    name: {
      common: 'Cape Verde',
      official: 'Republic of Cabo Verde 2',
      nativeName: {
        por: {
          official: 'República de Cabo Verde',
          common: 'Cabo Verde',
        },
      },
    },
    capital: ['Praia'],
    area: 4033,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/no.png',
      svg: 'https://flagcdn.com/no.svg',
      alt: 'The flag of Norway has a red field with a large white-edged navy blue cross that extends to the edges of the field. The vertical part of this cross is offset towards the hoist side.',
    },
    name: {
      common: 'Norway',
      official: 'Kingdom of Norway 2',
      nativeName: {
        nno: {
          official: 'Kongeriket Noreg',
          common: 'Noreg',
        },
        nob: {
          official: 'Kongeriket Norge',
          common: 'Norge',
        },
        smi: {
          official: 'Norgga gonagasriika',
          common: 'Norgga',
        },
      },
    },
    capital: ['Oslo'],
    area: 323802,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ro.png',
      svg: 'https://flagcdn.com/ro.svg',
      alt: 'The flag of Romania is composed of three equal vertical bands of navy blue, yellow and red.',
    },
    name: {
      common: 'Romania',
      official: 'Romania 2',
      nativeName: {
        ron: {
          official: 'România',
          common: 'România',
        },
      },
    },
    capital: ['Bucharest'],
    area: 238391,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/se.png',
      svg: 'https://flagcdn.com/se.svg',
      alt: 'The flag of Sweden has a blue field with a large golden-yellow cross that extend to the edges of the field. The vertical part of this cross is offset towards the hoist side.',
    },
    name: {
      common: 'Sweden',
      official: 'Kingdom of Sweden 2',
      nativeName: {
        swe: {
          official: 'Konungariket Sverige',
          common: 'Sverige',
        },
      },
    },
    capital: ['Stockholm'],
    area: 450295,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/tl.png',
      svg: 'https://flagcdn.com/tl.svg',
      alt: 'The flag of Timor-Leste has a red field with two isosceles triangles which share a common base on the hoist end. The smaller black triangle, which bears a five-pointed white star at its center and spans one-third the width of the field, is superimposed on the larger yellow triangle that extends to the center of the field.',
    },
    name: {
      common: 'Timor-Leste',
      official: 'Democratic Republic of Timor-Leste 2',
      nativeName: {
        por: {
          official: 'República Democrática de Timor-Leste',
          common: 'Timor-Leste',
        },
        tet: {
          official: 'Repúblika Demokrátika Timór-Leste',
          common: 'Timór-Leste',
        },
      },
    },
    capital: ['Dili'],
    area: 14874,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ad.png',
      svg: 'https://flagcdn.com/ad.svg',
      alt: 'The flag of Andorra features three equal vertical bands of blue, yellow and red, with the coat of arms of Andorra centered in the yellow band.',
    },
    name: {
      common: 'Andorra',
      official: 'Principality of Andorra 2',
      nativeName: {
        cat: {
          official: "Principat d'Andorra",
          common: 'Andorra',
        },
      },
    },
    capital: ['Andorra la Vella'],
    area: 468,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/mg.png',
      svg: 'https://flagcdn.com/mg.svg',
      alt: 'The flag of Madagascar features a white vertical band on the hoist side that takes up about one-third the width of the field, and two equal horizontal bands of red and green adjoining the vertical band.',
    },
    name: {
      common: 'Madagascar',
      official: 'Republic of Madagascar 2',
      nativeName: {
        fra: {
          official: 'République de Madagascar',
          common: 'Madagascar',
        },
        mlg: {
          official: "Repoblikan'i Madagasikara",
          common: 'Madagasikara',
        },
      },
    },
    capital: ['Antananarivo'],
    area: 587041,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/vi.png',
      svg: 'https://flagcdn.com/vi.svg',
    },
    name: {
      common: 'United States Virgin Islands',
      official: 'Virgin Islands of the United States 2',
      nativeName: {
        eng: {
          official: 'Virgin Islands of the United States',
          common: 'United States Virgin Islands',
        },
      },
    },
    capital: ['Charlotte Amalie'],
    area: 347,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/bn.png',
      svg: 'https://flagcdn.com/bn.svg',
      alt: 'The flag of Brunei has a yellow field with two adjoining diagonal bands of white and black that extend from the upper hoist side of the field to the lower fly side. The red emblem of Brunei is centered on the field.',
    },
    name: {
      common: 'Brunei',
      official: 'Nation of Brunei, Abode of Peace 2',
      nativeName: {
        msa: {
          official: 'Nation of Brunei, Abode Damai',
          common: 'Negara Brunei Darussalam',
        },
      },
    },
    capital: ['Bandar Seri Begawan'],
    area: 5765,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/mo.png',
      svg: 'https://flagcdn.com/mo.svg',
    },
    name: {
      common: 'Macau',
      official:
        "Macao Special Administrative Region of the People's Republic of China 2",
      nativeName: {
        por: {
          official:
            'Região Administrativa Especial de Macau da República Popular da China',
          common: 'Macau',
        },
        zho: {
          official: '中华人民共和国澳门特别行政区',
          common: '澳门',
        },
      },
    },
    area: 30,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ma.png',
      svg: 'https://flagcdn.com/ma.svg',
      alt: 'The flag of Morocco features a green pentagram — a five-pointed linear star — centered on a red field.',
    },
    name: {
      common: 'Morocco',
      official: 'Kingdom of Morocco 2',
      nativeName: {
        ara: {
          official: 'المملكة المغربية',
          common: 'المغرب',
        },
        ber: {
          official: 'ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ',
          common: 'ⵍⵎⴰⵖⵔⵉⴱ',
        },
      },
    },
    capital: ['Rabat'],
    area: 446550,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ne.png',
      svg: 'https://flagcdn.com/ne.svg',
      alt: 'The flag of Niger features three equal horizontal bands of orange, white and green, with an orange circle centered in the white band.',
    },
    name: {
      common: 'Niger',
      official: 'Republic of Niger 2',
      nativeName: {
        fra: {
          official: 'République du Niger',
          common: 'Niger',
        },
      },
    },
    capital: ['Niamey'],
    area: 1267000,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/uy.png',
      svg: 'https://flagcdn.com/uy.svg',
      alt: "The flag of Uruguay is composed of nine equal horizontal bands of white alternating with blue, with a white square superimposed in the canton. In the white square is a yellow sun bearing a human face — the Sun of May — from which sixteen rays extend. The sun's rays alternate between triangular and wavy.",
    },
    name: {
      common: 'Uruguay',
      official: 'Oriental Republic of Uruguay 2',
      nativeName: {
        spa: {
          official: 'República Oriental del Uruguay',
          common: 'Uruguay',
        },
      },
    },
    capital: ['Montevideo'],
    area: 181034,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/cm.png',
      svg: 'https://flagcdn.com/cm.svg',
      alt: 'The flag of Cameroon is composed of three equal vertical bands of green, red and yellow, with a yellow five-pointed star in the center.',
    },
    name: {
      common: 'Cameroon',
      official: 'Republic of Cameroon 2',
      nativeName: {
        eng: {
          official: 'Republic of Cameroon',
          common: 'Cameroon',
        },
        fra: {
          official: 'République du Cameroun',
          common: 'Cameroun',
        },
      },
    },
    capital: ['Yaoundé'],
    area: 475442,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/gg.png',
      svg: 'https://flagcdn.com/gg.svg',
    },
    name: {
      common: 'Guernsey',
      official: 'Bailiwick of Guernsey 2',
      nativeName: {
        eng: {
          official: 'Bailiwick of Guernsey',
          common: 'Guernsey',
        },
        fra: {
          official: 'Bailliage de Guernesey',
          common: 'Guernesey',
        },
        nfr: {
          official: 'Dgèrnésiais',
          common: 'Dgèrnésiais',
        },
      },
    },
    capital: ['St. Peter Port'],
    area: 78,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/vg.png',
      svg: 'https://flagcdn.com/vg.svg',
    },
    name: {
      common: 'British Virgin Islands',
      official: 'Virgin Islands 2',
      nativeName: {
        eng: {
          official: 'Virgin Islands',
          common: 'British Virgin Islands',
        },
      },
    },
    capital: ['Road Town'],
    area: 151,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/hk.png',
      svg: 'https://flagcdn.com/hk.svg',
    },
    name: {
      common: 'Hong Kong',
      official:
        "Hong Kong Special Administrative Region of the People's Republic of China 2",
      nativeName: {
        eng: {
          official:
            "Hong Kong Special Administrative Region of the People's Republic of China",
          common: 'Hong Kong',
        },
        zho: {
          official: '中华人民共和国香港特别行政区',
          common: '香港',
        },
      },
    },
    capital: ['City of Victoria'],
    area: 1104,
  },
];
export const mockCountry: ICountry = {
  area: 1000,
  capital: ['testograd'],
  flags: { png: 'test-url', alt: 'test alt', svg: 'test-svg-path' },
  name: {
    official: 'official-test-country-name',
    common: 'common-test-country-name',
    nativeName: {
      spa: {
        common: 'common-spa-name',
        official: 'official-spa-name',
      },
    },
  },
};
export const mockCountryWithoutCapital: ICountry = {
  area: 1000,
  flags: { png: 'test-url', alt: 'test alt', svg: 'test-svg-path' },
  name: {
    official: 'official-test-country-name',
    common: 'common-test-country-name',
    nativeName: {
      spa: {
        common: 'common-spa-name',
        official: 'official-spa-name',
      },
    },
  },
};

export const MockDetailedCountry = {
  name: {
    common: 'Test Country',
    official: 'Official Test Country',
    nativeName: {
      eng: {
        official: 'Official Test Country',
        common: 'Test Country',
      },
    },
  },
  flag: '',
  capital: ['Test Capital'],
  region: 'Test Region',
  subregion: 'Test Subregion',
  flags: {
    png: 'https://test.flag.png',
    svg: 'https://test.flag.svg',
    alt: 'Test flag description',
  },
  coatOfArms: {
    png: 'https://test.coat.png',
    svg: 'https://test.coat.svg',
  },
  area: 123456,
  population: 9876543,
  languages: {
    eng: 'English',
    test: 'Test Language',
  },
  currencies: {
    TEST: {
      name: 'Test Currency',
      symbol: '₺',
    },
  },
  timezones: ['UTC+0'],
  borders: ['TST', 'TST2'],
  idd: {
    root: '+1',
    suffixes: ['23', '45'],
  },
  postalCode: {
    format: 'TEST ###',
    regex: '^[A-Z]{4}$',
  },
  maps: {
    googleMaps: 'https://google.maps/test',
    openStreetMaps: 'https://osm.org/test',
  },
  independent: true,
  status: 'officially-assigned',
  altSpellings: ['TC', 'Test C.'],
};

export const MockBrokenDetailedCountry = {
  name: {
    common: 1,
    official: 'Official Test Country',
    nativeName: {
      eng: {
        official: 'Official Test Country',
        common: 'Test Country',
      },
    },
  },
  flag: '',
  capital: ['Test Capital'],
  region: 'Test Region',
  subregion: 'Test Subregion',
  flags: {
    png: 'https://test.flag.png',
    svg: 'https://test.flag.svg',
    alt: 'Test flag description',
  },
  coatOfArms: {
    png: 'https://test.coat.png',
    svg: 'https://test.coat.svg',
  },
  area: 123456,
  population: 9876543,
  languages: {
    eng: 'English',
    test: 'Test Language',
  },
  currencies: {
    TEST: {
      name: 'Test Currency',
      symbol: '₺',
    },
  },
  timezones: ['UTC+0'],
  borders: ['TST', 'TST2'],
  idd: {
    root: '+1',
    suffixes: ['23', '45'],
  },
  postalCode: {
    format: 'TEST ###',
    regex: '^[A-Z]{4}$',
  },
  maps: {
    googleMaps: 'https://google.maps/test',
    openStreetMaps: 'https://osm.org/test',
  },
  independent: true,
  status: 'officially-assigned',
  altSpellings: ['TC', 'Test C.'],
};
