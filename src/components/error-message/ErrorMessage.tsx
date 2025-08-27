import type { PropsWithChildren } from 'react';

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <p className="absolute bottom-0 rounded-2xl bg-white/20 px-4 py-2 text-center text-xs text-red-500">
      {children}
    </p>
  );
};
