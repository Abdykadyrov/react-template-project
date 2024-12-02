export interface IDictionary {
  name: string;
  value?: string | number | readonly string[];
}

export interface IBasicResponse {
  success: boolean;
  error?: string;
}

export interface IPageableResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
