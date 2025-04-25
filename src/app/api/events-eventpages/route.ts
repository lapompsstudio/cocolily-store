import { NextResponse } from "next/server";
import { fetchData } from "@/utils/fetchData";

export async function GET() {
  try {
    const data = await fetchData(
      "/api/featured-hero-events-page?populate[events][populate]=*"
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
