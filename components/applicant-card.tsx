"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2, Phone, Smartphone } from "lucide-react"
import type { Applicant } from "@/lib/applicants-data"

interface ApplicantCardProps {
  applicant: Applicant
  onStatusChange: (id: string, status: Applicant["status"]) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Omit<Applicant, "id" | "dateAdded">) => Promise<void> | void
  isOwnerMode?: boolean
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

export default function ApplicantCard({
  applicant,
  onStatusChange,
  onDelete,
  onUpdate,
  isOwnerMode = false,
}: ApplicantCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editData, setEditData] = useState({
    name: applicant.name,
    age: applicant.age.toString(),
    phone: applicant.phone,
    passportNumber: applicant.passportNumber,
    status: applicant.status,
    profilePicture: applicant.profilePicture || "",
  })

  useEffect(() => {
    if (!isEditing) {
      setEditData({
        name: applicant.name,
        age: applicant.age.toString(),
        phone: applicant.phone,
        passportNumber: applicant.passportNumber,
        status: applicant.status,
        profilePicture: applicant.profilePicture || "",
      })
    }
  }, [applicant, isEditing])

  const handleSave = async () => {
    setError(null)
    setIsSaving(true)

    if (!editData.name.trim() || !editData.phone.trim() || !editData.passportNumber.trim()) {
      setError("Name, phone, and passport number are required")
      setIsSaving(false)
      return
    }

    const ageNumber = Number(editData.age)
    if (Number.isNaN(ageNumber) || ageNumber < 1) {
      setError("Age must be a positive number")
      setIsSaving(false)
      return
    }

    try {
      await onUpdate(applicant.id, {
        name: editData.name.trim(),
        age: ageNumber,
        phone: editData.phone.trim(),
        passportNumber: editData.passportNumber.trim(),
        status: editData.status,
        profilePicture: editData.profilePicture,
      })
      setIsEditing(false)
    } catch (err) {
      console.error("[v0] Error saving applicant", err)
      setError("Failed to save changes. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          {/* Profile Picture - Circular */}
          <div className="flex-shrink-0">
            <img
              src={applicant.profilePicture || "/placeholder.svg"}
              alt={applicant.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
            />
          </div>

          {/* Content and Status */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{applicant.name}</h3>
                <p className="text-sm text-muted-foreground">{applicant.age} years old</p>
              </div>
              <Badge className={statusColors[applicant.status]}>
                {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
              </Badge>
            </div>

            {/* Information List */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <a href={`tel:${applicant.phone}`} className="hover:text-primary">
                  {applicant.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Smartphone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Passport: {applicant.passportNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Owner Controls */}
        {isOwnerMode && (
          <div className="mt-4 pt-4 border-t space-y-3">
            {isEditing ? (
              <div className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Full name"
                    disabled={isSaving}
                  />
                  <Input
                    type="number"
                    value={editData.age}
                    onChange={(e) => setEditData((prev) => ({ ...prev, age: e.target.value }))}
                    placeholder="Age"
                    disabled={isSaving}
                  />
                  <Input
                    value={editData.phone}
                    onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Phone"
                    disabled={isSaving}
                  />
                  <Input
                    value={editData.passportNumber}
                    onChange={(e) => setEditData((prev) => ({ ...prev, passportNumber: e.target.value }))}
                    placeholder="Passport number"
                    disabled={isSaving}
                  />
                </div>

                <Select
                  value={editData.status}
                  onValueChange={(value: Applicant["status"]) =>
                    setEditData((prev) => ({ ...prev, status: value }))
                  }
                  disabled={isSaving}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  value={editData.profilePicture}
                  onChange={(e) => setEditData((prev) => ({ ...prev, profilePicture: e.target.value }))}
                  placeholder="Profile picture URL or base64 data"
                  disabled={isSaving}
                />

                {error && <p className="text-destructive text-sm">{error}</p>}

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save changes"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsEditing(false)
                      setError(null)
                    }}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Select value={applicant.status} onValueChange={(value: any) => onStatusChange(applicant.id, value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="secondary"
                    className="flex-1 justify-center gap-2 py-3 text-sm font-semibold shadow-sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="w-5 h-5" />
                    Edit details
                  </Button>
                  <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="flex-1 justify-center gap-2 py-3 text-sm font-semibold shadow-sm"
                      >
                        <Trash2 className="w-5 h-5" />
                        Delete member
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete <span className="font-semibold">{applicant.name}</span> from the system. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          variant="destructive"
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => {
                            onDelete(applicant.id)
                            setIsDeleteDialogOpen(false)
                          }}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
