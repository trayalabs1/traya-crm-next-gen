// import React, { useState } from "react";
// import { Button } from "@components/ui/button";
// import { ScrollArea } from "@components/ui/scroll-area";
// import { Battery, Wifi, Signal, ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@components/ui/dialog";
// import { Input } from "@components/ui/input";
// import { Label } from "@components/ui/label";
// import { useToast } from "@hooks/use-toast";

// type ContentType =
//   | "banner"
//   | "cta"
//   | "name"
//   | "cta_button"
//   | "custom"
//   | "full_image"
//   | "carousel_item"
//   | "image"
//   | "community_card"
//   | "playlist"
//   | "hair_solution"
//   | "step"
//   | "retake_hair_test"
//   | "holistic_plan"
//   | "support_card"
//   | "full_width_image"
//   | "lottie"
//   | "video_card"
//   | "h1"
//   | "p";

// interface ContentItem {
//   type: ContentType;
//   content: any; // Using 'any' here as content structure may vary for different types
// }

// interface VersionContent {
//   [key: string]: ContentItem;
// }

// interface DifferenceCheckerProps {
//   currentVersion: VersionContent;
//   newVersion: VersionContent;
// }

// export default function EnhancedMobileDifferenceChecker({
//   currentVersion,
//   newVersion,
// }: DifferenceCheckerProps) {
//   const toast = useToast();
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
//   const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
//   const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
//   const [otp, setOtp] = useState("");

//   const renderContent = (
//     content: VersionContent,
//     otherContent: VersionContent,
//   ) => {
//     return Object.entries(content).map(([key, item]) => {
//       const otherItem = otherContent[key];
//       return (
//         <div
//           key={key}
//           className={`mb-4 ${item.type !== otherItem?.type || JSON.stringify(item.content) !== JSON.stringify(otherItem?.content) ? "bg-yellow-200 dark:bg-yellow-800 p-2 rounded" : ""}`}
//         >
//           {renderContentItem(item, otherItem)}
//         </div>
//       );
//     });
//   };

