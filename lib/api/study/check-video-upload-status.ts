import axios from 'axios';
import { getAuthenticationConfig } from '@/lib/utils';

/**
 * 해설 영상 업로드 완료 요청 API
 *
 * @param studyId
 * @param assignmentId
 */
export default function checkVideoUploadStatus(
  studyId: number,
  assignmentId: number
) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/${studyId}/upload-status`,
    { assignmentId: assignmentId },
    getAuthenticationConfig()
  );
}
