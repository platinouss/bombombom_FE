'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Upload } from 'lucide-react';
import {
  completeMultipartUpload,
  generatePresignedUrl,
  generateUploadId,
  uploadVideo
} from '@/lib/api/video/video-upload';
import checkVideoUploadStatus from '@/lib/api/study/check-video-upload-status';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/userAtom';
import { BookRound } from '@/types/study/study-detail';
import { VideoUploadButtonProps } from '@/types/study/video-upload-button';

export default function VideoUploadButton({
  studyType,
  studyId,
  round
}: VideoUploadButtonProps) {
  const [myData, setMyData] = useRecoilState(userState);
  const [myAssignmentId, setMyAssignmentId] = useState<number>();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (studyType === 'BOOK' && myData) {
      const BookRound = round as BookRound;
      setMyAssignmentId(BookRound.users[myData.id].assignmentId);
    }
  }, [studyType, myData, round]);

  if (myAssignmentId == null) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file == null) return;

    const completedParts = [];
    const respose = await generateUploadId(studyId, myAssignmentId);
    const uploadId = respose.data.uploadId;

    const partSize = 5 * 1024 * 1024;
    const totalParts = Math.ceil(file.size / partSize);
    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      const start = (partNumber - 1) * partSize;
      const end = Math.min(start + partSize, file.size + 1);
      const chunk = file.slice(start, end);
      const response = await generatePresignedUrl(
        uploadId,
        partNumber,
        chunk.size,
        studyId,
        myAssignmentId
      );
      const presignedUrl = response.data.presignedUrl;
      const result = await uploadVideo(presignedUrl, chunk);
      const eTag = result.headers.etag;
      completedParts.push({ partNumber, eTag });
    }

    const completeResponse = await completeMultipartUpload(
      uploadId,
      completedParts,
      studyId,
      myAssignmentId
    );

    if (completeResponse.status === 200) {
      console.log(myAssignmentId);
      checkVideoUploadStatus(studyId, myAssignmentId).then((response) => {
        if (response.status === 200) {
          toast.success('업로드에 성공했습니다.');
        } else {
          toast.error('업로드에 실패했습니다.');
        }
      });
    } else {
      toast.error('업로드에 실패했습니다.');
    }
    setFile(null);
  };

  return (
    <div className="flex justify-end space-x-2 flex-shrink-0">
      <input
        type="file"
        id="assignment-upload"
        className="sr-only"
        onChange={handleFileChange}
        accept=".mp4,.mov,.avi,.mkv,.wmv,.flv,.webm"
      />
      <label htmlFor="assignment-upload" className="cursor-pointer">
        <Button size="sm" variant="outline" asChild>
          <span>
            <Upload className="w-4 h-4 mr-2" />
            {file ? file.name : '과제 업로드'}
          </span>
        </Button>
      </label>
      {file && (
        <Button size="sm" onClick={handleUpload}>
          업로드
        </Button>
      )}
    </div>
  );
}
