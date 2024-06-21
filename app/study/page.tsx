'use client';

import Header from '@/components/header/header';
import StudyGrid from '@/components/study/study-grid';

import { PlusIcon } from 'lucide-react';

import Link from 'next/link';
import { Suspense } from 'react';
import StudyPagination from '@/components/study/study-pagination';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/study/study';
import studies from '@/lib/api/study/studies';
import { StudyPage } from '@/types/study/study';

export default async function StudyList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? DEFAULT_PAGE);
  const size = Number(searchParams.get('size') ?? DEFAULT_SIZE);

  const studyPage: StudyPage = await studies({
    page,
    size
  });
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">스터디 목록</h1>
          <Link
            href="/study/new"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            <PlusIcon className="w-4 h-4 mr-2 " />
            스터디 개설하기
          </Link>
        </div>

        <StudyGrid {...studyPage} />

        <StudyPagination {...studyPage} />
      </div>
    </div>
  );
}
