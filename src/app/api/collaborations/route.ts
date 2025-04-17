import { NextResponse } from "next/server";
import { fetchData } from "@/utils/fetchData";

export async function GET() {
  try {
    const data = await fetchData("/api/collaborations?populate=*");
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching data:", error);
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
