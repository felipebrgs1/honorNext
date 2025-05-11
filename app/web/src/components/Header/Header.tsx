import React from 'react';
import Link from 'next/link';
import { ModeToggle } from '../Light-Toggle';

const Links = [
    { name: 'Home', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
];

const Header = () => {
    return (
        <div className='grid md:grid-cols-12 w-full h-10 mx-auto items-center bg-slate-100 text-black'>
            <h1 className='col-span-2 flex justify-center font-bold'>
                Not a PC
            </h1>
            <div className='col-start-8 col-span-4 flex justify-around'>
                {Links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className='text-slate-800 hover:text-violet-600 font-medium'
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className='col-start-12 align-center flex justify-center'>
                <ModeToggle />
            </div>
        </div>
    );
};
export default Header;
