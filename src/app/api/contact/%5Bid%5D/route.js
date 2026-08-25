import { NextResponse } from "next/server";
import { updateItem } from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // We update is_read status
    const data = await updateItem("contacts", id, {
      is_read: body.is_read !== undefined ? body.is_read : true
    });
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
