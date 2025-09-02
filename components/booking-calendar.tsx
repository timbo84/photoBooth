"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data for unavailable dates - in a real app, this would come from your database
const unavailableDates = new Set([
  "2024-12-25", // Christmas
  "2024-12-31", // New Year's Eve
  "2024-12-14", // Booked event
  "2024-12-21", // Booked event
  "2024-12-28", // Booked event
  "2025-01-01", // New Year's Day
  "2025-01-15", // Booked event
  "2025-01-22", // Booked event
])

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isUnavailable: boolean
  dateString: string
}

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get first day of the month and calculate calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Generate calendar days
  const calendarDays: CalendarDay[] = []

  // Add previous month's trailing days
  const prevMonth = new Date(currentYear, currentMonth - 1, 0)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - 1, prevMonth.getDate() - i)
    const dateString = date.toISOString().split("T")[0]
    calendarDays.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isUnavailable: true, // Previous month dates are unavailable
      dateString,
    })
  }

  // Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    const dateString = date.toISOString().split("T")[0]
    const isToday = date.toDateString() === today.toDateString()
    const isSelected = selectedDate?.toDateString() === date.toDateString()
    const isUnavailable = unavailableDates.has(dateString) || date < today

    calendarDays.push({
      date,
      isCurrentMonth: true,
      isToday,
      isSelected,
      isUnavailable,
      dateString,
    })
  }

  // Add next month's leading days to complete the grid
  const remainingDays = 42 - calendarDays.length // 6 rows × 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear, currentMonth + 1, day)
    const dateString = date.toISOString().split("T")[0]
    calendarDays.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isUnavailable: true, // Next month dates are unavailable for selection
      dateString,
    })
  }

  const handleDateSelect = (day: CalendarDay) => {
    if (!day.isUnavailable && day.isCurrentMonth) {
      setSelectedDate(day.date)
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(currentYear, currentMonth + (direction === "next" ? 1 : -1), 1))
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <h3 className="font-heading font-semibold text-xl">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-2">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateSelect(day)}
              disabled={day.isUnavailable}
              className={cn(
                "p-2 text-sm rounded-md transition-colors relative",
                "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                {
                  "text-muted-foreground": !day.isCurrentMonth,
                  "text-foreground": day.isCurrentMonth && !day.isUnavailable,
                  "bg-primary text-primary-foreground": day.isSelected,
                  "bg-accent text-accent-foreground": day.isToday && !day.isSelected,
                  "text-muted-foreground bg-muted/50 cursor-not-allowed": day.isUnavailable,
                  "hover:bg-accent hover:text-accent-foreground": !day.isUnavailable && !day.isSelected,
                },
              )}
            >
              {day.date.getDate()}
              {day.isUnavailable && day.isCurrentMonth && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-6 bg-muted-foreground/50 rotate-45"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Selected Date</p>
                <p className="font-heading font-semibold text-lg">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Button onClick={() => (window.location.href = "/booking/details")}>Continue to Details</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-muted rounded relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-3 bg-muted-foreground/50 rotate-45"></div>
            </div>
          </div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  )
}
