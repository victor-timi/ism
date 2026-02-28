import axios from "axios";

export interface ApiErrorResponse {
  error: string;
  fieldErrors?: Record<string, string[]>;
}

export const apiClient = axios.create({
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.data) {
      const data = error.response.data as ApiErrorResponse;
      return Promise.reject(new ApiError(data.error, data.fieldErrors));
    }
    return Promise.reject(
      new ApiError("Something went wrong. Please try again."),
    );
  },
);

export class ApiError extends Error {
  fieldErrors?: Record<string, string[]>;

  constructor(message: string, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.fieldErrors = fieldErrors;
  }
}
