export const countryKeys = {
  all: ['countries'] as const,
  lists: () => [...countryKeys.all, 'list'] as const,
  details: () => [...countryKeys.all, 'detail'] as const,
  detail: (name: string) => [...countryKeys.details(), name] as const,
};
