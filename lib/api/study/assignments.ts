import { getAuthenticationConfig } from '@/lib/utils';
import { BookTaskAssignment } from '@/types/study/book-task-form';
import axios from 'axios';

/**
 * 과제목록 조회 API
 */
export async function getAssignments(
  id: number,
  idx: number
): Promise<BookTaskAssignment[]> {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/${id}/assignments`,
      { params: { roundIdx: idx } }
    )
    .then((response) => response.data);
}

/**
 * 과제목록 추가 API
 */
export async function addAssignments(
  id: number,
  idx: number,
  assignments: BookTaskAssignment[]
): Promise<BookTaskAssignment[]> {
  const token = localStorage.getItem('accessToken');

  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/${id}/assignments`,
      { roundIdx: idx, assignments },

      getAuthenticationConfig()
    )
    .then((response) => response.data);
}

/**
 * 과제목록 수정 API
 */
export async function editAssignments(
  id: number,
  idx: number,
  assignments: BookTaskAssignment[]
): Promise<BookTaskAssignment[]> {
  return axios
    .put(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/${id}/assignments`,
      { roundIdx: idx, assignments },
      getAuthenticationConfig()
    )
    .then((response) => response.data);
}

/**
 * 과제목록 삭제 API
 */
export async function removeAssignments(
  id: number,
  idx: number,
  assignmentIds: number[]
): Promise<BookTaskAssignment[]> {
  return axios
    .delete(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies/${id}/assignments`,
      {
        ...getAuthenticationConfig(),
        data: { roundIdx: idx, assignmentIds }
      }
    )
    .then((response) => response.data);
}
