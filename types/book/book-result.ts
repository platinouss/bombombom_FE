export interface BookSearchProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  setBookInfo: (arg0: { title: string; isbn: number }) => void;
}

export interface changeBookInfoProps {
  title: string;
  isbn: number;
}

export interface BookResult {
  imageUrl: string;
  title: string;
  author: string;
  publisher: string;
  isbn: number;
}

export interface BookSearchTableProps {
  books: BookResult[];
  setOpen: (arg0: boolean) => void;
  setBookInfo: (arg0: { title: string; isbn: number }) => void;
}
