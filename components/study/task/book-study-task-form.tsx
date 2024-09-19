'use client';

import { Button } from '@/components/ui/button/button';
import { CheckIcon, FilePenIcon, TrashIcon } from '@/components/ui/icon/icon';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { Textarea } from '@/components/ui/textarea/textarea';
import { BookTaskForm } from '@/types/study/book-task-form';

export function BookStudyTaskForm({
  assignment,
  index,
  editingIndex,
  handleSaveAssignment,
  handleDeleteAssignment,
  setEditingIndex
}: BookTaskForm) {
  return (
    <div key={index} className="rounded-md border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          {editingIndex === index ? (
            <div className="space-y-2">
              <Input
                id={`id-${index}`}
                defaultValue={assignment.id ?? ''}
                type="hidden"
              />
              <div className="text-muted-foreground">Title</div>
              <Input id={`title-${index}`} defaultValue={assignment.title} />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`start-page-${index}`}>Start Page</Label>
                  <Input
                    id={`start-page-${index}`}
                    defaultValue={assignment.pageStart}
                  />
                </div>
                <div>
                  <Label htmlFor={`end-page-${index}`}>End Page</Label>
                  <Input
                    id={`end-page-${index}`}
                    defaultValue={assignment.pageEnd}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`content-${index}`}>Content</Label>
                <Textarea
                  id={`content-${index}`}
                  defaultValue={assignment.description}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <Input
                id={`id-${index}`}
                defaultValue={assignment.id ?? ''}
                type="hidden"
              />
              <h4 className="text-lg font-medium">{assignment.title}</h4>
              <p className="text-muted-foreground text-sm text-slate-500">
                {assignment.pageStart} ~ {assignment.pageEnd} page
              </p>
              <p className="text-muted-foreground">{assignment.description}</p>
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
          <Button
            onClick={() => {
              if (editingIndex === index) {
                setEditingIndex(-1);
              }
              handleDeleteAssignment(index);
            }}
            variant="ghost"
            className="text-red-500"
          >
            <TrashIcon className="h-5 w-5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
