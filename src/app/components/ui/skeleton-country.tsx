export const SkeletonCountry = () => {
  return (
    <article className="animate-pulse">
      <header className="mb-6 flex justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded bg-gray-300"></div>
          <div className="h-6 w-48 rounded bg-gray-300"></div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="h-32 w-48 rounded-lg bg-gray-300"></div>
            <div className="h-32 w-32 rounded-lg bg-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-16 rounded bg-gray-300"></div>
                <div className="h-4 w-24 rounded bg-gray-300"></div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-5 w-32 rounded bg-gray-300"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 w-16 rounded bg-gray-300"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-5 w-24 rounded bg-gray-300"></div>
            <ul className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="h-4 w-full rounded bg-gray-300"></li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="h-5 w-24 rounded bg-gray-300"></div>
            <ul className="space-y-2">
              {[...Array(2)].map((_, i) => (
                <li key={i} className="h-4 w-full rounded bg-gray-300"></li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="h-5 w-24 rounded bg-gray-300"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 w-16 rounded bg-gray-300"></div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-5 w-36 rounded bg-gray-300"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 w-12 rounded bg-gray-300"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
