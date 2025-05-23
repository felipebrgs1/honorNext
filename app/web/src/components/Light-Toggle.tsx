'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme();

    const currentTheme = theme === 'system' ? resolvedTheme : theme;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                >
                    {currentTheme === 'dark' ? (
                        <Moon className='h-[1.2rem] w-[1.2rem] transition-all' />
                    ) : (
                        <Sun className='h-[1.2rem] w-[1.2rem] transition-all' />
                    )}
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
