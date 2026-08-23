import { NextResponse } from "next/server";
import { deleteItem } from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await deleteItem("skills", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
