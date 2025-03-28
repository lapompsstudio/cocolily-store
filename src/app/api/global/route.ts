import { NextResponse } from "next/server";
import { fetchData } from "@/utils/fetchData";

export async function GET() {
  try {
    const response = await fetchData("/api/global");
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch global data" },
      { status: 500 }
    );
  }
}
