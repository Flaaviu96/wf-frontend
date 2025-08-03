export interface PageResultDTO<T> {
  content: T[];
  hasNextPage: boolean;
  nextCursorId: number;
  prevCursorId : number;
}
