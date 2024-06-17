import studies from '@/lib/api/study/studies';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './ui/pagination';
import { StudyPage } from '../../types/study/study';
import { ELLIPSIS_PAGE } from '@/constants/study/study';

export default async function StudyPagination(studyPage: StudyPage) {
  const pageNumber = studyPage.pageNumber;
  const totalPages = studyPage.totalPages;

  return (
    <div className="flex justify-center mt-8">
      <Pagination>
        <PaginationContent>
          {pageNumber > 0 && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${pageNumber - 1}`} />
            </PaginationItem>
          )}
          {pageNumber == ELLIPSIS_PAGE - 1 && (
            <PaginationItem>
              <PaginationLink href="?page=0">1</PaginationLink>
            </PaginationItem>
          )}
          {pageNumber >= ELLIPSIS_PAGE && (
            <PaginationItem>
              <PaginationEllipsis
                href={`?page=${pageNumber - ELLIPSIS_PAGE}`}
              />
            </PaginationItem>
          )}

          {pageNumber > 0 && (
            <PaginationItem>
              <PaginationLink href={`?page=${pageNumber - 1}`}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink {...{ prefetch: false }} href="#" isActive>
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
          {pageNumber < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink href={`?page=${pageNumber + 1}`}>
                {pageNumber + 2}
              </PaginationLink>
            </PaginationItem>
          )}
          {pageNumber + ELLIPSIS_PAGE < totalPages && (
            <PaginationItem>
              <PaginationEllipsis
                href={`?page=${pageNumber + ELLIPSIS_PAGE}`}
              />
            </PaginationItem>
          )}
          {pageNumber + ELLIPSIS_PAGE - 1 == totalPages - 1 && (
            <PaginationItem>
              <PaginationLink href={`?page=${totalPages - 1}`}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {pageNumber < totalPages - 1 && (
            <PaginationItem>
              <PaginationNext href={`?page=${pageNumber + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
