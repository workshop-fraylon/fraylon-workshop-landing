import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fullName, email, phone, collegeName, domainTrack, razorpay_payment_id } = body;

    // Basic validation — all fields are required
    if (!fullName || !email || !phone || !collegeName || !domainTrack || !razorpay_payment_id) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Initialize the Supabase admin client using service role key (bypasses RLS)
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const payload = {
      full_name: fullName,
      email,
      phone,
      college_name: collegeName,
      domain_track: domainTrack,
      payment_id: razorpay_payment_id,
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
