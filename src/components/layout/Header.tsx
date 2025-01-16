'use client';

import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import {usePathname} from "next/navigation";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import {useSpyElem} from "@/hook/useSpy";

const navList = [
    { name: 'HOME', src: 'home.PNG', href: '/', isLeft: true, isNewWindow: false },
    { name: 'POST', src: 'post.png', href: '/posts', isLeft: true, isNewWindow: false },
    { name: 'MAIL', src: 'mail.PNG', href: '/', isLeft: false, isNewWindow: false },
    { name: 'GIT', src: 'git.PNG', href: 'https://github.com/chweyun', isLeft: false, isNewWindow: true },
];

export default function Header() {
    const pathname = usePathname();
    const { ref, marginTop } = useSpyElem(92);
    const isHome = pathname !== '/'

    const NavItem = ({ navItem }: { navItem: { name: string; href: string; src: string; isNewWindow: boolean } }) => (
        <div key={navItem.name} className="flex items-center">
            <Link
                href={navItem.href}
                className="px-1 py-1"
                target={navItem.isNewWindow ? '_blank' : ''}
            >
                <Image
                    src={`/icons/${navItem.src}`}
                    width="120"
                    height="70"
                    alt={navItem.name}
                    className="cursor-pointer"
                />
            </Link>
        </div>
    );

    return (
        <>
            <ScrollProgressBar />
            <nav
                style={isHome ? { marginTop } : undefined}
                ref={isHome ? ref : null}
                className={`
                    fixed z-40 flex flex-col items-center justify-center print:hidden
                    h-[90px] w-[90%] left-1/2 transform -translate-x-1/2
                    ${isHome} ? 'pb-[1px]' : 'border-b border-black bg-opacity-95 bg-stone-100'}
                `}
            >
                <div className={`mt-1 flex h-[64px] w-full items-center justify-between px-4`}>
                    <div className='flex items-center font-medium'>
                        <div className="flex items-center font-medium">
                            {navList.filter(navItem => navItem.isLeft).map(navItem => (
                                <NavItem key={navItem.name} navItem={navItem}/>
                            ))}
                        </div>
                    </div>

                    <div className='flex gap-3 mt-1 '>
                        <div className="flex gap-3 mt-1">
                            {navList.filter(navItem => !navItem.isLeft).map(navItem => (
                                <NavItem key={navItem.name} navItem={navItem}/>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
