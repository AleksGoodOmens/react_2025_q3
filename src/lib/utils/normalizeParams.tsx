import { IHomePageProps, IHomePageSearchParams } from 'interfaces/index';

export const normalizeParams = ({
  limit,
  page,
  search,
  details,
}: IHomePageSearchParams): IHomePageProps => {
  return {
    limit: limit ? Number(limit) : 20,
    page: page ? Number(page) : 1,
    search: search || 'all',
    details: details,
  };
};
