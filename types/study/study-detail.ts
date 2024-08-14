import { BookResult } from '../book/book-result';
import { Spread } from './study';

export interface StudyDetailsAndRound {
  details: StudyDetails;
  round: Round;
}

export interface StudyDetails {
  studyType: string;
  name: string;
  introduce: string;
  headCount: number;
  capacity: number;
  penalty: number;
  leaderId: number;
  reliabilityLimit: number;
  startDate: Date;
  weeks: number;
  status: StudyStatus;
}

export interface BookStudyDetails extends StudyDetails {
  book: BookResult;
}

export interface BookRound extends Round {
  assignments: {
    [assignmentId: number]: StudyAssignmentInfo;
  };
  users: {
    [userId: number]: BookMemberInfo;
  };
}

export enum StudyStatus {
  READY = 'READY',
  RUNNING = 'RUNNING',
  END = 'END'
}
export interface Round {
  idx: number;
  startDate: Date;
  endDate: Date;
  users: {
    [userId: number]: StudyMemberInfo;
  };
}

export interface AlgorithmRound extends Round {
  problems: {
    [problemId: number]: AlgorithmProblemInfo;
  };
  users: {
    [userId: number]: AlgorithmMemberInfo;
  };
}

export interface AlgorithmProblemInfo {
  problemId: number;
  refId: number;
  tag: string;
  title: string;
  link: string;
  difficulty: number;
}

export interface StudyAssignmentInfo {
  title: string;
  content: string;
  page: Spread;
}

export interface StudyMemberInfo {
  username: string;
}

export interface AlgorithmMemberInfo extends StudyMemberInfo {
  baekjoonId: string;
  isUpdating: boolean;
  tasks: {
    [problemId: number]: boolean;
  };
}

export interface BookMemberInfo extends StudyMemberInfo {
  assignmentId: number;
  video: VideoInfo;
  quiz: QuizInfo;
}

export interface VideoInfo {
  link: string;
}
export interface QuizInfo {
  link: string;
}
