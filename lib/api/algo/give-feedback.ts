import { getAuthenticationConfig } from '@/lib/utils';
import { FeedbackAlgorithmProblemReq } from '@/types/algo/feedback';
import axios from 'axios';

/**
 * 알고리즘 문제 난이도 피드백 API
 * @param {FeedbackAlgorithmProblemReq} feedbackAlgorithmProblemReq 피드백 상세정보
 *
 */
export default async function giveDifficultyFeedback(
  feedbackAlgorithmProblemReq: FeedbackAlgorithmProblemReq
) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/feedback`,

    feedbackAlgorithmProblemReq,
    getAuthenticationConfig()
  );
}
