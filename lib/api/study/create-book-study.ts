import { getAuthenticationConfig } from '@/lib/utils';
import {
  RegisterAlgorithmStudyReq,
  RegisterBookStudyReq
} from '@/types/study/register-study';
import { BookStudy } from '@/types/study/study';
import axios from 'axios';

/**
 * 기술서적 스터디 생성 API
 * @param {RegisterBookStudyReq} registerBookStudyReq 기술서적 스터디 상세정보
 *
 */
export default async function registerAlgorithmStudy(
  registerBookStudyReq: RegisterBookStudyReq
): Promise<BookStudy> {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/book`,
      registerBookStudyReq,
      getAuthenticationConfig()
    )
    .then((response) => response.data as BookStudy);
}
