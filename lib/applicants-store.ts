import type { Applicant } from "@/lib/applicants-data"

// In-memory store (persists during server lifetime)
// In production, this can be replaced with a database
let applicantsStore: Applicant[] = [
  {
    id: "1",
    name: "John Doe",
    age: 28,
    phone: "+1-555-0101",
    passportNumber: "US123456789",
    status: "accepted",
    profilePicture: "/church-member.png",
    dateAdded: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    age: 34,
    phone: "+1-555-0102",
    passportNumber: "US987654321",
    status: "pending",
    profilePicture: "/church-member.png",
    dateAdded: new Date().toISOString(),
  },
]

export const getApplicantsStore = () => applicantsStore

export const setApplicantsStore = (newStore: Applicant[]) => {
  applicantsStore = newStore
}

export const addToStore = (applicant: Applicant) => {
  applicantsStore.push(applicant)
  return applicant
}

export const removeFromStore = (id: string) => {
  applicantsStore = applicantsStore.filter((app) => app.id !== id)
}

export const updateInStore = (id: string, updates: Partial<Applicant>) => {
  applicantsStore = applicantsStore.map((app) => (app.id === id ? { ...app, ...updates } : app))
  return applicantsStore.find((app) => app.id === id)
}
