export interface File {
  type: string;
  url: string;
}

export interface Work {
  _id: string;
  title: string;
  cover: string;
  files: File[];
  date: string;
}
