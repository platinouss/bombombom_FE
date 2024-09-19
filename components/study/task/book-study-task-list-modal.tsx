'use client';

import { BookStudyTaskForm } from '@/components/study/task/book-study-task-form';
import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog/dialog';
import { PlusIcon } from '@/components/ui/icon/icon';
import { Label } from '@/components/ui/label/label';
import { Switch } from '@/components/ui/switch/switch';
import {
  addAssignments,
  editAssignments,
  getAssignments,
  removeAssignments
} from '@/lib/api/study/assignments';
import configStudy from '@/lib/api/study/config-study';
import startVoting from '@/lib/api/study/start-voting';
import {
  BookStudyTaskListFormProps,
  BookTaskAssignment
} from '@/types/study/book-task-form';
import { ConfigStudyReq } from '@/types/study/register-study';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function BookStudyTaskListModal({
  isOpen,
  setOpen,
  details,
  refresh,
  nextRoundIdx
}: BookStudyTaskListFormProps) {
  const [canMemberEdit, setCanMemberEdit] = useState(false);
  const [enableDuplicateAssignment, setEnableDuplicateAssignment] = useState(
    details.duplicated
  );
  const [editingIndex, setEditingIndex] = useState(-1);
  const [assignments, setAssignments] = useState<BookTaskAssignment[]>([]);
  const bookInfo = details.bookInfo;
  const bookImgUrl = bookInfo.imageUrl;
  const bookTitle = bookInfo.title;
  const author = bookInfo.author;
  const publisher = bookInfo.publisher;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [trash, setTrash] = useState<number[]>([]);
  const reloadAssignments = async () => {
    if (details.weeks == nextRoundIdx) {
      return;
    }
    setAssignments(await getAssignments(details.id, nextRoundIdx));
  };
  useEffect(() => {
    reloadAssignments();
  }, []);

  const handleAddAssignment = () => {
    setAssignments([
      ...assignments,
      {
        id: null,
        title: '과제명',
        pageStart: 0,
        pageEnd: 0,
        description: ''
      } as BookTaskAssignment
    ]);
    setEditingIndex(assignments.length);
  };

  const handleCanMemberEditSwitchChange = (checked: boolean) => {
    setCanMemberEdit(checked);
  };

  const handleDuplicateAssignmentSwitchChange = (checked: boolean) => {
    if (isLoading) {
      return;
    }
    const configStudyReq = {
      duplicated: checked
    } as ConfigStudyReq;

    configStudy(details.id, configStudyReq)
      .then(() => {
        setEnableDuplicateAssignment(checked);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setLoading(false);
      });

    setLoading(true);
  };

  const handleSaveAssignment = (index: number) => {
    const assign = {
      id:
        parseInt((document.getElementById(`id-${index}`) as any).value) || null,
      title: (document.getElementById(`title-${index}`) as any).value,
      pageStart: parseInt(
        (document.getElementById(`start-page-${index}`) as any).value
      ),
      pageEnd: parseInt(
        (document.getElementById(`end-page-${index}`) as any).value
      ),
      description: (document.getElementById(`content-${index}`) as any).value
    } as BookTaskAssignment;
    assignments[index] = assign;

    setAssignments(assignments);
    setEditingIndex(-1);
  };

  const handleDeleteAssignment = (index: number) => {
    const id = assignments.splice(index, 1)[0].id;
    if (id !== null) {
      trash.push(id);
    }

    setAssignments([...assignments]);
    setEditingIndex(-1);
  };
  const handleStartVote = () => {
    startVoting(details.id)
      .then(() => {
        toast.success('투표가 시작되었습니다.');
        refresh();
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const saveBtnClickListener = () => {
    if (isLoading) {
      return;
    }
    Promise.all([
      addAssignments(
        details.id,
        nextRoundIdx,
        assignments.filter((a) => a.id === null)
      ),
      trash.length && removeAssignments(details.id, nextRoundIdx, trash),
      editAssignments(
        details.id,
        nextRoundIdx,
        assignments.filter((a) => a.id !== null)
      )
    ])
      .then((response) => {
        toast.success('과제 목록을 저장하였습니다');
        return reloadAssignments();
      })
      .then(() => setLoading(false))
      .catch((error) => {
        toast.error(error.response.data.message ?? error.response.data.error);
        setLoading(false);
      });
    setLoading(true);
    setTrash([]);
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
                handleDeleteAssignment={handleDeleteAssignment}
                setEditingIndex={setEditingIndex}
              ></BookStudyTaskForm>
            );
          })}
          <div className="flex justify-center">
            <Button variant="ghost" onClick={handleAddAssignment}>
              <PlusIcon className="h-5 w-5" />
              <span className="sr-only">선택지 추가하기</span>
            </Button>
          </div>
        </div>
        <DialogFooter className="z-55">
          <div>
            <Button onClick={saveBtnClickListener}>저장하기</Button>
          </div>
          <div>
            <Button onClick={handleStartVote}>투표 시작하기</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
