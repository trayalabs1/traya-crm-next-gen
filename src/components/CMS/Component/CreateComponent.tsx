import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import Select, { StylesConfig } from "react-select";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetContents } from "src/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { FormComponentSchema } from "@schemas/cms/components";
import { ComponentMutationPayload, FormComponentSchemaType } from "cms";
import { useQuery } from "@tanstack/react-query";
import { getComponents } from "@services/cmsServices";
import { useEffect, useState } from "react";
import _ from "lodash";
type CreateComponentProps = {
  onSubmit: (content: ComponentMutationPayload) => void;
  onBack?: () => void;
};

type OptionType = { label: string; value: string };

const selectStyles: StylesConfig<OptionType, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
    "&:hover": {
      borderColor: "hsl(var(--border-hover))",
    },
    boxShadow: "none",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? "hsl(var(--primary))"
      : isFocused
        ? "hsl(var(--accent))"
        : "hsl(var(--background))",
    color: isSelected
      ? "hsl(var(--primary-foreground))"
      : "hsl(var(--foreground))",
    ":active": {
      backgroundColor: "hsl(var(--accent))",
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--accent))",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "hsl(var(--accent-foreground))",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "hsl(var(--accent-foreground))",
    ":hover": {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  }),
};

export default function CreateComponent({
  onSubmit,
  onBack,
}: CreateComponentProps) {
  const { id } = useParams();

  const isNew = id === "new";

  const handleSubmit = (data: FormComponentSchemaType) => {
    onSubmit({ payload: data, id });
  };
  const { data: contents } = useGetContents();
  const { mainData } = contents || { mainData: [] };

  const contentsOptions = mainData.map((content) => ({
    value: content.content_id,
    label: content.name,
  }));

  const form = useForm<FormComponentSchemaType>({
    resolver: zodResolver(FormComponentSchema),
    defaultValues: {
      name: "",
      data: {
        title: "",
        description: "",
        contents: [],
      },
    },
  });

  const [queryString] = useState<string>(`component_id=${id}`);
  const { refetch, data: component } = useQuery({
    queryKey: ["getComponent", queryString],
    queryFn: () => getComponents(queryString),
    enabled: false,
  });

  useEffect(() => {
    if (!isNew) {
      refetch();
    }
  }, [isNew, refetch, id]);

  useEffect(() => {
    if (component) {
      console.log(component, "com");

      const data = _.get(component, ["mainData", 0]);
      const name = _.get(data, ["name"]);
      let dataKey = "data";
      if (data.status === "draft") dataKey = "draft_data";
      const title = _.get(data, [dataKey, "title"], "") || "";
      const description = _.get(data, [dataKey, "description"], "") || "";
      form.reset({ name, data: { title, description, contents: [] } });
    }
  }, [component, form]);

  return (
    <>
      <div className="flex items-center m-6 ">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
          className="mr-2"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-bold text-xl">
          {" "}
          {isNew ? "Create" : "Edit"} Component
        </h3>
      </div>
      <div className="w-3/4 mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="data.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="data.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="data.contents"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <FormItem>
                    <FormLabel>Contents</FormLabel>
                    <FormControl>
                      <Select
                        id="data.contents"
                        onBlur={onBlur}
                        onChange={onChange}
                        ref={ref}
                        styles={selectStyles}
                        isMulti
                        placeholder="Select contents..."
                        options={contentsOptions}
                        value={value}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <Button
                type="reset"
                className="w-36"
                variant="outline"
                onClick={() => form.reset()}
              >
                Clear
              </Button>
              <Button type="submit" className="w-36">
                {isNew ? "Create" : "Save"} Component
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
