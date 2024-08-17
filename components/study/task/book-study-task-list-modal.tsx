'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog/dialog';
import { Button } from '@/components/ui/button/button';
import { Label } from '@/components/ui/label/label';
import { Switch } from '@/components/ui/switch/switch';
import { PlusIcon } from '@/components/ui/icon/icon';
import { BookStudyTaskListFormProps } from '@/types/study/book-task-form';
import { BookStudyTaskForm } from '@/components/study/task/book-study-task-form';

export function BookStudyTaskListModal({
  isOpen,
  setOpen
}: BookStudyTaskListFormProps) {
  const [canMemberEdit, setCanMemberEdit] = useState(false);
  const [enableDuplicateAssignment, setEnableDuplicateAssignment] =
    useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const bookImgUrl =
    'https://shopping-phinf.pstatic.net/main_3248573/32485737619.20240209092102.jpg';
  const bookTitle = '가상 면접 사례로 배우는 대규모 시스템 설계 기초';
  const author = '알렉스 쉬 저/이병준 역';
  const publisher = '인사이트';

  const [assignments, setAssignments] = useState([
    {
      chapter: '1장. 사용자 수에 따른 규모 확장성',
      startPage: 1,
      endPage: 32,
      contents: ' '
    },
    {
      chapter: '2장. 계략적인 규모 추정',
      startPage: 33,
      endPage: 38,
      contents: ' '
    },
    {
      chapter: '3장. 시스템 설계 면접 공략법',
      startPage: 39,
      endPage: 50,
      contents: ' '
    }
  ]);

  const handleAddAssignment = () => {
    setAssignments([
      ...assignments,
      {
        chapter: 'New Assignment',
        startPage: 0,
        endPage: 0,
        contents: ''
      }
    ]);
    setEditingIndex(assignments.length);
  };

  const handleCanMemberEditSwitchChange = (checked: boolean) => {
    setCanMemberEdit(checked);
  };

  const handleDuplicateAssignmentSwitchChange = (checked: boolean) => {
    setEnableDuplicateAssignment(checked);
  };

  const handleSaveAssignment = (index: number) => {
    // TODO: 과제 저장 로직 추가
    // const updatedAssignments = [...assignments];
    // updatedAssignments[index] = {
    //   chapter: document.getElementById(`chapter-${index}`).value,
    //   startPage: parseInt(document.getElementById(`start-page-${index}`).value),
    //   endPage: parseInt(document.getElementById(`end-page-${index}`).value),
    //   contents: document.getElementById(`content-${index}`).value
    // };
    // setAssignments(updatedAssignments);
    // setEditingIndex(-1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto z-50">
        <div className="flex items-start gap-4 mt-6 mb-4">
          <img
            src={bookImgUrl}
            alt="Logo"
            width={96}
            height={96}
            className="w-24 h-24"
            style={{ aspectRatio: '96/96', objectFit: 'contain' }}
          />
          <div>
            <DialogHeader>
              <DialogTitle>{bookTitle}</DialogTitle>
              <DialogDescription>{`${author} | ${publisher}`}</DialogDescription>
            </DialogHeader>
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4 mb-4">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="duplicate-check" className="flex flex-col gap-1">
                <span>편집 허용</span>
                <span className="font-normal leading-snug text-muted-foreground text-slate-500">
                  스터디원도 편집할 수 있도록 허용합니다.
                </span>
              </Label>
              <Switch
                id="duplicate-check"
                checked={canMemberEdit}
                onCheckedChange={handleCanMemberEditSwitchChange}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="duplicate-check" className="flex flex-col gap-1">
                <span>챕터 중복 할당 허용</span>
                <span className="font-normal leading-snug text-muted-foreground text-slate-500">
                  두 명 이상이 투표한 챕터는 해당 챕터를 선택한 스터디원
                  모두에게 과제로 할당됩니다.
                </span>
              </Label>
              <Switch
                id="duplicate-check"
                checked={enableDuplicateAssignment}
                onCheckedChange={handleDuplicateAssignmentSwitchChange}
              />
            </div>
          </div>
          {assignments.map((assignment, index) => {
            return (
              <BookStudyTaskForm
                key={index}
                assignment={assignment}
                index={index}
                editingIndex={editingIndex}
                handleSaveAssignment={handleSaveAssignment}
                setEditingIndex={setEditingIndex}
              ></BookStudyTaskForm>
            );
          })}
          <div className="flex justify-center">
            <Button variant="ghost" onClick={handleAddAssignment}>
              <PlusIcon className="h-5 w-5" />
              <span className="sr-only">Add Assignment</span>
            </Button>
          </div>
        </div>
        <DialogFooter className="z-55">
          <div>
            <Button>투표 생성하기</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
