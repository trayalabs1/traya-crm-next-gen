import { ScrollArea } from "@radix-ui/react-scroll-area";

interface PhoneLayoutProps {
  children: React.ReactNode;
}

export function PhoneLayout({ children }: PhoneLayoutProps) {
  return (
    <div className="flex-shrink-0 w-[360px] h-[720px] bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-[14px] border-gray-900 flex flex-col relative">
      <div className="bg-black text-white">
        <div className="w-32 h-6 bg-black absolute left-1/2 top-0 -translate-x-1/2 rounded-b-3xl"></div>
      </div>
      <ScrollArea className="flex-1 h-[calc(100%-40px)] overflow-auto">
        <div>{children}</div>
      </ScrollArea>
      <div className="bg-black p-1 flex justify-center">
        <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
}
