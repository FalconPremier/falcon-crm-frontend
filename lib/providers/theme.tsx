'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function CustomThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
