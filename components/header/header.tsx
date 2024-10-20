'use client';

import HeaderNavMenu from '@/components/header/header-nav-menu';
import UserProfileDropDown from '@/components/header/user-profile-drop-down';
import { Button } from '@/components/ui/button/button';
import { LectureIcon, StudyIcon } from '@/components/ui/icon/icon';
import {
  NavigationMenu,
  NavigationMenuList
} from '@/components/ui/navigation/navigation-menu';
import Link from 'next/link';

import { me } from '@/lib/api/users/me'; // API 함수 경로에 맞게 수정
import { userState } from '@/recoil/userAtom';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  completeMultipartUpload,
  generatePresignedUrl,
  generateUploadId,
  uploadVideo
} from '@/lib/api/video/video-upload';

export default function Header() {
  const [user, setUser] = useRecoilState(userState);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null || user !== null) {
      setIsLoading(false);
      return;
    }
    async function fetchUser() {
      try {
        const userData = await me();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [user, setUser]);

  if (isLoading) {
    return null; // 로딩 중에는 아무것도 렌더링하지 않음
  }

  // FIXME: 영상 업로드 버튼 생기면 제거
  const handleFileChange = async (event) => {
    const completedParts = [];
    const file = event.target.files[0];

    // 1. uploadId 생성
    const respose = await generateUploadId(2, 3);
    const uploadId = respose.data.uploadId;

    // 2. 파일 chunk 단위로 presigned-url 생성 후 업로드
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
        2,
        3
      );
      const presignedUrl = response.data.presignedUrl;
      const result = await uploadVideo(presignedUrl, chunk);
      const eTag = result.headers.etag;
      completedParts.push({ partNumber, eTag });
    }

    // 3. 완료 시 api 서버에 multipart 업로드 완료 요청
    const completeResponse = await completeMultipartUpload(
      uploadId,
      completedParts,
      2,
      3
    );
    console.log(completeResponse);
  };

  return pathname === '/login' ? null : (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-gray-100 border-b border-slate-900/10">
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <NavigationMenu className="hidden lg:flex bg-transparent">
        <NavigationMenuList>
          <HeaderNavMenu title="스터디" href="/study" icon={<StudyIcon />} />
          <HeaderNavMenu title="강의" href="#" icon={<LectureIcon />} />
          {/*FIXME: 영상 업로드 버튼 생기면 제거*/}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*" // 비디오 파일만 허용하려면 이 옵션 추가
          />
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto flex gap-2">
        {user ? (
          <UserProfileDropDown {...user} />
        ) : (
          <Link href="/login" prefetch={false}>
            <Button>로그인</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

function MountainIcon(props: Record<string, string>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
