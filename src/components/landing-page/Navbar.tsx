"use client";

import Link from "next/link";
import { useState } from "react";
import { LogOut, Menu, Wallet, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import ModeToggle from "../shared/ModeToggle";
import useCurrentUser from "@/hooks/auth/useCurrentUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useLogout } from "@/hooks/auth/useLogout";
import { Spinner } from "../ui/spinner";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useCurrentUser();
  const isAuthenticated = !!user;

  const handleLogout = useLogout();
  const getInitials = (name?: string) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const navItems = [
    {
      title: "About",
      href: "#about",
    },
    {
      title: "Features",
      href: "#features",
    },
    {
      title: "Testimonials",
      href: "#testimonials",
    },
    {
      title: "Pricing",
      href: "#pricing",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wallet className="h-5 w-5" />
          </div>

          <span className="text-xl font-bold tracking-tight text-foreground">
            FinTracker
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {/* Desktop Action */}
          {/* Desktop Action */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 rounded-full p-0"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {getInitials(user?.data.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-72 rounded-xl p-2"
                >
                  <DropdownMenuLabel className="p-2 font-normal">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-muted">
                          {getInitials(user?.data.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col space-y-1">
                        <p className="max-w-48 truncate text-sm font-medium">
                          {user?.data.name}
                        </p>

                        <p className="max-w-48 truncate text-sm text-muted-foreground">
                          {user?.data.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onClick={() => handleLogout.mutate()}
                    disabled={handleLogout.isPending}
                  >
                    {handleLogout.isPending ? (
                      <Spinner />
                    ) : (
                      <>
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>

                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {getInitials(user?.data.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-medium">{user?.data.name}</p>

                      <p className="text-xs text-muted-foreground">
                        {user?.data.email}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="justify-start text-destructive py-8"
                    onClick={() => handleLogout.mutate()}
                    disabled={handleLogout.isPending}
                  >
                    {handleLogout.isPending ? (
                      <Spinner />
                    ) : (
                      <>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="justify-start">
                      Login
                    </Button>
                  </Link>

                  <Link href="/register">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
