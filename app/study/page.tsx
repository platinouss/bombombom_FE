'use client';

import Header from '@/components/header/header';
import StudyGrid from '@/components/study/study-grid';

import { PlusIcon } from 'lucide-react';

import Link from 'next/link';
import StudyPagination from '@/components/study/study-pagination';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/study/study';
import studies from '@/lib/api/study/studies';
import { StudyPage } from '@/types/study/study';
import { Button } from '@/components/ui/button/button';
import StudyCreateModal from '@/components/study/study-create-modal';

export default async function StudyList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? DEFAULT_PAGE);
  const size = Number(searchParams.get('size') ?? DEFAULT_SIZE);
  const studyPage = await studies({ page, size });

  return (
    <div>
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">스터디 목록</h1>
          <StudyCreateModal></StudyCreateModal>
        </div>
        <StudyGrid {...studyPage} />
        <StudyPagination {...studyPage} />
      </div>
    </div>
  );
}
