import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Switch } from "@components/ui/switch";
import {
  User,
  Mail,
  Lock,
  ArrowLeft,
  Camera,
  Calendar,
  Globe,
  Briefcase,
} from "lucide-react";
import { toast } from "@hooks/use-toast";

const personalFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender.",
  }),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Please enter a valid date in YYYY-MM-DD format.",
  }),
  description: z.string().max(160).optional(),
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  languages: z
    .array(z.string())
    .min(1, { message: "Please select at least one language." }),
});

const accountFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    currentPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const dutyShiftSchema = z.object({
  monday: z.object({ shift: z.string(), isBreak: z.boolean() }),
  tuesday: z.object({ shift: z.string(), isBreak: z.boolean() }),
  wednesday: z.object({ shift: z.string(), isBreak: z.boolean() }),
  thursday: z.object({ shift: z.string(), isBreak: z.boolean() }),
  friday: z.object({ shift: z.string(), isBreak: z.boolean() }),
  saturday: z.object({ shift: z.string(), isBreak: z.boolean() }),
  sunday: z.object({ shift: z.string(), isBreak: z.boolean() }),
});

type PersonalFormValues = z.infer<typeof personalFormSchema>;
type AccountFormValues = z.infer<typeof accountFormSchema>;
type DutyShiftValues = z.infer<typeof dutyShiftSchema>;

const defaultPersonalValues: Partial<PersonalFormValues> = {
  name: "John Doe",
  gender: "male",
  birthdate: "1990-01-01",
  description: "This is my description",
  role: "checker",
  languages: ["English", "Spanish"],
};

const defaultAccountValues: Partial<AccountFormValues> = {
  email: "john.doe@example.com",
};

const defaultDutyShiftValues: DutyShiftValues = {
  monday: { shift: "9:00 AM - 5:00 PM", isBreak: false },
  tuesday: { shift: "9:00 AM - 5:00 PM", isBreak: false },
  wednesday: { shift: "9:00 AM - 5:00 PM", isBreak: false },
  thursday: { shift: "9:00 AM - 5:00 PM", isBreak: false },
  friday: { shift: "9:00 AM - 5:00 PM", isBreak: false },
  saturday: { shift: "Off", isBreak: true },
  sunday: { shift: "Off", isBreak: true },
};

