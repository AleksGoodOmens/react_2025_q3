import { ICountry } from 'interfaces/index';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const countries = (await req.json()) as ICountry[];

  const headers = [
    'Country Name',
    'Official Name',
    'Capital',
    'Area (km²)',
    'Flag URL',
  ];

  const csvRows = countries.map((country) => {
    return [
      `"${country.name.common.replace(/"/g, '""')}"`,
      `"${country.name.official.replace(/"/g, '""')}"`,
      `"${country.capital?.join(', ') || ''}"`,
      country.area?.toString() || '',
      country.flags.png || '',
    ].join(',');
  });

  const csvContent = [headers.join(','), ...csvRows].join('\n');

  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="countries.csv"',
    },
  });
}
