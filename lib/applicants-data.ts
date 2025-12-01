// CMS-friendly applicant data structure
export interface Applicant {
  id: string
  name: string
  age: number
  phone: string
  passportNumber: string
  status: "pending" | "rejected" | "accepted"
  profilePicture: string // base64 or image path
  dateAdded: string
}

// In-memory storage (can be replaced with database)
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

export const getApplicants = () => applicantsStore

export const addApplicant = (applicant: Omit<Applicant, "id" | "dateAdded">) => {
  const newApplicant: Applicant = {
    ...applicant,
    id: Date.now().toString(),
    dateAdded: new Date().toISOString(),
  }
  applicantsStore.push(newApplicant)
  return newApplicant
}

export const updateApplicant = (id: string, updates: Partial<Applicant>) => {
  applicantsStore = applicantsStore.map((app) => (app.id === id ? { ...app, ...updates } : app))
  return applicantsStore.find((app) => app.id === id)
}

export const deleteApplicant = (id: string) => {
  applicantsStore = applicantsStore.filter((app) => app.id !== id)
}