export default function AccountPage() {
  const [personalEditing, setPersonalEditing] = useState(false);
  const [accountEditing, setAccountEditing] = useState(false);
  const [dutyShiftEditing, setDutyShiftEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const personalForm = useForm<PersonalFormValues>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: defaultPersonalValues,
  });

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: defaultAccountValues,
  });

  const dutyShiftForm = useForm<DutyShiftValues>({
    resolver: zodResolver(dutyShiftSchema),
    defaultValues: defaultDutyShiftValues,
  });

  function onPersonalSubmit(data: PersonalFormValues) {
    toast({
      title: "Personal information updated",
      description: "Your personal information has been successfully updated.",
    });
    setPersonalEditing(false);
    console.log(data);
  }

  function onAccountSubmit(data: AccountFormValues) {
    toast({
      title: "Account settings updated",
      description: "Your account settings have been successfully updated.",
    });
    setAccountEditing(false);
    console.log(data);
  }

  function onDutyShiftSubmit(data: DutyShiftValues) {
    toast({
      title: "Duty shift updated",
      description: "Your duty shift has been successfully updated.",
    });
    setDutyShiftEditing(false);
    console.log(data);
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">Account</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-32 h-32 mb-4">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt="Profile picture" />
                ) : (
                  <AvatarFallback>
                    {getInitials(defaultPersonalValues.name || "")}
                  </AvatarFallback>
                )}
              </Avatar>
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={triggerImageUpload}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            <h2 className="text-2xl font-semibold">
              {defaultPersonalValues.name}
            </h2>
            <p className="text-muted-foreground">
              {defaultAccountValues.email}
            </p>
          </CardContent>
        </Card>
        <div className="w-full lg:w-2/3">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="duty">Duty Shift</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <Card className="min-h-[600px]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details here.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setPersonalEditing(!personalEditing)}
                    >
                      {personalEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Form {...personalForm}>
                    <form
                      onSubmit={personalForm.handleSubmit(onPersonalSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={personalForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <User className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                                <Input {...field} disabled={!personalEditing} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!personalEditing}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="birthdate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Birthdate</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <Calendar className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                                <Input
                                  type="date"
                                  {...field}
                                  disabled={!personalEditing}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <Briefcase className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                                <Input {...field} disabled={!personalEditing} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="languages"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Languages</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <Globe className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange([...field.value, value])
                                  }
                                  disabled={!personalEditing}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select languages" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="English">
                                      English
                                    </SelectItem>
                                    <SelectItem value="Spanish">
                                      Spanish
                                    </SelectItem>
                                    <SelectItem value="French">
                                      French
                                    </SelectItem>
                                    <SelectItem value="German">
                                      German
                                    </SelectItem>
                                    <SelectItem value="Chinese">
                                      Chinese
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </FormControl>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {field.value.map((language, index) => (
                                <div
                                  key={index}
                                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                                >
                                  {language}
                                  {personalEditing && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newLanguages = [...field.value];
                                        newLanguages.splice(index, 1);
                                        field.onChange(newLanguages);
                                      }}
                                      className="ml-2 text-secondary-foreground hover:text-primary-foreground"
                                    >
                                      ×
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="description"
                                className="resize-none"
                                {...field}
                                disabled={!personalEditing}
                              />
                            </FormControl>
                            <FormDescription>
                              You can @mention other users and organizations to
                              link to them.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {personalEditing && (
                        <Button type="submit">Update profile</Button>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="account">
              <Card className="min-h-[600px]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account settings and preferences.
                      </CardDescription>
                    </div>
                    <Button onClick={() => setAccountEditing(!accountEditing)}>
                      {accountEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Form {...accountForm}>
                    <form
                      onSubmit={accountForm.handleSubmit(onAccountSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={accountForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <Mail className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                                <Input
                                  {...field}
                                  type="email"
                                  disabled={!accountEditing}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {accountEditing && (
                        <>
                          <FormField
                            control={accountForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <Lock className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                                    <Input {...field} type="password" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={accountForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <Lock className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                                    <Input {...field} type="password" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={accountForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <Lock className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                                    <Input {...field} type="password" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      {accountEditing && (
                        <Button type="submit">Update account settings</Button>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="duty">
              <Card className="min-h-[600px]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Duty Shift</CardTitle>
                      <CardDescription>
                        Manage your weekly duty shift.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setDutyShiftEditing(!dutyShiftEditing)}
                    >
                      {dutyShiftEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Form {...dutyShiftForm}>
                    <form
                      onSubmit={dutyShiftForm.handleSubmit(onDutyShiftSubmit)}
                      className="space-y-8"
                    >
                      {Object.entries(defaultDutyShiftValues).map(([day]) => (
                        <FormField
                          key={day}
                          control={dutyShiftForm.control}
                          name={`${day as keyof DutyShiftValues}.shift`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="capitalize">
                                {day}
                              </FormLabel>
                              <div className="flex items-center space-x-4">
                                <FormControl>
                                  <div className="flex flex-1">
                                    <Calendar className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                                    <Input {...field} />
                                    {/* <Input {...field} disabled={!dutyShiftEditing || dutyShiftForm.watch(`${day}.isBreak`)} /> */}
                                  </div>
                                </FormControl>
                                <FormField
                                  control={dutyShiftForm.control}
                                  name={`${day as keyof DutyShiftValues}.isBreak`}
                                  render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                      <FormControl>
                                        <Switch
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                          disabled={!dutyShiftEditing}
                                        />
                                      </FormControl>
                                      <FormLabel>Break Day</FormLabel>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                      {dutyShiftEditing && (
                        <Button type="submit">Update duty shift</Button>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
