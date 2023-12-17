'use client';

import React, { useEffect, useState } from 'react';
import { Workspace } from './workspace';
import '../styles/headers.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

function Header() {
  return (
    <header>
      <h1>Notee</h1>
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
