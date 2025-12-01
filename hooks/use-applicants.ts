import useSWR from "swr"
import type { Applicant } from "@/lib/applicants-data"

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch")
    return res.json()
  })

export function useApplicants() {
  const { data, error, isLoading, mutate } = useSWR<Applicant[]>("/api/applicants", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 0,
  })

  const addApplicant = async (newApplicant: Omit<Applicant, "id" | "dateAdded">) => {
    try {
      console.log("[v0] Submitting new applicant:", newApplicant.name)
      const res = await fetch("/api/applicants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApplicant),
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const applicant = await res.json()
      console.log("[v0] Applicant added, triggering revalidation")

      mutate()
      return applicant
    } catch (error) {
      console.error("[v0] Error adding applicant:", error)
      throw error
    }
  }

  const updateApplicant = async (id: string, updates: Partial<Applicant>) => {
    try {
      console.log("[v0] Updating applicant:", id, updates)
      const res = await fetch(`/api/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const updated = await res.json()
      mutate()
      return updated
    } catch (error) {
      console.error("[v0] Error updating applicant:", error)
      throw error
    }
  }

  const deleteApplicant = async (id: string) => {
    try {
      console.log("[v0] Deleting applicant:", id)
      const res = await fetch(`/api/applicants/${id}`, { method: "DELETE" })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      mutate()
    } catch (error) {
      console.error("[v0] Error deleting applicant:", error)
      throw error
    }
  }

  return {
    applicants: data || [],
    isLoading,
    error,
    addApplicant,
    updateApplicant,
    deleteApplicant,
  }
}
