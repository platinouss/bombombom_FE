import { Suspense } from 'react';
import StudyGroup from './study-group';
import { Study, StudyPage } from '../../types/study/study';
import studies from '@/lib/api/study/studies';
import StudyJoinDialog from './study-join-dialog';

export default async function StudyGrid(studyPage: StudyPage) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {studyPage.contents.map((study: Study) => {
        return <StudyJoinDialog key={study.id} {...study} />;
      })}
    </div>
  );
}
