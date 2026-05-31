import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fullName, email, phone, collegeName, domainTrack, razorpay_payment_id, referralCode } = body;

    // Basic validation — all fields are required
    if (!fullName || !email || !phone || !collegeName || !domainTrack || !razorpay_payment_id) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Fallback to NEXT_PUBLIC_SUPABASE_URL if SUPABASE_URL is missing
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.");
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    // Initialize the Supabase admin client using service role key (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload = {
      full_name: fullName,
      email,
      phone,
      college_name: collegeName,
      domain_track: domainTrack,
      payment_id: razorpay_payment_id,
      referral_code: referralCode || null,
    };


    const { error } = await supabase.from("registrations").insert([payload]);

    if (error) {
      console.error("Supabase insert error details:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save registration." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error in save-registration route:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
