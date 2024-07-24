import { AlgorithmRound } from '@/types/study/study-detail';
import axios from 'axios';

/**
 * 스터디 디테일 조회 API
 */
export default async function getRound(id: number, idx: number): Promise<AlgorithmRound> {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/progress/` + id, {
      params: { idx: idx }
    })
    .then((response) => response.data);
}
