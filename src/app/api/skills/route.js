export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getItems, insertItem } from "@/lib/db";

export async function GET() {
  const data = await getItems("skills");
  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = await insertItem("skills", body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
