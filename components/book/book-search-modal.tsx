import BookSearchTable from '@/components/book/book-search-table';
import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog/dialog';
import { SearchIcon } from '@/components/ui/icon/icon';
import { Input } from '@/components/ui/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select/select';
import { searchBooks, searchBooksUsingOpenApi } from '@/lib/api/book/search';
import { BookResult, BookSearchProps } from '@/types/book/book-result';
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function BookSearchModal({
  open,
  setOpen,
  setBookInfo
}: BookSearchProps) {
  const [searchOption, setSearchOption] = useState('TOTAL');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [books, setBooks] = useState<BookResult[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isUsingOpenApi, setIsUsingOpenApi] = useState(false);

  const initStates = () => {
    setSearchOption('TOTAL');
    setSearchKeyword('');
    setBooks([]);
    setIsSearched(false);
    setIsUsingOpenApi(false);
  };

  const handleSearchOptionChange = (option: string) => {
    setSearchOption(option);
  };

  const handleSearchKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(e.target.value);
  };

  const isEmptyOrWhitespaceKeyword = (keyword: string) => {
    return keyword.trim() == '';
  };

  const handleSearch = async () => {
    if (isEmptyOrWhitespaceKeyword(searchKeyword)) {
      toast.error('키워드를 입력해주세요.');
      return;
    }
    setIsSearched(true);
    try {
      const response = await searchBooks(searchOption, searchKeyword);
      setBooks(response.data.booksInfo);
    } catch (error) {
      console.error('Error searching books:', error);
      toast.error('서적을 검색할 수 없습니다.');
    }
  };

  const handleSearchUsingOpenApi = async () => {
    if (isEmptyOrWhitespaceKeyword(searchKeyword)) {
      toast.error('키워드를 입력해주세요.');
      return;
    }
    setIsUsingOpenApi(true);
    try {
      const response = await searchBooksUsingOpenApi(searchKeyword);
      setBooks(response.data.booksInfo);
    } catch (error) {
      console.error('Error searching books:', error);
      toast.error('서적을 검색할 수 없습니다.');
    }
  };

  const handleEnterKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code == 'Enter') {
      isUsingOpenApi ? handleSearchUsingOpenApi() : handleSearch();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1000px] max-h-[100vh]">
        <DialogHeader>
          <DialogTitle>기술 서적 선택하기</DialogTitle>
          <DialogDescription>
            스터디에서 학습할 기술 서적을 선택해 주세요.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full max-w-4xl mx-auto border rounded-lg">
            <div className="p-4 border-b">
              <div className="flex items-center gap-4">
                <Select
                  value={searchOption}
                  onValueChange={handleSearchOptionChange}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="전체" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TOTAL">전체</SelectItem>
                    <SelectItem value="TITLE">서적명</SelectItem>
                    <SelectItem value="AUTHOR">저자</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="키워드를 입력하세요."
                    className="pl-8 w-full"
                    onChange={handleSearchKeywordChange}
                    onKeyDown={handleEnterKeyup}
                    value={searchKeyword}
                  />
                </div>
                <Button
                  onClick={
                    isUsingOpenApi ? handleSearchUsingOpenApi : handleSearch
                  }
                >
                  검색
                </Button>
              </div>
            </div>
          </div>
        </DialogFooter>
        {isSearched && !isUsingOpenApi ? (
          <div className="p-4 text-center">
            <p className="font-bold text-m text-red-600 mb-2">
              원하는 서적을 찾지 못했나요?
            </p>
            <Button onClick={handleSearchUsingOpenApi}>확장 검색</Button>
          </div>
        ) : null}
        {isUsingOpenApi ? (
          <p className="text-sm text-red-600 text-bold font-semibold">
            확장 검색 모드
          </p>
        ) : null}
        <DialogBody className="h-full">
          <div className="overflow-y-auto max-h-[60vh] border border-slate-200 rounded-lg dark:border-slate-800">
            <BookSearchTable
              books={books}
              setOpen={setOpen}
              setBookInfo={setBookInfo}
              initStates={initStates}
            />
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
