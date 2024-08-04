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
import getRound from '@/lib/api/study/get-round';
import { userState } from '@/recoil/userAtom';
import {
  AlgorithmProblemInfo,
  AlgorithmRound,
  StudyDetails
} from '@/types/study/study-detail';
import { useParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import FeedbackDialog from '../feedback-dialog';

export default function StudyDashBoard({
  details,
  studyId,
  round,
  setRound
}: {
  details: StudyDetails;
  studyId: number;
  round: AlgorithmRound;
  setRound: (round: AlgorithmRound) => void;
}) {
  return (
    <div className="mt-5 bg-background rounded-lg border p-6 w-full max-w-4xl h-full">
      <DashBoardHeader round={round} setRound={setRound} details={details} />
      <DashBoardBody round={round} studyId={studyId} />
    </div>
  );
}

function DashBoardBody({
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

function DashBoardHeader({
  round,
  setRound,
  details
}: {
  details: StudyDetails;
  round: AlgorithmRound;
  setRound: (round: AlgorithmRound) => void;
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
  round: AlgorithmRound;
  setRound: (round: AlgorithmRound) => void;
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
