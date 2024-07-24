import { StudyDetailsAndRound } from '@/types/study/study-detail';
import axios from 'axios';

/**
 * 스터디 디테일 조회 API
 */
export default async function getStudyDetails(id: string): Promise<StudyDetailsAndRound> {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/` + id)
    .then((response) => response.data);
}
