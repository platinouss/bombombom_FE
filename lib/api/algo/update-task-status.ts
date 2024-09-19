import { getAuthenticationConfig } from '@/lib/utils';
import { UpdateTaskStatusReq } from '@/types/algo/update-task-status';
import axios from 'axios';

/**
 * 알고리즘 과제 해결 여부 갱신 API
 * @param {UpdateTaskStatusReq} updateTaskStatusReq 스터디 회차와 유저 정보
 *
 */
export default async function updateTaskStatus(
  updateTaskStatusReq: UpdateTaskStatusReq
) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/algo/status`,
    updateTaskStatusReq,
    getAuthenticationConfig()
  );
}
