export interface File {
  type: string;
  url: string;
  description?: string;
}

export interface Work {
  _id: string;
  title: string;
  description?: string;
  cover: string;
  files: File[];
  date: string;
}

export interface News {
  _id: string;
  title: string;
  description?: string;
  cover: string;
  files: File[];
  date: string;
}
