import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import Select from "react-select";
import { ArrowLeft, Smartphone } from "lucide-react";
import { useParams } from "react-router-dom";
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
import {
  ComponentMutationPayload,
  FormComponentSchemaType,
  MobileComponent,
  MobileContent,
} from "cms";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getComponents } from "@services/cmsServices";
import { useEffect, useState } from "react";
import _, { get } from "lodash";
import { reactSelectStyles } from "@components/ui/ReactSelect/reactSelect";
import {
  componentTypeList,
  genderList,
  generateQueryString,
  getErrorMessage,
  languageList,
} from "@utils/common";
import ContentReOrders from "./ContentReOrders";
import { useDiffCheckerStore } from "../store/useCmsStore";
import DiffCheckerDrawer from "../DiffChecker/DiffCheckerDrawer";
import { useComponentBulk } from "src/queries/cms/component";
import { toast } from "@hooks/use-toast";
import { useContentBulk, useGetPublishedContents } from "@queries/cms/contents";
// import DiffCheckerDrawer from "../DiffChecker/DiffCheckerDrawer";
type CreateComponentProps = {
  onSubmit: (content: ComponentMutationPayload) => void;
  onBack?: () => void;
};

const defaultValues = {
  name: "",
  gender: undefined,
  language: undefined,
  componentType: undefined,
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
  const [isDynamicType, setIsDynamicType] = useState<boolean>(false);
  const isNew = id === "new";

  const handleSubmit = (data: FormComponentSchemaType) => {
    onSubmit({ payload: data, id });
  };

  const { data: contents } = useGetPublishedContents();

  const contentsData = contents ?? [];

  const form = useForm<FormComponentSchemaType>({
    resolver: zodResolver(FormComponentSchema),
    mode: "onChange",
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
      const componentData = _.get(component, ["mainData", 0]);
      // if (!componentData) return;

      const dataKey = componentData.status === "draft" ? "draft_data" : "data";
      const formData: Partial<FormComponentSchemaType> = {
        name: componentData.name || "",
        gender: componentData.gender
          ? { label: componentData.gender, value: componentData.gender }
          : undefined,
        language: componentData.language
          ? { label: componentData.language, value: componentData.language }
          : undefined,
        componentType: componentData.component_type
          ? {
              label: componentData.component_type,
              value: componentData.component_type,
            }
          : undefined,
        data: {
          title: _.get(componentData, [dataKey, "title"]) || "",
          description: _.get(componentData, [dataKey, "description"]) || "",
          contents: _.get(componentData, [dataKey, "content_ids"]),
        },
      };

      form.reset(formData);
      setIsDynamicType(componentData.component_type === "Dynamic");
    }
  }, [component, form]);

  const {
    isDiffCheckerOpen,
    toggleDiffCheckerDrawer,
    updateDiffStates,
    resetDiffCheckerStates,
  } = useDiffCheckerStore();

  const componentBulkQuery = useComponentBulk(
    { componentIds: [id ?? "defaultId"] },
    { enabled: false },
  );

  const contentBulkQuery = useContentBulk(
    { contentIds: _.map(form.getValues("data.contents"), "content_id") },
    { enabled: false },
  );

  async function handlePhoneView() {
    resetDiffCheckerStates();

    let componentsBulkData: UseQueryResult<MobileComponent[]> | null = null;
    let contentsBulkData: UseQueryResult<MobileContent[]> | null = null;

    if (!isNew) componentsBulkData = await componentBulkQuery.refetch();

    contentsBulkData = await contentBulkQuery.refetch();
    const componentData = _.get(component, ["mainData", 0]);
    const newComponentData = form.getValues();
    const newVersiontransformedData: MobileComponent[] | null = [
      {
        componentId: componentData?.component_id || "",
        name: newComponentData.name,
        title: newComponentData.data.title,
        description: newComponentData.data.description,
        contents: contentsBulkData?.data || [],
      },
    ];

    const currentComponent = form.getValues();
    const draftData = {
      title: get(currentComponent, ["data", "title"]),
      description: get(currentComponent, ["data", "description"]),
      content_ids: get(currentComponent, ["data", "contents"]),
    };

    const data = {
      title: get(componentBulkQuery, ["data", 0, "title"]),
      description: get(componentBulkQuery, ["data", 0, "description"]),
      content_ids: get(componentBulkQuery, ["data", 0, "contents"]),
    };

    updateDiffStates({
      entityType: "component",
      currentVersion: componentsBulkData?.data,
      newVersion: newVersiontransformedData,
      data,
      draftData,
    });

    if (componentsBulkData && componentsBulkData.isError) {
      toast({
        variant: "destructive",
        duration: 1000,
        description: getErrorMessage(componentsBulkData.error),
      });
    }
    if (contentsBulkData && contentsBulkData.isError) {
      toast({
        variant: "destructive",
        duration: 1000,
        description: getErrorMessage(contentsBulkData.error),
      });
    }
    toggleDiffCheckerDrawer();
  }

  function handleFormClear() {
    if (!isNew) {
      form.resetField("data", {
        defaultValue: { contents: [], title: "", description: "" },
      });
      form.setValue("data.contents", []);
    } else {
      form.reset(defaultValues);
    }
  }
  return (
    <div className="w-3/4 mx-auto">
      <div className="flex flex-wrap justify-between my-6 ">
        <Button onClick={onBack} variant="ghost" aria-label="Go back">
          <ArrowLeft className="h-4 w-4 mr-4" />
          <h3 className="font-bold text-xl">
            {isNew ? "Create" : "Edit"} Component
            {_.get(component, ["mainData", 0, "status"]) == "draft"
              ? " (Draft Version) "
              : ""}
          </h3>
        </Button>

        <Button
          onClick={handlePhoneView}
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Name"
                        {...field}
                        disabled={!isNew || isDynamicType}
                      />
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
                      <Input
                        placeholder="Enter title"
                        {...field}
                        disabled={isDynamicType}
                      />
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
                      <Input
                        placeholder="Enter description"
                        {...field}
                        disabled={isDynamicType}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          id="gender"
                          onBlur={onBlur}
                          onChange={onChange}
                          ref={ref}
                          isDisabled={!isNew || isDynamicType}
                          styles={reactSelectStyles}
                          placeholder="Select Gender"
                          options={genderList}
                          value={value || null}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Select
                          id="language"
                          onBlur={onBlur}
                          onChange={onChange}
                          ref={ref}
                          isDisabled={!isNew || isDynamicType}
                          styles={reactSelectStyles}
                          placeholder="Select Language"
                          options={languageList}
                          value={value || null}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="componentType"
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <FormItem>
                      <FormLabel>Component Type</FormLabel>
                      <FormControl>
                        <Select
                          id="componentType"
                          onBlur={onBlur}
                          onChange={onChange}
                          ref={ref}
                          isDisabled={!isNew || isDynamicType}
                          styles={reactSelectStyles}
                          placeholder="Select Component Type"
                          options={componentTypeList.filter(
                            (type) => type.label !== "Dynamic",
                          )}
                          value={value || null}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="data.contents"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Select Content</FormLabel>
                    <FormControl>
                      <ContentReOrders
                        onChange={onChange}
                        availableContents={contentsData}
                        selectedContents={value}
                        isDisabled={isDynamicType}
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
                onClick={handleFormClear}
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

      <DiffCheckerDrawer
        isDrawerOpen={isDiffCheckerOpen}
        toggleDrawer={toggleDiffCheckerDrawer}
      />
    </div>
  );
}
