
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { error } = await supabase
    .from("projects")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Supabase connection test failed:", error.message);

    return NextResponse.json(
      { success: false, message: "Supabase query failed." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Supabase connected successfully.",
  });
}
