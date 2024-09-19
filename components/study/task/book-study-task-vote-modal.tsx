'use client';

import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog/dialog';
import { CheckIcon } from '@/components/ui/icon/icon';
import { getAssignments } from '@/lib/api/study/assignments';
import voteAssignment from '@/lib/api/study/vote';
import { BookTaskAssignment } from '@/types/study/book-task-form';
import { BookStudyTaskListFormProps } from '@/types/study/book-task-vote';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function BookStudyTaskVoteModal({
  isOpen,
  openChange,
  details,
  nextRoundIdx
}: BookStudyTaskListFormProps) {
  const [firstChoice, setFirstChoice] = useState(-1);
  const [secondChoice, setSecondChoice] = useState(-1);
  const [assignments, setAssignments] = useState<BookTaskAssignment[]>([]);

  const reloadAssignments = async () => {
    if (details.weeks == nextRoundIdx) {
      return;
    }
    setAssignments(await getAssignments(details.id, nextRoundIdx));
  };
  useEffect(() => {
    reloadAssignments();
  }, [details.votingProcess]);
  const handleFirstChoiceClick = (id: number) => {
    if (id === firstChoice) {
      setFirstChoice(-1);
      return;
    }
    if (id === secondChoice) {
      setSecondChoice(-1);
    }
    setFirstChoice(id);
  };

  const handleSecondChoiceClick = (id: number) => {
    if (id === secondChoice) {
      setSecondChoice(-1);
      return;
    }
    if (id === firstChoice) {
      setFirstChoice(-1);
    }
    setSecondChoice(id);
  };

  const handleSubmit = () => {
    if (firstChoice === -1) {
      toast.error('1순위 투표는 필수 입니다.');
      return;
    }

    voteAssignment(details.id, {
      first: firstChoice,
      ...(secondChoice !== -1 && { second: secondChoice })
    })
      .then(() => {
        toast.success('투표를 완료하였습니다.');
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });

    openChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={openChange}>
      <VisuallyHidden>
        <DialogTitle>Book Study Task Vote Modal</DialogTitle>
      </VisuallyHidden>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] items-center overflow-y-auto z-50">
        <h2 className="text-2xl font-bold items-center mt-6">
          스터디 과제 투표하기
        </h2>
        <p className="text-muted-foreground mb-6">
          스터디 과제로 할당 받고 싶은 목차를 선택해 주세요.
        </p>
        <div className="grid gap-4">
          <div
            key="0"
            className="bg-card p-5 rounded-md flex justify-end items-center"
          >
            <div className="flex gap-6">
              <p className="flex items-center justify-end text-lg"> 1순위 </p>
              {details.duplicated === false && (
                <p className="flex items-center justify-end text-lg"> 2순위 </p>
              )}
            </div>
          </div>
          {assignments.map((item) => (
            <div
              key={item.id}
              className="bg-card p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex gap-4">
                <Button
                  className={`flex items-center justify-center ${firstChoice === item.id ? 'bg-slate-800' : ''}`}
                  onClick={() => handleFirstChoiceClick(item.id!)}
                >
                  <CheckIcon
                    className={`w-4 h-4 ${firstChoice === item.id ? 'text-slate-50' : ''}`}
                  />
                </Button>
                {details.duplicated === false && (
                  <Button
                    onClick={() => handleSecondChoiceClick(item.id!)}
                    className={`flex items-center justify-center ${secondChoice === item.id ? 'bg-slate-800' : ''}`}
                  >
                    <CheckIcon
                      className={`w-4 h-4 ${secondChoice === item.id ? 'text-slate-50' : ''}`}
                    />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSubmit}>제출</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
