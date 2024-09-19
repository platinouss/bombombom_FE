import { getAuthenticationConfig } from '@/lib/utils';
import { ConfigStudyReq } from '@/types/study/register-study';
import axios from 'axios';

/**
 * 스터디설정 API
 * @param {ConfigStudyReq} configStudyReq 스터디 설정 정보
 *
 */
export default async function configStudy(
  id: number,
  configStudyReq: ConfigStudyReq
): Promise<void> {
  return axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/${id}/config`,

      configStudyReq,
      getAuthenticationConfig()
    )
    .then((response) => response.data);
}
