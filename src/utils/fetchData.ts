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
  try {
    // For client-side requests, use the Next.js API route as a proxy
    const isClient = typeof window !== "undefined";
    let url = endpoint;

    if (isClient) {
      // When running on the client, use the local API route
      // Remove the /api prefix as our Next.js API routes will handle this
      const localEndpoint = endpoint.startsWith("/api/")
        ? endpoint
        : `/api${endpoint}`;
      url = localEndpoint;
    } else {
      // When running on the server, use the full Strapi URL with token
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
      const token = process.env.STRAPI_API_TOKEN; // Changed to non-public env var for server-side

      if (!baseUrl) {
        throw new Error(
          "Environment variable 'NEXT_PUBLIC_STRAPI_URL' is not defined."
        );
      }

      if (!token) {
        throw new Error(
          "Environment variable 'STRAPI_API_TOKEN' is not defined."
        );
      }

      url = `${baseUrl}${endpoint}`;

      // Add authorization header for server-side requests
      return axios
        .get<StrapiResponse<T>>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        })
        .then((response) => response.data);
    }

    // Client-side requests don't need the token as they go through our API route
    const response = await axios.get<StrapiResponse<T>>(url, {
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
      console.error(
        `Error fetching data from ${endpoint}:`,
        axiosError.message
      );
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
