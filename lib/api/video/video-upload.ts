import axios from 'axios';
import { getAuthenticationConfig } from '@/lib/utils';

/**
 * AWS S3 multipart 업로드 id 생성 API
 *
 * @param studyId
 * @param userId
 */
export async function generateUploadId(studyId: number, userId: number) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/videos/initiate-upload`,
    { studyId, userId },
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
 * @param userId
 */
export async function generatePresignedUrl(
  uploadId: string,
  partNumber: number,
  partSize: number,
  studyId: number,
  userId: number
) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/videos/presigned-url`,
    { uploadId, partNumber, partSize, studyId, userId },
    getAuthenticationConfig()
  );
}

/**
 * AWS S3에 비디오 업로드 API
 *
 * @param presignedUrl
 * @param file
 */
export async function uploadVideo(presignedUrl: string, file: File) {
  return axios.put(presignedUrl, file);
}

/**
 * AWS S3 multipart 업로드 완료 요청 API
 *
 * @param uploadId
 * @param objectName
 * @param parts
 * @param studyId
 * @param userId
 */
export async function completeMultipartUpload(
  uploadId: string,
  parts: { partNumber: number; eTag: string }[],
  studyId: number,
  userId: number
) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/videos/complete-upload`,
    { uploadId, parts, studyId, userId },
    getAuthenticationConfig()
  );
}
