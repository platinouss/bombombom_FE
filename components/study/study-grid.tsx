'use client';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/study/study';
import studies from '@/lib/api/study/studies';
import { useResource } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Study } from '../../types/study/study';
import StudyJoinDialog from './study-join-dialog';
import StudyPagination from './study-pagination';

export default function StudyGrid() {
  const searchParams = useSearchParams();

  const [page, setPage] = useState(
    Number(searchParams.get('page') ?? DEFAULT_PAGE)
  );
  const size = Number(searchParams.get('size') ?? DEFAULT_SIZE);

  const [studyPage, refresh] = useResource(() => studies({ page, size }));

  return (
    studyPage && (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyPage?.contents.map((study: Study) => {
            return <StudyJoinDialog key={study.id} {...study} />;
          })}
        </div>
        <StudyPagination
          totalPages={studyPage.totalPages}
          pageNumber={studyPage.pageNumber}
          setPage={setPage}
          refresh={refresh}
        />
      </>
    )
  );
}
