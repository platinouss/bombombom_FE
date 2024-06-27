'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog/dialog';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select/select';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/table/table';
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog';
import { searchBooks, searchBooksUsingOpenApi } from '@/lib/api/book/search';

export default function Books() {
  const [searchOption, setSearchOption] = useState('TOTAL');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [books, setBooks] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isUsingOpenApi, setIsUsingOpenApi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [hasMoreResults, setHasMoreResults] = useState(true);

  const handleSearchOptionChange = (option: string) => {
    setSearchOption(option);
  };
  const handleSearchKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setIsSearched(true);
    try {
      const response = await searchBooks(searchOption, searchKeyword);
      setBooks(response.data.booksInfo);
      // setHasMoreResults(response.length === 10);
    } catch (error) {
      console.error('Error searching books:', error);
      toast.error('서적을 검색할 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchUsingOpenApi = async () => {
    setIsLoading(true);
    setIsUsingOpenApi(true);
    try {
      const response = await searchBooksUsingOpenApi(searchKeyword);
      setBooks(response.data.booksInfo);
      // setHasMoreResults(response.length === 10);
    } catch (error) {
      console.error('Error searching books:', error);
      toast.error('서적을 검색할 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  function handleTableRowClick(book: string) {
    console.log('Clicked row:', book);
  }

  return (
    <Dialog defaultOpen>
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
            <p className="font-bold text-m text-red-600 text-slate-500 mb-2">
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
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>이미지</TableHead>
                  <TableHead>서적명</TableHead>
                  <TableHead>작가</TableHead>
                  <TableHead>출판사</TableHead>
                  <TableHead>ISBN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map(({ imageUrl, title, author, publisher, isbn }) => (
                  <TableRow
                    onClick={() => handleTableRowClick(title)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-center justify-center w-24 h-24">
                        <img
                          src={imageUrl}
                          className="w-full h-full object-contain"
                          alt="cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell className="w-40 whitespace-normal">
                      {author}
                    </TableCell>
                    <TableCell>{publisher}</TableCell>
                    <TableCell>{isbn}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
