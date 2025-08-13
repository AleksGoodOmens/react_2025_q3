import { ICountry } from 'interfaces/index';
import { useCallback, useState } from 'react';

export const useCSV = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const createDownloadUrlBlob = useCallback((countries: ICountry[]) => {
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

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    return url;
  }, []);

  const create = async (countries: ICountry[]) => {
    setIsLoading(true);

    const url: string = await new Promise((resolve) => {
      setTimeout(() => resolve(createDownloadUrlBlob(countries)), 1000);
    });
    setUrl(url);
    setIsLoading(false);
  };

  const clear = async () => {
    setIsLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        if (url) URL.revokeObjectURL(url);
        setUrl(null);
        resolve('done');
      }, 1000);
    });
    setIsLoading(false);
  };

  return { isLoading, url, create, clear };
};
