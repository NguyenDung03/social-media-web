export type TResponse<T> = {
  message: string;
  success: boolean;
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};
export type TResponseNoPagination<Data> = {
  message: string;
  success: boolean;
  data: Data[];
};
export type TResponseDetail<Data> = {
  message: string;
  success: boolean;
  data: Data;
};
export type TImage = {
  url: string;
  public_id: string;
  _id: string;
};
export interface ImageType {
  url: string;
  public_id: string;
  visible: boolean;
}
export type TBaseResponseDelete = {
  message: string;
  success: boolean;
};
export type TModalType = "add" | "edit" | "delete" | "view" | null;
export type TModal<T> = {
  visible: boolean;
  type: TModalType;
  currentData: T | null;
};
export type TQueryParams = {
  _page?: number;
  _limit?: number;
  q?: string;
  status?: string;
  deleted?: string;
  createSearch?: string;
};
