import { NextResponse } from "next/server";
import { fetchData } from "@/utils/fetchData";

export async function POST(request: Request) {
  try {
    const { documentId } = await request.json(); // jika kamu kirim data dari body
    const datas = await fetchData(
      `/api/events/${documentId}?populate[Experience][populate][image][populate]=image`
    );

    console.log(documentId);

    return NextResponse.json(datas);
  } catch (error) {
    console.log("Error fetching data:", error);
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
