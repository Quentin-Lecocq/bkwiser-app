'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className="cursor-pointer"
      size="icon"
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </Button>
  );
}
