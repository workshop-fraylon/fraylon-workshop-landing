import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email) {
      return NextResponse.json(
        { registered: false, error: "Email is required." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { registered: false, error: "Server configuration error." },
        { status: 500 },
      );
    }

    const { data, error } = await supabase
      .from("registrations")
      .select("id")
      .ilike("email", email)
      .limit(1);

    if (error) {
      console.error("check-registration error:", error);
      return NextResponse.json(
        { registered: false, error: "Could not verify email." },
        { status: 500 },
      );
    }

    return NextResponse.json({ registered: (data?.length ?? 0) > 0 }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error in check-registration:", err);
    return NextResponse.json(
      { registered: false, error: "Internal server error." },
      { status: 500 },
    );
  }
}
