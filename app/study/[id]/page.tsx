'use client';

import StudyAbout from '@/components/study/dashboard/about';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import StudyDashBoard from '@/components/study/dashboard/dashboard';
import JoinStudyDialog from '@/components/study/study-join-dialog';
import Spinner from '@/components/ui/spinner/spinner';
import getStudyDetails from '@/lib/api/study/get-details';
import { userState } from '@/recoil/userAtom';
import { AlgorithmRound, StudyDetails } from '@/types/study/study-detail';
import { useRecoilState } from 'recoil';

export default function StudyPage() {
  const params = useParams();
  const studyId = params.id.toString();

  const [details, setDetails] = useState<StudyDetails | undefined>();
  const [round, setRound] = useState<AlgorithmRound | undefined>();
  const [isParticipant, setIsParticipant] = useState(false);
  const [myData, setMyData] = useRecoilState(userState);

  useEffect(() => {
    async function fetchStudyDetails() {
      try {
        const studyDetailsAndRound = await getStudyDetails(studyId);
        setDetails(studyDetailsAndRound.details);
        setRound(studyDetailsAndRound.round);
        for (const [userId, user] of Object.entries(
          studyDetailsAndRound.round.users
        )) {
          if (userId === myData?.id.toString()) {
            setIsParticipant(true);
            break;
          }
        }
      } catch (error) {
        console.error('Failed to fetch study details:', error);
      }
    }
    fetchStudyDetails();
  }, [studyId]);

  if (!details || !round) {
    return <Spinner />;
  }
  return (
    <div className="flex space-x-4 justify-center">
      <StudyDashBoard
        details={details}
        studyId={Number(studyId)}
        round={round}
        setRound={setRound}
      />
      <div className="mt-4">
        {isParticipant ? '' : <JoinStudyDialog {...details} key={studyId} />}
        <StudyAbout details={details} users={round.users} />
      </div>
    </div>
  );
}
