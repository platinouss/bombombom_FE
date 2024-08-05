export interface UpdateTaskStatusReq {
  studyId: number;
  roundIdx: number;
  problemIds: number[];
  userId: number;
}
