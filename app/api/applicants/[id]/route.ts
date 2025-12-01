import { type NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-client";

// GET: Fetch single applicant
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { data, error } = await supabaseAdmin
      .from("applicants")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("[v0] Error fetching applicant:", error);
      return NextResponse.json(
        { error: "Applicant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[v0] Error fetching applicant:", error);
    return NextResponse.json(
      { error: "Failed to fetch applicant" },
      { status: 500 }
    );
  }
}

// PATCH: Update applicant status or other fields
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Add updated_at timestamp and ensure status is lowercase
    const updates = {
      ...body,
      ...(body.status && { status: body.status.toLowerCase() }), // Ensure lowercase for database constraint
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("applicants")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[v0] Supabase update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("[v0] Applicant updated:", id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[v0] Error updating applicant:", error);
    return NextResponse.json(
      { error: "Failed to update applicant" },
      { status: 500 }
    );
  }
}

// DELETE: Remove applicant
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { error } = await supabaseAdmin
      .from("applicants")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[v0] Supabase delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("[v0] Applicant deleted:", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[v0] Error deleting applicant:", error);
    return NextResponse.json(
      { error: "Failed to delete applicant" },
      { status: 500 }
    );
  }
}
