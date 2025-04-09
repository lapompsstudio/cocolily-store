import { NextResponse } from "next/server";
import { fetchData } from "@/utils/fetchData";

export async function GET() {
  try {
    const data = await fetchData(
      "/api/event-data?populate[events][populate]=*&populate[upcomingEvents][populate]=*"
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
