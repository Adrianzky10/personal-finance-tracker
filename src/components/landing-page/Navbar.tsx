"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Wallet, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import ModeToggle from "../shared/ModeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      title: "Features",
      href: "#features",
    },
    {
      title: "Goals",
      href: "#goals",
    },
    {
      title: "About",
      href: "#about",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
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

        <ModeToggle />
        {/* Desktop Action */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost">Login</Button>

          <Button>Get Started</Button>
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
              <Button variant="ghost" className="justify-start">
                Login
              </Button>

              <Button>Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
