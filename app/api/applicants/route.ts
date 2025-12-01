import { type NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-client";
import { crypto } from "crypto";

// GET: Fetch all applicants
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from("applicants")
      .select("*")
      .order("date_added", { ascending: false });

    if (error) {
      console.error("[v0] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(
      "[v0] Fetched applicants from Supabase, count:",
      data?.length || 0
    );
    return NextResponse.json(data || []);
  } catch (error) {
    console.error("[v0] Error fetching applicants:", error);
    return NextResponse.json(
      { error: "Failed to fetch applicants" },
      { status: 500 }
    );
  }
}

// POST: Add new applicant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[v0] Received POST body:", body);

    const applicantId = crypto.randomUUID();

    const applicantData = {
      id: applicantId, // Include id field from database constraint
      name: body.name,
      age: body.age || 0,
      phone: body.phone,
      passport_number: body.passportNumber || body.passport_number,
      status: (body.status || "pending").toLowerCase(), // Ensure lowercase for database constraint
      profile_picture: body.profilePicture || body.profile_picture || null,
    };

    // Validate required fields
    if (
      !applicantData.name ||
      !applicantData.phone ||
      !applicantData.passport_number
    ) {
      console.log("[v0] Validation failed:", applicantData);
      return NextResponse.json(
        {
          error: "Missing required fields: name, phone, passport_number",
        },
        { status: 400 }
      );
    }

    const newApplicant = {
      ...applicantData,
      date_added: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log("[v0] Inserting applicant with id:", applicantId);

    const { data, error } = await supabaseAdmin
      .from("applicants")
      .insert([newApplicant])
      .select()
      .single();

    if (error) {
      console.error(
        "[v0] Supabase insert error:",
        error.message,
        error.details
      );
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("[v0] Applicant added successfully:", data.name);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("[v0] Error adding applicant:", error);
    return NextResponse.json(
      { error: "Failed to add applicant: " + String(error) },
      { status: 500 }
    );
  }
}
