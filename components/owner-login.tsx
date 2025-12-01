"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface OwnerLoginProps {
  onLoginSuccess: () => void
}

export default function OwnerLogin({ onLoginSuccess }: OwnerLoginProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const OWNER_PASSWORD = "rodmel@122122"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate brief delay for security feel
    setTimeout(() => {
      if (password === OWNER_PASSWORD) {
        onLoginSuccess()
        setPassword("")
      } else {
        setError("Invalid password. Please try again.")
      }
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/5 to-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle>Owner Access</CardTitle>
          <CardDescription>Enter password to manage members</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter owner password"
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm p-2 bg-destructive/10 rounded">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Enter Owner Mode"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