//   const renderContentItem = (item: ContentItem, otherItem?: ContentItem) => {
//     switch (item.type) {
//       case "h1":
//         return (
//           <h1 className="text-2xl font-bold mb-2">
//             {highlightDifferences(item.content, otherItem?.content)}
//           </h1>
//         );
//       case "p":
//         return (
//           <p className="mb-2">
//             {highlightDifferences(item.content, otherItem?.content)}
//           </p>
//         );
//       case "image":
//       case "full_image":
//       case "full_width_image":
//         return (
//           <div className="relative h-40 w-full mb-2">
//             <img
//               src={item.content as string}
//               alt="Content image"
//               className="rounded-lg"
//               style={{ objectFit: "cover", width: "100%", height: "100%" }} // Adjust size as necessary
//             />
//           </div>
//         );
//       case "banner":
//         return (
//           <div className="bg-primary text-primary-foreground p-4 rounded-lg mb-2">
//             {highlightDifferences(item.content, otherItem?.content)}
//           </div>
//         );
//       case "carousel_item":
//         return (
//           <div className="relative mb-2">
//             <div className="flex overflow-x-auto snap-x snap-mandatory">
//               {item.content.map((src: string, index: number) => (
//                 <div key={index} className="flex-shrink-0 w-full snap-center">
//                   <img
//                     src={src}
//                     alt={`Carousel image ${index + 1}`}
//                     className="rounded-lg"
//                     style={{
//                       objectFit: "cover",
//                       width: "300px",
//                       height: "200px",
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="absolute inset-y-0 left-0 flex items-center">
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 className="h-8 w-8 rounded-full"
//                 onClick={() =>
//                   setActiveSlide(
//                     (prev) =>
//                       (prev - 1 + item.content.length) % item.content.length,
//                   )
//                 }
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="absolute inset-y-0 right-0 flex items-center">
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 className="h-8 w-8 rounded-full"
//                 onClick={() =>
//                   setActiveSlide((prev) => (prev + 1) % item.content.length)
//                 }
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         );
//       case "cta":
//       case "cta_button":
//         return (
//           <Button className="w-full mb-2">
//             {highlightDifferences(item.content, otherItem?.content)}
//           </Button>
//         );
//       case "name":
//         return (
//           <h2 className="text-xl font-semibold mb-2">
//             {highlightDifferences(item.content, otherItem?.content)}
//           </h2>
//         );
//       case "custom":
//         return (
//           <div className="custom-content mb-2">
//             {highlightDifferences(
//               JSON.stringify(item.content),
//               JSON.stringify(otherItem?.content),
//             )}
//           </div>
//         );
//       case "community_card":
//       case "support_card":
//         return (
//           <div className="border rounded-lg p-4 mb-2">
//             <h3 className="font-semibold mb-1">{item.content.title}</h3>
//             <p>{item.content.description}</p>
//           </div>
//         );
//       case "playlist":
//         return (
//           <div className="border rounded-lg p-4 mb-2">
//             <h3 className="font-semibold mb-2">Playlist</h3>
//             <ul>
//               {item.content.map((track: string, index: number) => (
//                 <li key={index}>{track}</li>
//               ))}
//             </ul>
//           </div>
//         );
//       case "hair_solution":
//       case "holistic_plan":
//         return (
//           <div className="border rounded-lg p-4 mb-2">
//             <h3 className="font-semibold mb-2">
//               {item.type === "hair_solution"
//                 ? "Hair Solution"
//                 : "Holistic Plan"}
//             </h3>
//             <p>{item.content.description}</p>
//           </div>
//         );
//       case "step":
//         return (
//           <div className="flex items-center mb-2">
//             <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-2">
//               {item.content.number}
//             </div>
//             <p>{item.content.description}</p>
//           </div>
//         );
//       case "retake_hair_test":
//         return (
//           <Button variant="outline" className="w-full mb-2">
//             Retake Hair Test
//           </Button>
//         );
//       case "lottie":
//         return <div className="mb-2">Lottie Animation Placeholder</div>;
//       case "video_card":
//         return (
//           <div className="border rounded-lg p-4 mb-2">
//             <h3 className="font-semibold mb-2">{item.content.title}</h3>
//             <div className="aspect-video bg-gray-200 flex items-center justify-center">
//               Video Placeholder
//             </div>
//           </div>
//         );
//       default:
//         return (
//           <div className="mb-2">Unsupported content type: {item.type}</div>
//         );
//     }
//   };

//   const highlightDifferences = (
//     text: string,
//     otherText: string | undefined,
//   ) => {
//     if (!otherText) return text;
//     const words = text.split(" ");
//     const otherWords = otherText.split(" ");

//     return words.map((word, index) => {
//       if (word !== otherWords[index]) {
//         return (
//           <span
//             key={index}
//             className="bg-yellow-300 dark:bg-yellow-700 px-1 rounded"
//           >
//             {word}
//           </span>
//         );
//       }
//       return <span key={index}>{word} </span>;
//     });
//   };

//   const MobileEmulator = ({
//     title,
//     content,
//   }: {
//     title: string;
//     content: React.ReactNode;
//   }) => (
//     <div className="flex-1 min-w-[320px] max-w-[375px] mx-auto">
//       <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
//       <div className="border-[14px] border-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl">
//         <div className="bg-gray-900 text-white px-2 py-1 flex items-center justify-between text-xs">
//           <span>9:41</span>
//           <div className="flex items-center space-x-1">
//             <Signal className="w-4 h-4" />
//             <Wifi className="w-4 h-4" />
//             <Battery className="w-4 h-4" />
//           </div>
//         </div>
//         <div className="bg-gray-900 h-6 w-36 mx-auto rounded-b-3xl"></div>
//         <ScrollArea className="h-[600px] w-full bg-white">
//           <div className="p-4">{content}</div>
//         </ScrollArea>
//         <div className="bg-gray-900 h-1 w-32 mx-auto rounded-t-3xl mt-2"></div>
//       </div>
//     </div>
//   );

//   const handleApprove = () => {
//     setIsApproveDialogOpen(false);
//     setIsOtpDialogOpen(true);
//     toast({
//       title: "OTP Sent",
//       description: "Please check your email or phone for the OTP.",
//     });
//   };

//   const handleOtpSubmit = () => {
//     setIsOtpDialogOpen(false);
//     toast({
//       title: "Changes Approved",
//       description: "The new version has been approved and published.",
//     });
//   };

