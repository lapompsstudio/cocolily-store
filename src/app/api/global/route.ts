import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    // Direct server-side call to Strapi API
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const strapiToken = process.env.STRAPI_API_TOKEN;
    
    if (!strapiUrl || !strapiToken) {
      throw new Error("Missing required environment variables");
    }
    
    // Include the token in the request to Strapi
    const response = await axios.get(`${strapiUrl}/api/global?populate=*`, {
      headers: {
        Authorization: `Bearer ${strapiToken}`
      }
    });
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Failed to fetch global data:", error);
    return NextResponse.json(
      { error: "Failed to fetch global data" },
      { status: 500 }
    );
  }
}
