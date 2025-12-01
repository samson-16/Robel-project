"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Phone, Smartphone } from "lucide-react"
import type { Applicant } from "@/lib/applicants-data"

interface ApplicantCardProps {
  applicant: Applicant
  onStatusChange: (id: string, status: Applicant["status"]) => void
  onDelete: (id: string) => void
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
  isOwnerMode = false,
}: ApplicantCardProps) {
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
          <div className="mt-4 pt-4 border-t space-y-2">
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
            <Button variant="destructive" size="sm" className="w-full" onClick={() => onDelete(applicant.id)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
