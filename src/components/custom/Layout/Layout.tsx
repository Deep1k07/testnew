"use client"

import Link from "next/link"
import { BriefcaseBusiness, CirclePlus, CircleUser, GitPullRequestClosed, HandCoins, Home, Menu, NotepadTextDashed, Package, Package2, ShieldCheck, UserPlus, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import SideBarSkelton from "../Skelton/SideBarSkelton"
interface propsLayout {
    children: React.ReactNode;
}
const Layout = ({ children }: propsLayout) => {
    const session = useSession()
    type BaManagerType = MenuItem[];
    const [manager, setManager] = useState<BaManagerType>([]);
    const location = usePathname();
    const router = useRouter()
    interface MenuItem {
        name: string;
        icon: JSX.Element; // assuming LuUsers is a JSX element
        link: string;
    }
    const baManagerMenu: MenuItem[] = [{
        name: "Create New Client",
        icon: <UserPlus className="h-4 w-4" />,
        link: "/create-client"

    },
    {
        name: "Manage BA",
        icon: <BriefcaseBusiness className="h-4 w-4" />,
        link: "/manage-ba"
    },
    {
        name: "Draft Certificate",
        icon: <NotepadTextDashed className="h-4 w-4" />,
        link: "/draft-certificate"
    },
    {
        name: "Final Certificate",
        icon: <HandCoins className="h-4 w-4" />,
        link: "/final-certificate"
    },
    {
        name: "Scope Approval",
        icon: <CirclePlus className="h-4 w-4" />,
        link: "/scope-approval"
    },
    ]
    const adminMenu: MenuItem[] = [{
        name: "Manage User",
        icon: <UserRound className="h-4 w-4" />,
        link: "/create-role"
    },
    {
        name: "Manage CB",
        icon: <ShieldCheck className="h-4 w-4" />,
        link: "/manage-cb"
    }
    ]
    const scopeManager: MenuItem[] = [
        {
            name: "Scopes",
            icon: <CirclePlus className="h-4 w-4" />,
            link: "/scopes"
        },
        {
            name: "Rejected Scopes",
            icon: <GitPullRequestClosed className="h-4 w-4" />,
            link: "/rejected-scopes"
        },
    ]
    const qualityManager: MenuItem[] = [{
        name: "Quality Manager",
        icon: <Home className="h-4 w-4" />,
        link: "/quality-list"
    }
    ]
    const certificateManager: MenuItem[] = [{
        name: "Certificate Manager",
        icon: <ShieldCheck className="h-4 w-4" />,
        link: "/certificate-list"
    },
    {
        name: "Final Certificate",
        icon: <Home className="h-4 w-4" />,
        link: "/generated-list"
    }
    ]
    useEffect(() => {
        if (session?.data?.user?.role === 'BA_Manager') {
            setManager(baManagerMenu)
        }
        else if (session?.data?.user?.role === 'Admin') {
            setManager(adminMenu)
        }
        else if (session?.data?.user?.role === 'Scope_Manager') {
            setManager(scopeManager)
        }
        else if (session?.data?.user?.role === 'Quality_Manager') {
            setManager(qualityManager)
        }
        else if (session?.data?.user?.role === "Certificate_Manager") {
            setManager(certificateManager)
        }

        //eslint-disable-next-line
    }, [session?.data?.user])
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="">MIS</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        {
                            session?.status === 'loading' ? <SideBarSkelton count={10} /> : <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                {
                                    manager.map((ele: any, index: any) => {
                                        const isActive = location === ele.link || location.startsWith(`${ele.link}/`);
                                        return (
                                            <Link
                                                href={ele.link}
                                                key={index}
                                                className={` ${isActive && ele.link !== "/" ? "activate" : ""} [&.activate]:bg-muted [&.activate]:text-primary mt-2  flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
                                            >
                                                {ele.icon}
                                                {ele.name}{" "}
                                            </Link>
                                        );
                                    })
                                }
                            </nav>
                        }

                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-x-hidden">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px]">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid items-start px-2 text-sm font-medium">
                                {
                                    manager?.map((ele, index) => (
                                        <Link
                                            href={ele.link}
                                            key={index}
                                            className={` ${ele.link == location && ele.link !== "/" ? "activate" : ""} [&.activate]:bg-muted [&.activate]:text-primary mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
                                        >
                                            <Package className="h-4 w-4" />
                                            {ele.name}{" "}
                                        </Link>
                                    ))
                                }
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <div className="pl-4 text-xl">Your role is {manager?.length > 0 ? <span className="font-bold text-red-500">{session?.data?.user?.role?.split('_').join('-')}</span> : "Loading..."} </div>
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="text-center">{session ? session?.data?.user?.username : "My Account"}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuSeparator />
                            {/* <LogoutForm /> */}
                            <form action={async () => {
                                await signOut();
                                router.push('/login')
                            }}>
                                <Button className='w-full' type='submit'>Logout</Button>
                            </form>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-h-[calc(100vh-60px)] vertical-line  overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
export default Layout;