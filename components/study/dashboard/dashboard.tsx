import { Row } from '@/components/study/dashboard/row';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select/select';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table/table';
import { StudyType } from '@/constants/study/study';
import getRound from '@/lib/api/study/get-round';
import { userState } from '@/recoil/userAtom';
import {
  AlgorithmProblemInfo,
  AlgorithmRound,
  BookRound,
  Round,
  StudyDetails
} from '@/types/study/study-detail';
import { useParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import FeedbackDialog from '../feedback-dialog';
import { BookRow } from './book-row';

export default function StudyDashBoard({
  details,
  studyId,
  round,
  setRound
}: {
  details: StudyDetails;
  studyId: number;
  round: Round;
  setRound: (round: Round) => void;
}) {
  const studyType = StudyType[details.studyType as keyof typeof StudyType];
  if (studyType === StudyType.ALGORITHM) {
    return (
      <div className="mt-5 bg-background rounded-lg border p-6 w-full max-w-4xl h-full">
        <DashBoardHeader round={round} setRound={setRound} details={details} />
        <AlgorithmDashBoardBody
          round={round as AlgorithmRound}
          studyId={studyId}
        />
      </div>
    );
  } else if (studyType === StudyType.BOOK) {
    return (
      <div className="mt-5 bg-background rounded-lg border p-6 w-full max-w-4xl h-full">
        <DashBoardHeader round={round} setRound={setRound} details={details} />
        <BookDashBoardBody round={round as BookRound} studyId={studyId} />
      </div>
    );
  }
}

function AlgorithmDashBoardBody({
  round,
  studyId
}: {
  round: AlgorithmRound;
  studyId: number;
}) {
  const [my, _] = useRecoilState(userState);
  const myTasks = round.users[my!.id]?.tasks;
  return (
    <div className="overflow-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">스터디원</TableHead>
            {Object.entries(round.problems).map(
              ([problemId, problem]: [string, AlgorithmProblemInfo], index) => (
                <TableHead key={index} className="text-center">
                  <p>{problem.title}</p>

                  {myTasks?.[Number(problemId)] && (
                    <FeedbackDialog
                      problem={{ ...problem, problemId: Number(problemId) }}
                      studyId={studyId}
                    ></FeedbackDialog>
                  )}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(round.users).map(([key, value]) => (
            <Row
              key={key}
              studyId={Number(studyId)}
              roundIdx={Number(round.idx)}
              userId={Number(key)}
              problems={round.problems}
              user={value}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function BookDashBoardBody({
  round,
  studyId
}: {
  round: BookRound;
  studyId: number;
}) {
  const [my, _] = useRecoilState(userState);
  return (
    <div className="overflow-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">스터디원</TableHead>
            <TableHead className="text-center">과제명</TableHead>
            <TableHead className="text-center">과제 내용</TableHead>
            <TableHead className="text-center">페이지</TableHead>
            <TableHead className="text-center">해설 영상</TableHead>
            <TableHead className="text-center">확인 문제</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(round.users).map(([key, value]) => (
            <BookRow
              key={key}
              studyId={Number(studyId)}
              roundIdx={Number(round.idx)}
              userId={Number(key)}
              assignment={round.assignments[value.assignmentId]}
              user={value}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DashBoardHeader({
  round,
  setRound,
  details
}: {
  details: StudyDetails;
  round: Round;
  setRound: (round: Round) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">{details.name}</h2>
      <SelectRound round={round} setRound={setRound} />
    </div>
  );
}

function SelectRound({
  round,
  setRound
}: {
  round: Round;
  setRound: (round: Round) => void;
}) {
  const params = useParams();
  const studyId = Number(params.id);
  const handleRoundChange = async (value: string) => {
    const newRound = await getRound(studyId, parseInt(value));
    setRound(newRound);
  };
  const renderSelectContent = () => {
    for (let i = 0; i <= round.idx + 1; i++) {
      return (
        <SelectItem value={(i + 1).toString()}>
          {(i + 1).toString() + ' 주차'}
        </SelectItem>
      );
    }
  };

  return (
    <div className="flex items-center w-1/5 justify-end">
      <Select
        value={(round.idx + 1).toString()}
        onValueChange={handleRoundChange}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{renderSelectContent()}</SelectContent>
      </Select>
    </div>
  );
}
