import { NextResponse } from "next/server";
import { getItems, insertItem } from "@/lib/db";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const data = await insertItem("contacts", {
      name,
      email,
      message,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await getItems("contacts");
    // Sort contacts by date descending
    const sorted = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return NextResponse.json(sorted);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
