"use client";

import { useState, useEffect } from "react";
import ApplicantCard from "@/components/applicant-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Applicant {
  id: string;
  name: string;
  age: number;
  phone: string;
  passport_number: string;
  status: "pending" | "rejected" | "accepted";
  profile_picture: string | null;
  date_added: string;
}

export default function ApplicantsSection() {
  const [allApplicants, setAllApplicants] = useState<Applicant[]>([]);
  const [displayedApplicants, setDisplayedApplicants] = useState<Applicant[]>(
    []
  );
  const [acceptedOnly, setAcceptedOnly] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch applicants from API
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch("/api/applicants");
        if (response.ok) {
          const data = await response.json();
          setAllApplicants(data);
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  // Filter applicants based on acceptedOnly toggle
  useEffect(() => {
    if (acceptedOnly) {
      setDisplayedApplicants(
        allApplicants.filter((a) => a.status === "accepted")
      );
    } else {
      setDisplayedApplicants(allApplicants);
    }
  }, [acceptedOnly, allApplicants]);

  const acceptedCount = allApplicants.filter(
    (a) => a.status === "accepted"
  ).length;
  const totalCount = allApplicants.length;

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-muted/30 to-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading members...</p>
          </div>
        </div>
      </section>
    );
  }

  if (displayedApplicants.length === 0 && acceptedOnly) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Church Members</h2>
            <p className="text-muted-foreground mt-2">
              Meet our faith community
            </p>
          </div>
          <Link href="/members">
            <Button variant="outline">Manage Members</Button>
          </Link>
        </div>

        <div className="flex gap-2 mb-8">
          <Button
            variant={acceptedOnly ? "default" : "outline"}
            onClick={() => setAcceptedOnly(true)}
          >
            Accepted ({acceptedCount})
          </Button>
          <Button
            variant={!acceptedOnly ? "default" : "outline"}
            onClick={() => setAcceptedOnly(false)}
          >
            All Applicants ({totalCount})
          </Button>
        </div>

        {displayedApplicants.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No applicants to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {displayedApplicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={{
                  id: applicant.id,
                  name: applicant.name,
                  age: applicant.age,
                  phone: applicant.phone,
                  passportNumber: applicant.passport_number,
                  status: applicant.status,
                  profilePicture:
                    applicant.profile_picture || "/church-member.png",
                  dateAdded: applicant.date_added,
                }}
                onStatusChange={() => {}}
                onDelete={() => {}}
                isOwnerMode={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
