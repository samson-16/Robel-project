"use client"

import { useApplicants } from "@/hooks/use-applicants"
import ApplicantCard from "./applicant-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function ApplicantsSection() {
  const { applicants, isLoading } = useApplicants()
  const acceptedApplicants = applicants.filter((app) => app.status === "accepted")

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Church Members</h2>
          <p className="text-muted-foreground mt-2">Meet the wonderful people in our community</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : acceptedApplicants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No members yet.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {acceptedApplicants.map((applicant) => (
                <ApplicantCard key={applicant.id} applicant={applicant} isOwnerMode={false} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/members">
                <Button variant="default">Manage Members (Owner Only)</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
