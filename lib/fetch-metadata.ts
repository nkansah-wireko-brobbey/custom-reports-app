import apiClient from "@/lib/axios-client";

export const fetchData = async (endpoint: string, options = {}) => {
  try {
    console.log(`[fetchData] Fetching: ${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);

    const response = await apiClient.get(endpoint, options);
    return response.data; 
  } catch (error: any) {
    console.error(`[fetchData] Error:`, error.response || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};
