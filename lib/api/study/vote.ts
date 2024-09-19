import { getAuthenticationConfig } from '@/lib/utils';
import { VoteAssignmentReq } from '@/types/study/study-detail';
import axios from 'axios';

/**
 * 과제 투표 API
 * @param {VoteAssignmentReq} voteAssignmentReq 스터디 설정 정보
 *
 */
export default async function voteAssignment(
  id: number,
  voteAssignmentReq: VoteAssignmentReq
): Promise<void> {
  return axios
    .put(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/${id}/vote`,

      voteAssignmentReq,
      getAuthenticationConfig()
    )
    .then((response) => response.data);
}
