import { useState } from "react";
import { Trash2, Copy, Play } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Switch } from "@components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { useToast } from "@hooks/use-toast";

type MediaItem = {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  title: string;
  description: string;
  platform: string;
  uploadedBy: string;
  isEnabled: boolean;
  type: "image" | "video";
};

export default function MediaList() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      url: "https://example.com/video1.mp4",
      thumbnailUrl: "https://example.com/thumbnail1.jpg",
      title: "Sample Video",
      description: "This is a sample video",
      platform: "website",
      uploadedBy: "John Doe",
      isEnabled: true,
      type: "video",
    },
    {
      id: "2",
      url: "https://example.com/image1.jpg",
      thumbnailUrl: "https://example.com/image1.jpg",
      title: "Sample Image",
      description: "This is a sample image",
      platform: "crm",
      uploadedBy: "Jane Smith",
      isEnabled: true,
      type: "image",
    },
  ]);

  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setMediaItems(mediaItems.filter((item) => item.id !== id));
    toast({
      title: "Media deleted",
      description: "The selected media has been removed from the list.",
    });
  };

  const handleToggle = (id: string) => {
    setMediaItems(
      mediaItems.map((item) =>
        item.id === id ? { ...item, isEnabled: !item.isEnabled } : item,
      ),
    );
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "The media URL has been copied to your clipboard.",
    });
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Media Manager</CardTitle>
        <Link to="create">
          <Button>Create New Media</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mediaItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Play className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-auto"
                        />
                      ) : (
                        <video
                          src={item.url}
                          controls
                          poster={item.thumbnailUrl || undefined}
                          className="w-full h-auto"
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.platform}</TableCell>
                <TableCell>
                  <Switch
                    checked={item.isEnabled}
                    onCheckedChange={() => handleToggle(item.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(item.url)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy URL</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