//   const handleDiscard = () => {
//     setIsDiscardDialogOpen(false);
//     toast({
//       title: "Changes Discarded",
//       description: "The new version has been discarded.",
//     });
//   };

//   return (
//     <div className="w-full max-w-5xl mx-auto p-4 bg-background">
//       <div className="flex justify-end mb-4 space-x-2">
//         <Dialog
//           open={isDiscardDialogOpen}
//           onOpenChange={setIsDiscardDialogOpen}
//         >
//           <DialogTrigger asChild>
//             <Button variant="outline" size="sm">
//               Discard
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Are you sure you want to discard?</DialogTitle>
//               <DialogDescription>
//                 This action cannot be undone. This will permanently discard the
//                 new version.
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsDiscardDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button variant="destructive" onClick={handleDiscard}>
//                 Discard
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//         <Dialog
//           open={isApproveDialogOpen}
//           onOpenChange={setIsApproveDialogOpen}
//         >
//           <DialogTrigger asChild>
//             <Button size="sm">Approve</Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Are you sure you want to approve?</DialogTitle>
//               <DialogDescription>
//                 This will publish the new version. You will need to enter an OTP
//                 to confirm.
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsApproveDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleApprove}>Approve</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//       <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Enter OTP</DialogTitle>
//             <DialogDescription>
//               Please enter the One-Time Password sent to your email or phone.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="otp" className="text-right">
//                 OTP
//               </Label>
//               <Input
//                 id="otp"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsOtpDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleOtpSubmit}>Submit</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//       <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 justify-center">
//         <MobileEmulator
//           title="Current Version"
//           content={renderContent(currentVersion, newVersion)}
//         />
//         <MobileEmulator
//           title="New Version"
//           content={renderContent(newVersion, currentVersion)}
//         />
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Button } from "@components/ui/button";
// import { ScrollArea } from "@components/ui/scroll-area";
// import {
//   Battery,
//   Wifi,
//   Signal,
//   ChevronLeft,
//   ChevronRight,
//   Check,
//   X,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@components/ui/dialog";
// import { Input } from "@components/ui/input";
// import { Label } from "@components/ui/label";
// import { useToast } from "@hooks/use-toast";

// type ContentType =
//   | "banner"
//   | "cta"
//   | "name"
//   | "cta_button"
//   | "custom"
//   | "full_image"
//   | "carousel_item"
//   | "image"
//   | "community_card"
//   | "playlist"
//   | "hair_solution"
//   | "step"
//   | "retake_hair_test"
//   | "holistic_plan"
//   | "support_card"
//   | "full_width_image"
//   | "lottie"
//   | "video_card"
//   | "h1"
//   | "p";

// interface ContentItem {
//   type: ContentType;
//   content: any;
// }

// interface VersionContent {
//   [key: string]: ContentItem;
// }

// interface DifferenceCheckerProps {
//   currentVersion: VersionContent;
//   newVersion: VersionContent;
// }

// export default function EnhancedMobileDifferenceChecker({
//   currentVersion,
//   newVersion,
// }: DifferenceCheckerProps) {
//   const toast = useToast();
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
//   const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
//   const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
//   const [otp, setOtp] = useState("");

//   const renderContent = (
//     content: VersionContent,
//     otherContent: VersionContent,
//   ) => {
//     return Object.entries(content).map(([key, item]) => {
//       const otherItem = otherContent[key];
//       return (
//         <div
//           key={key}
//           className={`mb-4 ${item.type !== otherItem?.type || JSON.stringify(item.content) !== JSON.stringify(otherItem?.content) ? "bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg shadow-sm" : ""}`}
//         >
//           {renderContentItem(item, otherItem)}
//         </div>
//       );
//     });
//   };

