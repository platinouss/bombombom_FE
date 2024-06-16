'use client';

import Header from '@/components/header/header';
import { Study, AlgorithmStudy, BookStudy, Pageable } from '@/components/study/study';
import StudyGroup from '@/components/study/study-group';
import StudyGrid from '@/components/study/study-grid';
import { PaginationPrevious, PaginationItem, PaginationLink, PaginationEllipsis, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination"
import studies from '@/lib/api/study/studies';

import { PlusIcon } from 'lucide-react';

import Link from 'next/link';
import { Suspense } from 'react';

export default async function StudyList({page,size}:Pageable) {
  
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">스터디 목록</h1>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            <PlusIcon className="w-4 h-4 mr-2 " />
            스터디 개설하기
          </Link>
        </div>

        <Suspense>
          <StudyGrid {...{page,size}}/>
        </Suspense>
        
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
