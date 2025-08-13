import { PaginationSkeleton } from './components/skeletons/PaginationSkeleton';
import { SearchFormSkeleton } from './components/skeletons/SearchFromSkeleton';
import { Heading } from 'components/ui/Heading';

export default function Loading() {
  return (
    <section>
      <Heading variant="main" Tag="h1">
        Countries by AmensGood
      </Heading>
      <SearchFormSkeleton />
      <PaginationSkeleton />
    </section>
  );
}
