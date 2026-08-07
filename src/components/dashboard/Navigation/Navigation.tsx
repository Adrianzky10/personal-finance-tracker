"use client";

import ModeToggle from "@/components/shared/ModeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NAVIGATION_CONSTANTS from "./Navigation.constants";
import useCurrentUser from "@/hooks/auth/useCurrentUser";
import { useLogout } from "@/hooks/auth/useLogout";

const Navigation = () => {
  const pathname = usePathname();

  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const handleLogout = useLogout();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Wallet className="h-5 w-5" />
            </div>

            <span className="text-lg font-bold tracking-tight sm:text-xl">
              FinTracker
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center rounded-xl border border-border bg-muted p-1 md:flex">
          {NAVIGATION_CONSTANTS.map((nav) => {
            const isActive = pathname === nav.href;

            return (
              <Link key={nav.key} href={nav.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="cursor-pointer rounded-lg"
                >
                  {nav.icon}
                  {nav.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Theme Desktop Only */}
          <div className="hidden md:block">
            <ModeToggle />
          </div>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-10 w-10 items-center justify-center rounded-full px-0"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {isLoadingUser
                      ? "..."
                      : user?.data.name
                          ?.split(" ")
                          .map((word: string) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            {/* Sedikit diperlebar (w-72) agar teks nama dan email yang panjang tidak terpotong */}
            <DropdownMenuContent align="end" className="w-72 p-2 rounded-xl">
              <DropdownMenuLabel className="font-normal p-2">
                <div className="flex items-center gap-3">
                  {/* Avatar di dalam menu dropdown */}
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {isLoadingUser
                        ? "..."
                        : user?.data.name
                            ?.split(" ")
                            .map((word: string) => word[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Kontainer untuk Nama dan Email */}
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {isLoadingUser ? "..." : user?.data.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isLoadingUser ? "..." : user?.data.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer mt-1 rounded-lg"
                onClick={() => handleLogout.mutate()}
                disabled={handleLogout.isPending}
              >
                <LogOut className="mr-3 h-5 w-5" />
                <span className="text-base">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Hamburger (Dipindah ke Kanan) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>

              {/* Mengubah side="left" menjadi side="right" agar serasi dengan posisi tombol */}
              <SheetContent side="right" className="w-72 p-0">
                <div className="flex h-full flex-col gap-8 px-6 py-8">
                  {/* Sheet Header */}
                  <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <Wallet className="h-5 w-5" />
                      </div>

                      <span className="text-xl font-bold tracking-tight">
                        FinTracker
                      </span>
                    </Link>

                    {/* Theme Mobile */}
                    <ModeToggle />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-2">
                    {NAVIGATION_CONSTANTS.map((nav) => {
                      const isActive = pathname === nav.href;

                      return (
                        <SheetClose asChild key={nav.key}>
                          <Link href={nav.href}>
                            <Button
                              variant={isActive ? "default" : "ghost"}
                              className={`w-full justify-start rounded-xl h-12 text-base ${
                                !isActive &&
                                "text-muted-foreground hover:bg-muted"
                              }`}
                            >
                              <span className="mr-3 flex items-center justify-center">
                                {nav.icon}
                              </span>
                              {nav.label}
                            </Button>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
