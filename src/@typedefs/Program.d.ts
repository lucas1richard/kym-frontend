export type Program = {
  id: number;
  startweight: number;
  endgoal: number;
  endweight?: number;
  startdate: string;
  enddate: string;
  status: 'IN_PROGRESS' | 'COMPLETE';
  result: 'TBD' | 'SUCCESS' | 'FAILURE';
  user_uuid?: string;
}
