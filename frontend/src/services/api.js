import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function predictDiabetes(payload) {
  const { data } = await axios.post(
    `${API_BASE_URL}/predict`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 90000,
    }
  );

  return data;
}

export async function fetchMetadata() {
  const { data } = await axios.get(
    `${API_BASE_URL}/metadata`,
    {
      timeout: 5000,
    }
  );

  return data;
}