import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Skeleton } from "@components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 10,
  columns = 6,
}: TableSkeletonProps = {}): React.ReactElement {
  return (
    <Card className="w-screen h-screen flex flex-col">
      <CardHeader className="space-y-2 flex-shrink-0">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-6">
        <ScrollArea className="h-full w-full">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: columns }).map((_, index) => (
                  <TableHead
                    key={index}
                    className={index === 0 ? "w-[100px]" : ""}
                  >
                    <Skeleton
                      className={`h-4 w-[${index === 0 || index === columns - 1 ? "80px" : "100px"}] ${index === columns - 1 ? "ml-auto" : ""}`}
                    />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex} className="h-16">
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={
                        colIndex === 0
                          ? "font-medium"
                          : colIndex === columns - 1
                            ? "text-right"
                            : ""
                      }
                    >
                      <Skeleton
                        className={`h-4 w-[${colIndex === 0 || colIndex === columns - 1 ? "80px" : "100px"}] ${colIndex === columns - 1 ? "ml-auto" : ""}`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
