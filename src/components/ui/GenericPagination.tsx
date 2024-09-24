import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";

interface GenericPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export default function GenericPagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
}: GenericPaginationProps) {
  // Validate and sanitize input
  const sanitizedTotalItems = Math.max(0, Math.floor(totalItems));
  const sanitizedItemsPerPage = Math.max(1, Math.floor(itemsPerPage));
  const totalPages = Math.max(
    1,
    Math.ceil(sanitizedTotalItems / sanitizedItemsPerPage),
  );
  const sanitizedCurrentPage = Math.min(
    Math.max(1, Math.floor(currentPage)),
    totalPages,
  );
  const sanitizedSiblingCount = Math.max(0, Math.floor(siblingCount));

  const range = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const getPageNumbers = (): (number | string)[] => {
    const totalPageNumbers = sanitizedSiblingCount * 2 + 3;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(
      sanitizedCurrentPage - sanitizedSiblingCount,
      1,
    );
    const rightSiblingIndex = Math.min(
      sanitizedCurrentPage + sanitizedSiblingCount,
      totalPages,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * sanitizedSiblingCount;
      return [...range(1, leftItemCount), "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * sanitizedSiblingCount;
      return [1, "...", ...range(totalPages - rightItemCount + 1, totalPages)];
    }

    return [
      1,
      "...",
      ...range(leftSiblingIndex, rightSiblingIndex),
      "...",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center space-y-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (sanitizedCurrentPage > 1)
                  onPageChange(sanitizedCurrentPage - 1);
              }}
              aria-disabled={sanitizedCurrentPage === 1}
            />
          </PaginationItem>
          {pageNumbers.map((pageNumber, index) => (
            <PaginationItem key={index}>
              {pageNumber === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNumber as number);
                  }}
                  isActive={pageNumber === sanitizedCurrentPage}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (sanitizedCurrentPage < totalPages)
                  onPageChange(sanitizedCurrentPage + 1);
              }}
              aria-disabled={sanitizedCurrentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="text-sm text-muted-foreground">
        Total items: {sanitizedTotalItems} | Page {sanitizedCurrentPage} of{" "}
        {totalPages}
      </div>
    </div>
  );
}
