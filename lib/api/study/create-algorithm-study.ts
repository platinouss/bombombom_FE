import { getAuthenticationConfig } from '@/lib/utils';
import { Pageable } from '@/types/paging';
import { RegisterAlgorithmStudyReq } from '@/types/study/register-study';
import { AlgorithmStudy, StudyPage } from '@/types/study/study';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';

/**
 * 알고리즘 스터디 생성 API
 * @param {RegisterAlgorithmStudyReq} registerAlgorithmStudyReq 알고리즘 스터디 상세정보
 *
 */
export default async function registerAlgorithmStudy(
  registerAlgorithmStudySchema: RegisterAlgorithmStudyReq
): Promise<AlgorithmStudy> {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/algo`,

      registerAlgorithmStudySchema,
      getAuthenticationConfig()
    )
    .then((response) => response.data as AlgorithmStudy);
}
