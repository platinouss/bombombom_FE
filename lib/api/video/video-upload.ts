import axios from 'axios';
import { getAuthenticationConfig } from '@/lib/utils';

/**
 * AWS S3 multipart 업로드 id 생성 API
 *
 * @param studyId
 * @param assignmentId
 */
export async function generateUploadId(studyId: number, assignmentId: number) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/videos/initiate-upload`,
    { studyId, assignmentId },
    getAuthenticationConfig()
  );
}

/**
 * AWS S3 presigned url 생성 API
 *
 * @param uploadId
 * @param partNumber
 * @param partSize
 * @param studyId
 * @param assignmentId
 */
export async function generatePresignedUrl(
  uploadId: string,
  partNumber: number,
  partSize: number,
  studyId: number,
  assignmentId: number
) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/videos/presigned-url`,
    { uploadId, partNumber, partSize, studyId, assignmentId },
    getAuthenticationConfig()
  );
}

/**
 * AWS S3에 비디오 업로드 API
 *
 * @param presignedUrl
 * @param file
 */
export async function uploadVideo(presignedUrl: string, file: File | Blob) {
  return axios.put(presignedUrl, file);
}

/**
 * AWS S3 multipart 업로드 완료 요청 API
 *
 * @param uploadId
 * @param parts
 * @param studyId
 * @param assignmentId
 */
export async function completeMultipartUpload(
  uploadId: string,
  parts: { partNumber: number; eTag: string }[],
  studyId: number,
  assignmentId: number
) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/videos/complete-upload`,
    { uploadId, parts, studyId, assignmentId },
    getAuthenticationConfig()
  );
}
