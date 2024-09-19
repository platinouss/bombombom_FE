'use client';

import StudyAbout from '@/components/study/dashboard/about';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import StudyDashBoard from '@/components/study/dashboard/dashboard';
import JoinStudyDialog from '@/components/study/study-join-dialog';
import { BookStudyTaskListModal } from '@/components/study/task/book-study-task-list-modal';
import { BookStudyTaskVoteModal } from '@/components/study/task/book-study-task-vote-modal';
import { Button } from '@/components/ui/button/button';
import Spinner from '@/components/ui/spinner/spinner';
import { StudyType } from '@/constants/study/study';
import getStudyDetails from '@/lib/api/study/get-details';
import startStudy from '@/lib/api/study/start';
import { userState } from '@/recoil/userAtom';
import {
  BookStudyDetails,
  Round,
  StudyDetails,
  StudyStatus
} from '@/types/study/study-detail';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

export default function StudyPage() {
  const params = useParams();

  const studyId = Number(params.id);

  const [details, setDetails] = useState<StudyDetails | undefined>();
  const [round, setRound] = useState<Round | undefined>();
  const [isParticipant, setIsParticipant] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const [myData, setMyData] = useRecoilState(userState);
  const [trigger, setTrigger] = useState(Date.now());
  const [showPostBoard, setShowPostBoard] = useState(false);
  const [showBookStudyTaskListModal, setShowBookStudyTaskListModal] =
    useState(false);
  const [showBookStudyTaskVoteModal, setShowBookStudyTaskVoteModal] =
    useState(false);
  const [nextRoundIdx, setNextRoundIdx] = useState(0);

  const handleStart = async () => {
    try {
      const response = await startStudy(studyId);
      toast.success('스터디를 시작하였습니다.');
      refresh();
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };
  useEffect(() => {
    async function fetchStudyDetails() {
      try {
        const studyDetailsAndRound = await getStudyDetails(studyId);
        setDetails(studyDetailsAndRound.details);
        setRound(studyDetailsAndRound.round);
        if (studyDetailsAndRound.details.state === StudyStatus.READY) {
          setNextRoundIdx(0);
        } else {
          setNextRoundIdx(studyDetailsAndRound.round.idx + 1);
        }
        for (const [userId, user] of Object.entries(
          studyDetailsAndRound.round.users
        )) {
          if (userId === myData?.id.toString()) {
            setIsParticipant(true);
            break;
          }
        }
        if (
          studyDetailsAndRound.details.leader.id === myData?.id &&
          studyDetailsAndRound.details.state === StudyStatus.READY
        ) {
          setCanStart(true);
        } else {
          setCanStart(false);
        }
      } catch (error) {
        console.error('Failed to fetch study details:', error);
      }
    }
    fetchStudyDetails();
  }, [studyId, trigger]);

  const refresh = () => {
    setTrigger(Date.now());
  };
  if (!details || !round) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex space-x-4 justify-center">
        <StudyDashBoard
          details={details}
          studyId={studyId}
          round={round}
          setRound={setRound}
        />
        <div className="mt-4">
          {isParticipant ? (
            canStart ? (
              <Button onClick={handleStart} className="bg-cyan-300 w-full">
                시작하기
              </Button>
            ) : (
              ''
            )
          ) : (
            <JoinStudyDialog
              details={details}
              studyId={studyId}
              refresh={refresh}
            />
          )}
          <StudyAbout
            details={details}
            nextRoundIdx={nextRoundIdx}
            users={round.users}
            showPostBoard={showPostBoard}
            setShowPostBoard={setShowPostBoard}
            setShowBookStudyTaskListModal={setShowBookStudyTaskListModal}
            setShowBookStudyTaskVoteModal={setShowBookStudyTaskVoteModal}
          />
        </div>
      </div>
      {StudyType[details.studyType as keyof typeof StudyType] ===
        StudyType.BOOK && (
        <>
          <BookStudyTaskListModal
            isOpen={showBookStudyTaskListModal}
            setOpen={setShowBookStudyTaskListModal}
            details={details as BookStudyDetails}
            refresh={refresh}
            nextRoundIdx={nextRoundIdx}
          ></BookStudyTaskListModal>
          <BookStudyTaskVoteModal
            details={details as BookStudyDetails}
            nextRoundIdx={nextRoundIdx}
            isOpen={showBookStudyTaskVoteModal}
            openChange={setShowBookStudyTaskVoteModal}
          ></BookStudyTaskVoteModal>
        </>
      )}
    </>
  );
}
