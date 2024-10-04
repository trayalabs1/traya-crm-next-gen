import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import Select from "react-select";
import { ArrowLeft, Smartphone } from "lucide-react";
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
import { reactSelectStyles } from "@components/ui/ReactSelect/reactSelect";
import { generateQueryString } from "@utils/common";
// import DiffCheckerDrawer from "../DiffChecker/DiffCheckerDrawer";
type CreateComponentProps = {
  onSubmit: (content: ComponentMutationPayload) => void;
  onBack?: () => void;
};

const defaultValues = {
  name: "",
  data: {
    title: "",
    description: "",
    contents: [],
  },
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
    defaultValues,
  });

  const queryString = generateQueryString({
    component_id: id,
  });

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
      const data = _.get(component, ["mainData", 0]);
      const name = _.get(data, ["name"]);
      let dataKey = "data";
      if (data.status === "draft") dataKey = "draft_data";
      const title = _.get(data, [dataKey, "title"], "") || "";
      const description = _.get(data, [dataKey, "description"], "") || "";
      form.reset({ name, data: { title, description, contents: [] } });
    }
  }, [component, form]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="w-3/4 mx-auto">
      <div className="flex flex-wrap justify-between my-6 ">
        <div className="flex flex-wrap items-center">
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
            {isNew ? "Create" : "Edit"} Component
            {_.get(component, ["mainData", 0, "status"]) == "draft"
              ? " (Draft Version) "
              : ""}
          </h3>
        </div>
        <Button
          disabled={!form.formState.isValid}
          onClick={toggleDrawer}
          className="bg-green-500 hover:bg-green-700 hover:ease-in"
          type="button"
        >
          <Smartphone className="mr-2 h-4 w-4" /> Phone Screen
        </Button>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                disabled={!isNew}
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
                disabled={!isNew}
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
                disabled={!isNew}
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
                        styles={reactSelectStyles}
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
                onClick={() => form.reset(defaultValues)}
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

      {/* <DiffCheckerDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        currentVersion={isNew ? undefined : {}}
        newVersion={isNew ? {} : undefined}
      /> */}
    </div>
  );
}
