"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-heading font-bold text-xl text-foreground">
            Elite Photo Booth
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link href="#gallery" className="text-muted-foreground hover:text-foreground transition-colors">Gallery</Link>
            <Link href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link>
            <Link href="/booking" className="text-muted-foreground hover:text-foreground transition-colors">Booking</Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>

          {/* CTA Button */}
          <Button asChild className="hidden md:inline-flex">
            <Link href="/booking">Book Now</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleMobileMenu}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-4">
            <Link href="/" className="block text-muted-foreground hover:text-foreground">Home</Link>
            <Link href="#gallery" className="block text-muted-foreground hover:text-foreground">Gallery</Link>
            <Link href="#services" className="block text-muted-foreground hover:text-foreground">Services</Link>
            <Link href="/booking" className="block text-muted-foreground hover:text-foreground">Booking</Link>
            <Link href="#contact" className="block text-muted-foreground hover:text-foreground">Contact</Link>
            <Button asChild className="w-full">
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}