"use client"

import { useState, useEffect } from "react"
import ApplicantCard from "@/components/applicant-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Applicant } from "@/lib/applicants-data"
import { getApplicants } from "@/lib/applicants-data"

export default function ApplicantsSection() {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [acceptedOnly, setAcceptedOnly] = useState(true)

  useEffect(() => {
    const allApplicants = getApplicants()
    setApplicants(acceptedOnly ? allApplicants.filter((a) => a.status === "accepted") : allApplicants)
  }, [acceptedOnly])

  if (applicants.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Church Members</h2>
            <p className="text-muted-foreground mt-2">Meet our faith community</p>
          </div>
          <Link href="/members">
            <Button variant="outline">Manage Members</Button>
          </Link>
        </div>

        <div className="flex gap-2 mb-8">
          <Button variant={acceptedOnly ? "default" : "outline"} onClick={() => setAcceptedOnly(true)}>
            Accepted ({applicants.filter((a) => a.status === "accepted").length})
          </Button>
          <Button variant={!acceptedOnly ? "default" : "outline"} onClick={() => setAcceptedOnly(false)}>
            All Applicants ({applicants.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {applicants.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              onStatusChange={() => {}}
              onDelete={() => {}}
              isOwnerMode={false}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
