'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog/dialog';
import { Button } from '@/components/ui/button/button';
import { CheckIcon } from '@/components/ui/icon/icon';
import { BookStudyTaskListFormProps } from '@/types/study/book-task-vote';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function BookStudyTaskVoteModal({
  isOpen,
  openChange
}: BookStudyTaskListFormProps) {
  const [firstChoice, setFirstChoice] = useState(-1);
  const [secondChoice, setSecondChoice] = useState(-1);

  const items = [
    {
      id: 1,
      title: '1장. 사용자 수에 따른 규모 확장성',
      description: ' '
    },
    {
      id: 2,
      title: '2장. 계략적인 규모 추정',
      description: ' '
    },
    {
      id: 3,
      title: '3장. 시스템 설계 면접 공략법',
      description: ' '
    }
  ];

  const handleFirstChoiceClick = (id: number) => {
    if (id === firstChoice) {
      setFirstChoice(-1);
      return;
    }
    setFirstChoice(id);
  };

  const handleSecondChoiceClick = (id: number) => {
    if (id === secondChoice) {
      setSecondChoice(-1);
      return;
    }
    setSecondChoice(id);
  };

  const handleSubmit = () => {
    console.log('First choice:', firstChoice);
    console.log('Second choice:', secondChoice);
    console.log('제출');
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
              <p className="flex items-center justify-end text-lg"> 2순위 </p>
            </div>
          </div>
          {items.map((item) => (
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
                  onClick={() => handleFirstChoiceClick(item.id)}
                >
                  <CheckIcon
                    className={`w-4 h-4 ${firstChoice === item.id ? 'text-slate-50' : ''}`}
                  />
                </Button>
                <Button
                  onClick={() => handleSecondChoiceClick(item.id)}
                  className={`flex items-center justify-center ${secondChoice === item.id ? 'bg-slate-800' : ''}`}
                >
                  <CheckIcon
                    className={`w-4 h-4 ${secondChoice === item.id ? 'text-slate-50' : ''}`}
                  />
                </Button>
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
