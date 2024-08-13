import axios from 'axios';

/**
 * 스터디 시작 API
 * body : studyId
 */

export default function startStudy(studyId: number) {
  const token = localStorage.getItem('accessToken');

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/start`,
    {
      studyId: studyId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
