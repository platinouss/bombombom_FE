import axios from 'axios';

/**
 * 스터디 참여 API
 * body : studyId
 */

export default function joinStudy(studyId: number) {
  const token = localStorage.getItem('accessToken');

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/join`,
    {
      studyId: studyId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
