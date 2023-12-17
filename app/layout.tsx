import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notee',
  description: 'QL Notes Filesystem App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