//   const renderContentItem = (item: ContentItem, otherItem?: ContentItem) => {
//     switch (item.type) {
//       case "h1":
//         return (
//           <h1 className="text-2xl font-bold mb-2">
//             {highlightDifferences(item.content, otherItem?.content)}
//           </h1>
//         );
//       case "p":
//         return (
//           <p className="mb-2">
//             {highlightDifferences(item.content, otherItem?.content)}
//           </p>
//         );
//       case "image":
//       case "full_image":
//       case "full_width_image":
//         return (
//           <div className="relative h-40 w-full mb-2 rounded-lg overflow-hidden shadow-md">
//             <img
//               src={item.content as string}
//               alt="Content image"
//               className="rounded-lg"
//               style={{ objectFit: "cover", width: "100%", height: "100%" }} // Adjust size as necessary
//             />
//           </div>
//         );
//       case "banner":
//         return (
//           <div className="bg-primary text-primary-foreground p-4 rounded-lg mb-2 shadow-md">
//             {highlightDifferences(item.content, otherItem?.content)}
//           </div>
//         );
//       case "carousel_item":
//         return (
//           <div className="relative mb-2">
//             <div className="flex overflow-x-auto snap-x snap-mandatory">
//               {item.content.map((src: string, index: number) => (
//                 <div key={index} className="flex-shrink-0 w-full snap-center">
//                   <img
//                     src={src}
//                     alt={`Carousel image ${index + 1}`}
//                     className="rounded-lg"
//                     style={{
//                       objectFit: "cover",
//                       width: "300px",
//                       height: "200px",
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="absolute inset-y-0 left-0 flex items-center">
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 className="h-8 w-8 rounded-full bg-white/80 shadow-md"
//                 onClick={() =>
//                   setActiveSlide(
//                     (prev) =>
//                       (prev - 1 + item.content.length) % item.content.length,
//                   )
//                 }
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="absolute inset-y-0 right-0 flex items-center">
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 className="h-8 w-8 rounded-full bg-white/80 shadow-md"
//                 onClick={() =>
//                   setActiveSlide((prev) => (prev + 1) % item.content.length)
//                 }
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         );
//       case "cta":
//       case "cta_button":
//         return (
//           <Button className="w-full mb-2 shadow-md">
//             {highlightDifferences(item.content, otherItem?.content)}
//           </Button>
//         );
//       case "name":
//         return (
//           <h2 className="text-xl font-semibold mb-2">
//             {highlightDifferences(item.content, otherItem?.content)}
//           </h2>
//         );
//       case "custom":
//         return (
//           <div className="custom-content mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
//             {highlightDifferences(
//               JSON.stringify(item.content),
//               JSON.stringify(otherItem?.content),
//             )}
//           </div>
//         );
//       case "community_card":
//       case "support_card":
//         return (
//           <div className="border rounded-lg p-4 mb-2 shadow-md bg-white dark:bg-gray-800">
//             <h3 className="font-semibold mb-1">{item.content.title}</h3>
//             <p>{item.content.description}</p>
//           </div>
//         );
//       case "playlist":
//         return (
//           <div className="border rounded-lg p-4 mb-2 shadow-md bg-white dark:bg-gray-800">
//             <h3 className="font-semibold mb-2">Playlist</h3>
//             <ul className="list-disc list-inside">
//               {item.content.map((track: string, index: number) => (
//                 <li key={index}>{track}</li>
//               ))}
//             </ul>
//           </div>
//         );
//       case "hair_solution":
//       case "holistic_plan":
//         return (
//           <div className="border rounded-lg p-4 mb-2 shadow-md bg-white dark:bg-gray-800">
//             <h3 className="font-semibold mb-2">
//               {item.type === "hair_solution"
//                 ? "Hair Solution"
//                 : "Holistic Plan"}
//             </h3>
//             <p>{item.content.description}</p>
//           </div>
//         );
//       case "step":
//         return (
//           <div className="flex items-center mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
//             <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-2 shadow-sm">
//               {item.content.number}
//             </div>
//             <p>{item.content.description}</p>
//           </div>
//         );
//       case "retake_hair_test":
//         return (
//           <Button variant="outline" className="w-full mb-2 shadow-md">
//             Retake Hair Test
//           </Button>
//         );
//       case "lottie":
//         return (
//           <div className="mb-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
//             Lottie Animation Placeholder
//           </div>
//         );
//       case "video_card":
//         return (
//           <div className="border rounded-lg p-4 mb-2 shadow-md bg-white dark:bg-gray-800">
//             <h3 className="font-semibold mb-2">{item.content.title}</h3>
//             <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg shadow-inner">
//               Video Placeholder
//             </div>
//           </div>
//         );
//       default:
//         return (
//           <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
//             Unsupported content type: {item.type}
//           </div>
//         );
//     }
//   };

