const url =
  'https://restcountries.com/v3.1/all?fields=name,flags,capital,area,borders,';

async function getAllCountries() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('CountryService failed:', error);
    throw error;
  }
}

export { getAllCountries };
