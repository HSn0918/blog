'use client';

import {blogConfig} from "@/blog.config";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator";
import {Menu, Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import Search from "@/plugins/search";

const Header = () => {
    const {routes, logo} = blogConfig

    //高亮导航栏
    const pathname = usePathname()
    const active = routes.find((item: any) => item.value == '/' + pathname.split('/')[1])?.name

    const {theme, setTheme, resolvedTheme} = useTheme()
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className={'w-full sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10 min-h-20'}>
            <header className={'container flex justify-between py-4'}>
                <div className={'flex justify-center items-center'}>
                    <Link className={'flex justify-center items-center mr-4'} href={'/'}>
                        {logo?.image &&
                            <Image
                                src={logo?.image}
                                height={28}
                                width={28}
                                alt={'logo'}
                            />
                        }
                        {logo?.text && <div className={'ml-1 text-lg font-semibold'}>
                            {logo?.text}
                        </div>}
                    </Link>
                    <div className={'hidden md:block space-x-1'}>
                        {routes.map((route: any) => (
                            <Link href={route?.value} key={route?.value}>
                                <Button variant={active == route.name ? 'secondary' : 'ghost'} className={'text-base'}>
                                    {route.name}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={'flex justify-center items-center space-x-1'}>
                    <div className={'md:hidden block'}>
                        <Sheet open={open} onOpenChange={() => {
                            setOpen(!open)
                        }}>
                            <SheetTrigger asChild>
                                <Button size={'icon'} variant={'ghost'}>
                                    <Menu size={20}/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side={'top'} className={'w-full space-y-4 p-12 text-sm'}>
                                {routes.map((route: any, index: number) => (
                                    <div className={'space-y-4'} key={route?.value ?? index}>
                                        <Link href={route.value} onClick={() => {
                                            setOpen(false)
                                        }}>
                                            <Button variant={active == route.name ? 'secondary' : 'ghost'}
                                                    className={'text-base w-full'}>
                                                {route.name}
                                            </Button>
                                        </Link>
                                        {index != routes.length - 1 && <Separator/>}
                                    </div>
                                ))}
                            </SheetContent>
                        </Sheet>
                    </div>
                    <Search/>
                    <Button
                        size={'icon'}
                        variant={'ghost'}
                        onClick={() => {
                            const current = resolvedTheme ?? theme
                            setTheme(current == 'light' ? 'dark' : 'light')
                        }}
                        aria-label={'切换主题'}
                    >
                        {mounted && (resolvedTheme ?? theme) == 'light' && <Sun size={20}/>}
                        {mounted && (resolvedTheme ?? theme) == 'dark' && <Moon size={20}/>}
                    </Button>
                </div>
            </header>
        </div>
    );
}

export default Header;
