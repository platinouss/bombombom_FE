import { ELLIPSIS_PAGE } from '@/constants/study/study';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './pagination';

export default function StudyPagination({
  pageNumber,
  totalPages,
  refresh,
  setPage
}: {
  pageNumber: number;
  totalPages: number;
  refresh: () => void;
  setPage: (arg0: number) => void;
}) {
  const paging = (pageNumber: number) => {
    setPage(pageNumber);
    refresh();
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber.toString());
    window.history.pushState(null, '', url.toString());
  };
  return (
    <div className="flex justify-center mt-8">
      <Pagination>
        <PaginationContent>
          {pageNumber > 0 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => paging(pageNumber - 1)} />
            </PaginationItem>
          )}
          {pageNumber == ELLIPSIS_PAGE - 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => paging(0)}>1</PaginationLink>
            </PaginationItem>
          )}
          {pageNumber >= ELLIPSIS_PAGE && (
            <PaginationItem>
              <PaginationEllipsis
                onClick={() => paging(pageNumber - ELLIPSIS_PAGE)}
              />
            </PaginationItem>
          )}

          {pageNumber > 0 && (
            <PaginationItem>
              <PaginationLink onClick={() => paging(pageNumber - 1)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
          {pageNumber < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => paging(pageNumber + 1)}>
                {pageNumber + 2}
              </PaginationLink>
            </PaginationItem>
          )}
          {pageNumber + ELLIPSIS_PAGE < totalPages && (
            <PaginationItem>
              <PaginationEllipsis
                onClick={() => paging(pageNumber + ELLIPSIS_PAGE)}
              />
            </PaginationItem>
          )}
          {pageNumber + ELLIPSIS_PAGE - 1 == totalPages - 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => paging(totalPages - 1)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {pageNumber < totalPages - 1 && (
            <PaginationItem>
              <PaginationNext onClick={() => paging(pageNumber + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
