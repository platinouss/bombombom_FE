import { Dispatch, SetStateAction } from 'react';
import { BookStudyDetails } from './study-detail';

export interface BookStudyTaskListFormProps {
  isOpen: boolean;
  setOpen: (arg0: boolean) => void;
  details: BookStudyDetails;
  refresh: () => void;
  nextRoundIdx: number;
}

export interface BookTaskForm {
  key: number;
  assignment: BookTaskAssignment;
  index: number;
  editingIndex: number;
  handleSaveAssignment: (index: number) => void;
  handleDeleteAssignment: (index: number) => void;
  setEditingIndex: Dispatch<SetStateAction<number>>;
  children?: React.ReactNode;
}

export interface BookTaskAssignment {
  title: string;
  id: number | null;
  pageStart: number;
  pageEnd: number;
  description: string;
}
