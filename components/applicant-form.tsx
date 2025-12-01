"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import type { Applicant } from "@/lib/applicants-data"

interface ApplicantFormProps {
  onSubmit: (applicant: Omit<Applicant, "id" | "dateAdded">) => void
  isLoading?: boolean
}

export default function ApplicantForm({ onSubmit, isLoading = false }: ApplicantFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    passportNumber: "",
    status: "pending" as const,
    profilePicture: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [previewImage, setPreviewImage] = useState<string>("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 1)
      newErrors.age = "Valid age is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.passportNumber.trim()) newErrors.passportNumber = "Passport number is required"
    if (!formData.profilePicture) newErrors.profilePicture = "Profile picture is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setFormData((prev) => ({ ...prev, profilePicture: base64String }))
        setPreviewImage(base64String)
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.profilePicture
          return newErrors
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    onSubmit({
      name: formData.name,
      age: Number(formData.age),
      phone: formData.phone,
      passportNumber: formData.passportNumber,
      status: formData.status,
      profilePicture: formData.profilePicture,
    })

    // Reset form
    setFormData({
      name: "",
      age: "",
      phone: "",
      passportNumber: "",
      status: "pending",
      profilePicture: "",
    })
    setPreviewImage("")
    setErrors({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Applicant</CardTitle>
        <CardDescription>Register a new member with complete information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Full name"
              disabled={isLoading}
            />
            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label htmlFor="age" className="text-sm font-medium">
              Age <span className="text-destructive">*</span>
            </label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
              placeholder="Age"
              disabled={isLoading}
            />
            {errors.age && <p className="text-destructive text-sm">{errors.age}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone <span className="text-destructive">*</span>
            </label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="+1-555-0000"
              disabled={isLoading}
            />
            {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
          </div>

          {/* Passport Number */}
          <div className="space-y-2">
            <label htmlFor="passport" className="text-sm font-medium">
              Passport Number <span className="text-destructive">*</span>
            </label>
            <Input
              id="passport"
              value={formData.passportNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, passportNumber: e.target.value }))}
              placeholder="US123456789"
              disabled={isLoading}
            />
            {errors.passportNumber && <p className="text-destructive text-sm">{errors.passportNumber}</p>}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status <span className="text-destructive">*</span>
            </label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => setFormData((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger disabled={isLoading}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profile Picture */}
          <div className="space-y-3">
            <label htmlFor="picture" className="text-sm font-medium">
              Profile Picture <span className="text-destructive">*</span>
            </label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="picture"
                className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:bg-primary/5 transition-colors"
              >
                {previewImage ? (
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="w-6 h-6 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground text-center">Upload</span>
                  </div>
                )}
                <input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                  className="hidden"
                />
              </label>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">JPG, PNG or GIF</p>
                <p className="text-xs text-muted-foreground mt-1">Max 5MB</p>
              </div>
            </div>
            {errors.profilePicture && <p className="text-destructive text-sm">{errors.profilePicture}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Applicant"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
