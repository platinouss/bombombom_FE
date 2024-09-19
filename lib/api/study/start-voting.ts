import { getAuthenticationConfig } from '@/lib/utils';
import axios from 'axios';

/**
 * 스터디 투표 시작 API
 *
 */
export default async function startVoting(id: number): Promise<void> {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/${id}/start-voting`,
      {},
      getAuthenticationConfig()
    )
    .then((response) => response.data);
}
