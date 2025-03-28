import axios from "axios";

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchData<T>(
  endpoint: string
): Promise<StrapiResponse<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!baseUrl) {
    throw new Error(
      "Environment variable 'NEXT_PUBLIC_STRAPI_URL' is not defined."
    );
  }

  if (!token) {
    throw new Error(
      "Environment variable 'NEXT_PUBLIC_STRAPI_API_TOKEN' is not defined."
    );
  }

  const fullUrl = `${baseUrl}${endpoint}`;

  try {
    const response = await axios.get<StrapiResponse<T>>(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000,
    });

    return response.data;
  } catch (error) {
    // Handle Axios errors properly
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
        message: string;
      };
      console.error(`Error fetching data from ${fullUrl}:`, axiosError.message);
      throw new Error(
        axiosError.response?.data?.message ||
          "An error occurred while fetching data."
      );
    }

    // Handle non-Axios errors
    console.error(`Unknown error occurred:`, error);
    throw new Error("An unknown error occurred while fetching data.");
  }
}

export const fetchDataSEO = async (params: string): Promise<unknown> => {
  const reqOptions: RequestInit = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    cache: "no-store" as const,
  };

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}${params}`,
    reqOptions
  );

  const response = await request.json();

  return response;
};
