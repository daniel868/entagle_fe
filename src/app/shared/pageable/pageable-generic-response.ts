export class PageableGenericResponse<T> {
  payload: T[];
  pageSize: number;
  currentPage: number;
  nextPage: number;
  totalCount: number;
}
