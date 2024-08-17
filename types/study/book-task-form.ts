import { Dispatch, SetStateAction } from 'react';

export interface BookStudyTaskListFormProps {
  isOpen: boolean;
  setOpen: (arg0: boolean) => void;
}

export interface BookTaskForm {
  key: number;
  assignment: BookTaskAssignment;
  index: number;
  editingIndex: number;
  handleSaveAssignment: (index: number) => void;
  setEditingIndex: Dispatch<SetStateAction<number>>;
  children?: React.ReactNode;
}

export interface BookTaskAssignment {
  chapter: string;
  startPage: number;
  endPage: number;
  contents: string;
}