//   const highlightDifferences = (
//     text: string,
//     otherText: string | undefined,
//   ) => {
//     if (!otherText) return text;
//     const words = text.split(" ");
//     const otherWords = otherText.split(" ");

//     return words.map((word, index) => {
//       if (word !== otherWords[index]) {
//         return (
//           <span
//             key={index}
//             className="bg-yellow-300 dark:bg-yellow-700 px-1 rounded"
//           >
//             {word}
//           </span>
//         );
//       }
//       return <span key={index}>{word} </span>;
//     });
//   };

//   const MobileEmulator = ({
//     title,
//     content,
//   }: {
//     title: string;
//     content: React.ReactNode;
//   }) => (
//     <div className="flex-1 min-w-[320px] max-w-[375px] mx-auto">
//       <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
//       <div className="border-[14px] border-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-900">
//         <div className="bg-gray-800 text-white px-2 py-1 flex items-center justify-between text-xs">
//           <span>9:41</span>
//           <div className="flex items-center space-x-1">
//             <Signal className="w-4 h-4" />
//             <Wifi className="w-4 h-4" />
//             <Battery className="w-4 h-4" />
//           </div>
//         </div>
//         <div className="bg-gray-800 h-6 w-36 mx-auto rounded-b-3xl"></div>
//         <ScrollArea className="h-[600px] w-full bg-white dark:bg-gray-900">
//           <div className="p-4">{content}</div>
//         </ScrollArea>
//         <div className="bg-gray-800 h-1 w-32 mx-auto rounded-t-3xl mt-2"></div>
//       </div>
//     </div>
//   );

//   const handleApprove = () => {
//     setIsApproveDialogOpen(false);
//     setIsOtpDialogOpen(true);
//     toast({
//       title: "OTP Sent",
//       description: "Please check your email or phone for the OTP.",
//     });
//   };

//   const handleOtpSubmit = () => {
//     setIsOtpDialogOpen(false);
//     toast({
//       title: "Changes Approved",
//       description: "The new version has been approved and published.",
//     });
//   };

//   const handleDiscard = () => {
//     setIsDiscardDialogOpen(false);
//     toast({
//       title: "Changes Discarded",
//       description: "The new version has been discarded.",
//     });
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
//       <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
//         <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
//           Diff Checker
//         </span>
//       </h1>
//       <div className="flex justify-end mb-6 space-x-4">
//         <Dialog
//           open={isDiscardDialogOpen}
//           onOpenChange={setIsDiscardDialogOpen}
//         >
//           <DialogTrigger asChild>
//             <Button variant="outline" size="lg" className="shadow-md">
//               <X className="mr-2 h-4 w-4" /> Discard
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Are you sure you want to discard?</DialogTitle>
//               <DialogDescription>
//                 This action cannot be undone. This will permanently discard the
//                 new version.
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsDiscardDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button variant="destructive" onClick={handleDiscard}>
//                 Discard
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//         <Dialog
//           open={isApproveDialogOpen}
//           onOpenChange={setIsApproveDialogOpen}
//         >
//           <DialogTrigger asChild>
//             <Button size="lg" className="shadow-md">
//               <Check className="mr-2 h-4 w-4" /> Approve
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Are you sure you want to approve?</DialogTitle>
//               <DialogDescription>
//                 This will publish the new version. You will need to enter an OTP
//                 to confirm.
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsApproveDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleApprove}>Approve</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//       <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Enter OTP</DialogTitle>
//             <DialogDescription>
//               Please enter the One-Time Password sent to your email or phone.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="otp" className="text-right">
//                 OTP
//               </Label>
//               <Input
//                 id="otp"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsOtpDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleOtpSubmit}>Submit</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//       <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 justify-center items-start">
//         <MobileEmulator
//           title="Current Version"
//           content={renderContent(currentVersion, newVersion)}
//         />
//         <MobileEmulator
//           title="New Version"
//           content={renderContent(newVersion, currentVersion)}
//         />
//       </div>
//     </div>
//   );
// }
