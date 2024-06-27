'use client';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/study/study';
import studies from '@/lib/api/study/studies';
import { useResource } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Study } from '../../types/study/study';
import StudyJoinDialog from './study-join-dialog';
import StudyPagination, { paging } from './study-pagination';

export default function StudyGrid({ trigger }: { trigger: number }) {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? DEFAULT_PAGE);
  const size = Number(searchParams.get('size') ?? DEFAULT_SIZE);

  const [studyPage, refetch] = useResource(
    () => studies({ page, size }),
    [page, size]
  );

  useEffect(() => {
    if (page == 0) {
      refetch();
    } else {
      paging(0);
    }
  }, [trigger]);
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
        />
      </>
    )
  );
}
