'use client';

import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { Textarea } from '@/components/ui/textarea/textarea';
import { Button } from '@/components/ui/button/button';
import { CheckIcon, FilePenIcon, TrashIcon } from '@/components/ui/icon/icon';
import React from 'react';
import { BookTaskForm } from '@/types/study/book-task-form';

export function BookStudyTaskForm({
  key,
  assignment,
  index,
  editingIndex,
  handleSaveAssignment,
  setEditingIndex
}: BookTaskForm) {
  return (
    <div key={index} className="rounded-md border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          {editingIndex === index ? (
            <div className="space-y-2">
              <div className="text-muted-foreground">Title</div>
              <Input id={`title-${index}`} defaultValue={assignment.chapter} />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`start-page-${index}`}>Start Page</Label>
                  <Input
                    id={`start-page-${index}`}
                    defaultValue={assignment.startPage}
                  />
                </div>
                <div>
                  <Label htmlFor={`end-page-${index}`}>End Page</Label>
                  <Input
                    id={`end-page-${index}`}
                    defaultValue={assignment.endPage}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`content-${index}`}>Content</Label>
                <Textarea
                  id={`content-${index}`}
                  defaultValue={assignment.contents}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <h4 className="text-lg font-medium">{assignment.chapter}</h4>
              <p className="text-muted-foreground text-sm text-slate-500">
                {assignment.startPage} ~ {assignment.endPage} page
              </p>
              <p className="text-muted-foreground">{assignment.contents}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              if (editingIndex === index) {
                handleSaveAssignment(index);
              } else {
                setEditingIndex(index);
              }
            }}
          >
            {editingIndex === index ? (
              <CheckIcon className="h-5 w-5 text-green-500" />
            ) : (
              <>
                <FilePenIcon className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </>
            )}
          </Button>
          <Button variant="ghost" className="text-red-500">
            <TrashIcon className="h-5 w-5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
