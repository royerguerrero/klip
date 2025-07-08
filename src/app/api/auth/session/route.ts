"use server";

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserSession } from "@/app/admin/(auth)/_lib/data";

export async function GET(request: NextRequest) {
  const user = await getCurrentUserSession();
  return NextResponse.json({ user });
}
