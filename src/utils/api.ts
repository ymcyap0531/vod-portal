import axios, { AxiosInstance } from "axios";
import { Movies } from "../types";

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

class HttpClient {
  readonly apiUrl: string;
  private client: AxiosInstance;

  constructor() {
    // this.apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
    this.apiUrl = "${process.env.NEXT_PUBLIC_API_URL}";
    this.client = axios;
  }

  async getMovie(id: number) {
    const { data } = await this.client.get(`${this.apiUrl}/movies/${id}/`, {
      headers: myHeaders,
    });
    return data;
  }

  async getAllMovies(): Promise<Movies[]> {
    const { data } = await this.client.get(`${this.apiUrl}/movies/`, {
      headers: myHeaders,
    });
    console.log("data", data);
    return data;
  }

  async getMoviesByCategory(category: string) {
    const { data } = await this.client.get(
      `${this.apiUrl}/movies?filters[categories][name][$eq]=${category}`,
      {
        headers: myHeaders,
      }
    );
    return data;
  }
}

export const client = new HttpClient();
