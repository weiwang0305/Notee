'use client';

import React from 'react';
import { Workspace } from './workspace';
import '../styles/headers.css';
import { Roboto } from 'next/font/google';
import Image from 'next/image';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

function Header() {
  return (
    <header>
      <h1>
        <Image
          src='/notebook.svg'
          alt='Notee Logo'
          id='Logo'
          width={25}
          height={25}
          priority
        />
        Notee
      </h1>
    </header>
  );
}

export default function ReactApp() {
  return (
    <main className={roboto.className}>
      <Header />
      <Workspace />
    </main>
  );
}
