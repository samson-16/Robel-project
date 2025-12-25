"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import OwnerLogin from "@/components/owner-login"
import ApplicantForm from "@/components/applicant-form"
import ApplicantCard from "@/components/applicant-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Loader2 } from "lucide-react"
import type { Applicant } from "@/lib/applicants-data"
import { useApplicants } from "@/hooks/use-applicants"

export default function MembersPage() {
  const [isOwnerMode, setIsOwnerMode] = useState(false)
  const { applicants, addApplicant, updateApplicant, deleteApplicant, isLoading } = useApplicants()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleUpdateApplicant = async (id: string, updates: Omit<Applicant, "id" | "dateAdded">) => {
    try {
      await updateApplicant(id, updates)
    } catch (error) {
      console.error("[v0] Error updating applicant:", error)
    }
  }

  const handleAddApplicant = async (newApplicant: Omit<Applicant, "id" | "dateAdded">) => {
    setIsSubmitting(true)
    try {
      await addApplicant(newApplicant)
    } catch (error) {
      console.error("[v0] Error adding applicant:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusChange = (id: string, status: Applicant["status"]) => {
    updateApplicant(id, { status })
  }

  const handleDelete = (id: string) => {
    deleteApplicant(id)
  }

  if (!isOwnerMode) {
    return (
      <>
        <Header />
        <OwnerLogin onLoginSuccess={() => setIsOwnerMode(true)} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main
        className="min-h-screen bg-background text-foreground py-12 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=1080&width=1920&query=Lutheran church interior with wooden pews stained glass windows candles light streaming)",
          backgroundColor: "rgba(0,0,0,0.5)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold">Member Management</h1>
              <p className="text-muted-foreground mt-2">Manage church members and applicants</p>
            </div>
            <Button variant="outline" onClick={() => setIsOwnerMode(false)} className="gap-2">
              <LogOut className="w-4 h-4" />
              Exit Owner Mode
            </Button>
          </div>

          <Tabs defaultValue="add" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="add">Add New</TabsTrigger>
              <TabsTrigger value="view">View All ({applicants.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="add" className="space-y-6">
              <ApplicantForm onSubmit={handleAddApplicant} isLoading={isSubmitting} />
            </TabsContent>

            <TabsContent value="view" className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : applicants.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No applicants yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applicants.map((applicant) => (
                    <ApplicantCard
                      key={applicant.id}
                      applicant={applicant}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDelete}
                      onUpdate={handleUpdateApplicant}
                      isOwnerMode={true}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}
