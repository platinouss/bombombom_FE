import axios from 'axios';

/**
 * 알고리즘 문제 해결 여부 확인 API
 *
 * @param baekjoonId
 * @param refIds
 */
export default function checkAlgorithmProblemSolved(
  baekjoonId: string,
  refIds: number[]
) {
  const params = new URLSearchParams();
  const queryParam = generateSearchSolvedProblemQueryParam(baekjoonId, refIds);
  params.append('query', queryParam);
  return axios.get(`/solvedac/search/problem`, { params });
}

const generateSearchSolvedProblemQueryParam = (
  baekjoonId: string,
  refIds: number[]
) => {
  return `s@${baekjoonId}&id:(${refIds.join('|')})`;
};
