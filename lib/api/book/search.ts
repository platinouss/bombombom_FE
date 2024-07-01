import axios from 'axios';
import { getAuthenticationConfig } from '@/lib/utils';

export async function searchBooks(searchOption: string, keyword: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/books`, {
    params: { keyword, searchOption },
    ...getAuthenticationConfig()
  });
}

export async function searchBooksUsingOpenApi(keyword: string) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/books`,
    {
      keyword
    },
    getAuthenticationConfig()
  );
}
