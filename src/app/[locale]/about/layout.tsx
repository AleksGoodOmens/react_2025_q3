import { ReactNode } from 'react';

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
  test: ReactNode;
}) {
  return <div>{children}</div>;
}
