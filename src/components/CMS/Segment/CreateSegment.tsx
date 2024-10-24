import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import Select from "react-select";
import { ArrowLeft, Smartphone } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getSegments } from "@services/cmsServices";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  ComponentOrder,
  FormSegmentSchemaType,
  MobileComponent,
  SegmentMutationPayload,
} from "cms";
import { FormSegmentSchema } from "@schemas/cms/segments";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import {
  reactSelectSingleStyles,
  reactSelectStyles,
} from "@components/ui/ReactSelect/reactSelect";
import {
  coins,
  customerTypeList,
  CustomOptionType,
  daysSinceLatestFormFilled,
  formStatus,
  genderList,
  generateQueryString,
  getErrorMessage,
  mapToSelectOptions,
  phases,
  stages as stagesList,
  streaks,
} from "@utils/common";
import DiffCheckerDrawer from "../DiffChecker/DiffCheckerDrawer";
import { useDiffCheckerStore } from "../store/useCmsStore";
import { useSegmentComponentContent } from "src/queries/cms/segments";
import {
  useComponentBulk,
  useGetPublishedComponents,
} from "src/queries/cms/component";
import ComponentOrders from "./ComponentReOrders";
import { toast } from "react-toastify";

type CreateSegmentProps = {
  onSubmit: (content: SegmentMutationPayload) => void;
  onBack?: () => void;
};

const products = [
  { label: "Product 1", value: "product1" },
  { label: "Product 2", value: "product2" },
  { label: "Product 3", value: "product3" },
  { label: "Product 4", value: "product4" },
];

const weeks = [
  { label: "Week 1", value: "week1" },
  { label: "Week 2", value: "week2" },
  { label: "Week 3", value: "week3" },
  { label: "Week 4", value: "week4" },
];

const defaultValues = {
  name: "",
  gender: undefined,
  weeksInProgram: [],
  orderCounts: "",
  components: [],
  recommendedProducts: [],
  formStatus: undefined,
  coins: undefined,
  stages: undefined,
  streaks: undefined,
  phases: undefined,
  customerType: undefined,
  daysSinceLatestFormFilled: undefined,
};
export default function CreateSegment({
  onSubmit,
  onBack,
}: CreateSegmentProps) {
  const navigate = useNavigate();
  const handleSubmit = (data: FormSegmentSchemaType) => {
    onSubmit({ payload: data, id });
  };

  const { id } = useParams<{ id: string | "new" }>();

  const form = useForm<FormSegmentSchemaType>({
    resolver: zodResolver(FormSegmentSchema),
    defaultValues,
  });
  const isNew = id === "new";

  const queryString = generateQueryString({
    segment_id: id,
  });
  const { data: segment, refetch } = useQuery({
    queryKey: ["getSegments", queryString],
    queryFn: () => getSegments(queryString),
    enabled: false,
  });

  const [gender, setGender] = useState<string>();

  const { data: components, refetch: refetchComponents } =
    useGetPublishedComponents(generateQueryString({ gender }), {
      enabled: false,
    });

  useEffect(() => {
    if (isNew || gender) {
      refetchComponents();
    }
  }, [gender, refetchComponents, isNew]);

  const componentsData = components ?? [];

  const handleClearReset = () => {
    if (!isNew) {
      form.setValue("components", []);
    } else {
      form.reset(defaultValues);
    }
  };
  useEffect(() => {
    if (!isNew) {
      refetch();
    } else {
      toast.error("Unable to create the segment");
      navigate("/cms/segments/");
    }
  }, [isNew, refetch, id, navigate]);

  useEffect(() => {
    if (segment) {
      if (_.isEmpty(segment?.mainData)) toast.error("Segment Not Found");
      const data = _.get(segment, ["mainData", 0]) || {};
      const name = _.get(data, ["name"]);
      const gender = genderList.find(
        (gender) => gender.value === _.get(data, ["gender"]),
      );
      if (gender) setGender(gender.value);

      const orderCounts = _.first(_.get(data, ["order_counts"]));
      const recommendedProducts = _.get(data, ["recommended_products"]) || [];

      let componentIds: ComponentOrder[] = [];
      if (data.status === "published") {
        componentIds = _.get(data, ["data", "component_ids"]) || [];
      } else {
        componentIds = _.get(data, ["draft_data", "component_ids"]) || [];
      }

      const selectedProducts = _.map(recommendedProducts, (product) => ({
        label: product,
        value: product,
      }));

      // Set the order of components
      componentIds = _.orderBy(componentIds, "order", "asc");

      const formStatus = mapToSelectOptions([_.get(data, ["form_status"])])[0];
      const haveCoins = coins.find(
        (coin) => coin.value === (data.have_coins ? "yes" : "no"),
      );

      let stages: CustomOptionType[] = [];

      if (!_.isEmpty(data.stages)) {
        stages = stagesList.filter((stage) =>
          data.stages.includes(Number(stage.value)),
        );
      }

      let weeksInProgram: CustomOptionType[] = [];

      if (!_.isEmpty(data.weeks_in_program)) {
        weeksInProgram = weeks.filter((week) =>
          data.weeks_in_program.includes(week.value),
        );
      }

      let streakLength: CustomOptionType[] = [];

      if (!_.isEmpty(data.streak_length)) {
        streakLength = streaks.filter((streak) =>
          data.streak_length.includes(Number(streak.value)),
        );
      }

      const customerType = _.get(data, ["customer_type"]);

      const selectedCustomerType: CustomOptionType | undefined = customerType
        ? { label: customerType, value: customerType }
        : undefined;
      form.reset({
        name,
        gender,
        recommendedProducts: selectedProducts,
        orderCounts,
        components: componentIds,
        weeksInProgram: weeksInProgram,
        stages: stages,
        coins: haveCoins,
        formStatus,
        customerType: selectedCustomerType,
        streaks: streakLength,
      });
    }
  }, [segment, form]);

  const {
    isDiffCheckerOpen,
    toggleDiffCheckerDrawer,
    updateDiffStates,
    resetDiffCheckerStates,
  } = useDiffCheckerStore();

  const componentBulkQuery = useComponentBulk(
    {
      componentIds: _.map(form.getValues("components"), "component_id"),
      draftdata: false,
    },
    { enabled: false },
  );
  const segmentComponentContentQuery = useSegmentComponentContent(
    {
      segmentId: id ?? "defaultSegmentId",
      draftdata: false,
    },
    { enabled: false },
  );
  async function handlePhoneView() {
    if (!(await form.trigger())) return;
    resetDiffCheckerStates();
    const segmentComponentContentData =
      await segmentComponentContentQuery.refetch();

    // Done for the TS
    const currentVersiontransformedData: MobileComponent[] | null =
      segmentComponentContentData?.data
        ? segmentComponentContentData.data.map((item) => ({
            status: item.status,
            componentId: item.componentId,
            name: item.name,
            title: item.title,
            description: item.description,
            current_version: item.current_version,
            contents: item.contents
              ? item.contents.map((content) => ({
                  ...content,
                }))
              : [],
          }))
        : null;

    let componentsBulkData: UseQueryResult<MobileComponent[]> | null = null;
    if (segment?.mainData[0].status !== "published" || form.formState.isDirty)
      componentsBulkData = await componentBulkQuery.refetch();

    const modifiedSegment = form.getValues();
    const existingSegment = _.get(segment, ["mainData", 0]);
    const draftData = {
      component_ids: _.get(modifiedSegment, ["components"]),
    };

    const data = {
      component_ids:
        existingSegment?.status !== "published"
          ? existingSegment?.draft_data
          : existingSegment.data,
    };

    updateDiffStates({
      entityType: "segment",
      currentVersion: currentVersiontransformedData,
      newVersion: componentsBulkData?.data ?? null,
      data,
      draftData,
    });
    toggleDiffCheckerDrawer();

    if (componentsBulkData && componentsBulkData.isError) {
      toast.error(getErrorMessage(componentsBulkData.error));
    }

    if (segmentComponentContentQuery.isError) {
      toast.error(getErrorMessage(segmentComponentContentQuery.error));
    }
  }
  return (
    <div className="w-3/4 mx-auto">
      <div className="flex flex-wrap justify-between my-6 ">
        <Button onClick={onBack} variant="ghost" aria-label="Go back">
          <ArrowLeft className="h-4 w-4 mr-4" />
          <h3 className="font-bold text-xl">
            {isNew ? "Create" : "Edit"} Segment
            {_.get(segment, ["mainData", 0, "status"]) == "draft"
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
            <h4 className="text-base font-[500]">Segment Parameters</h4>

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
                        disabled={!isNew}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {isNew || !_.isEmpty(form.getValues("customerType")) ? (
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
                            onChange={(newValue) => {
                              setGender(newValue?.value);
                              onChange(newValue);
                            }}
                            ref={ref}
                            isDisabled={!isNew}
                            styles={reactSelectSingleStyles}
                            placeholder="Gender"
                            options={genderList}
                            value={value || null}
                            components={
                              !isNew
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : undefined
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              {isNew || !_.isEmpty(form.getValues("formStatus")) ? (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="formStatus"
                    render={({ field: { onChange, onBlur, ref, value } }) => (
                      <FormItem>
                        <FormLabel>Form Status</FormLabel>
                        <FormControl>
                          <Select
                            id="formStatus"
                            onBlur={onBlur}
                            onChange={onChange}
                            ref={ref}
                            isDisabled={!isNew}
                            styles={reactSelectStyles}
                            placeholder="Form Status"
                            options={formStatus}
                            value={value || null}
                            components={
                              !isNew
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : undefined
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              {isNew || form.getValues("weeksInProgram")?.length ? (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="weeksInProgram"
                    render={({ field: { onChange, onBlur, ref, value } }) => (
                      <FormItem>
                        <FormLabel>Weeks in Program</FormLabel>
                        <FormControl>
                          <Select
                            id="weeksInProgram"
                            onBlur={onBlur}
                            onChange={onChange}
                            ref={ref}
                            isDisabled={!isNew}
                            styles={reactSelectStyles}
                            placeholder="weeks..."
                            options={weeks}
                            value={value}
                            isMulti
                            components={
                              !isNew
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : undefined
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              {isNew || !_.isEmpty(form.getValues("orderCounts")) ? (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="orderCounts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Orders Count</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter orders count"
                            {...field}
                            disabled={!isNew}
                            className={!isNew ? "bg-muted" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              {isNew ||
              !_.isEmpty(form.getValues("daysSinceLatestFormFilled")) ? (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="daysSinceLatestFormFilled"
                    render={({ field: { onChange, onBlur, ref, value } }) => (
                      <FormItem>
                        <FormLabel>Days Since Latest Form Filled</FormLabel>
                        <FormControl>
                          <Select
                            id="daysSinceLatestFormFilled"
                            onBlur={onBlur}
                            onChange={onChange}
                            ref={ref}
                            isDisabled={!isNew}
                            styles={reactSelectStyles}
                            placeholder="Latest Form Filled"
                            options={daysSinceLatestFormFilled}
                            value={value || null}
                            components={
                              !isNew
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : undefined
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              {isNew || !_.isEmpty(form.getValues("stages")) ? (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="stages"
                    render={({ field: { onChange, onBlur, ref, value } }) => (
                      <FormItem>
                        <FormLabel>Stages</FormLabel>
                        <FormControl>
                          <Select
                            id="stages"
                            onBlur={onBlur}
                            onChange={onChange}
                            ref={ref}
                            isDisabled={!isNew}
                            styles={reactSelectStyles}
                            placeholder="Stage"
                            options={stagesList}
                            value={value || null}
                            isMulti
                            components={
                              !isNew
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : undefined
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}

              {isNew || !_.isEmpty(form.getValues("streaks")) ? (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="streaks"
                    render={({ field: { onChange, onBlur, ref, value } }) => (
                      <FormItem>
                        <FormLabel>Streak</FormLabel>
                        <FormControl>
                          <Select
                            id="streaks"
                            onBlur={onBlur}
                            onChange={onChange}
                            ref={ref}
                            isDisabled={!isNew}
                            styles={reactSelectStyles}
                            placeholder="streaks"
                            options={streaks}
                            value={value || null}
                            isMulti
                            components={
                              !isNew
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : undefined
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              {isNew || !_.isEmpty(form.getValues("coins")) ? (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="coins"
                    render={({ field: { onChange, onBlur, ref, value } }) => (
                      <FormItem>
                        <FormLabel>Coins</FormLabel>
                        <FormControl>
                          <Select
                            id="coins"
                            onBlur={onBlur}
                            onChange={onChange}
                            ref={ref}
                            isDisabled={!isNew}
                            styles={reactSelectStyles}
                            placeholder="coins"
                            options={coins}
                            value={value || null}
                            components={
                              !isNew
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : undefined
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              {isNew || !_.isEmpty(form.getValues("phases")) ? (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="phases"
                    render={({ field: { onChange, onBlur, ref, value } }) => (
                      <FormItem>
                        <FormLabel>Phases</FormLabel>
                        <FormControl>
                          <Select
                            id="phases"
                            onBlur={onBlur}
                            onChange={onChange}
                            ref={ref}
                            isDisabled={!isNew}
                            styles={reactSelectStyles}
                            placeholder="phases"
                            options={phases}
                            value={value || null}
                            components={
                              !isNew
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : undefined
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}

              {isNew || !_.isEmpty(form.getValues("customerType")) ? (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="customerType"
                    render={({ field: { onChange, onBlur, ref, value } }) => (
                      <FormItem>
                        <FormLabel>Customer Type</FormLabel>
                        <FormControl>
                          <Select
                            id="customerType"
                            onBlur={onBlur}
                            onChange={onChange}
                            ref={ref}
                            isDisabled={!isNew}
                            styles={reactSelectSingleStyles}
                            placeholder="Customer Type"
                            options={customerTypeList}
                            value={value}
                            components={
                              !isNew
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : undefined
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}

              {isNew || !_.isEmpty(form.getValues("recommendedProducts")) ? (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="recommendedProducts"
                    render={({ field: { onChange, onBlur, ref, value } }) => (
                      <FormItem>
                        <FormLabel>Recommended Products</FormLabel>
                        <FormControl>
                          <Select
                            id="recommendedProducts"
                            onBlur={onBlur}
                            onChange={onChange}
                            ref={ref}
                            isDisabled={!isNew}
                            styles={reactSelectStyles}
                            placeholder="Recommended Products..."
                            options={products}
                            value={value}
                            isMulti
                            components={
                              !isNew
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : undefined
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="components"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Select Components
                    </FormLabel>
                    <FormControl>
                      <ComponentOrders
                        onChange={onChange}
                        availableComponents={componentsData}
                        selectedComponents={value}
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
                onClick={handleClearReset}
              >
                Clear
              </Button>
              <Button
                type="submit"
                className="w-36"
                disabled={!form.formState.isDirty}
              >
                {isNew ? "Create Segment" : "Save Segment"}
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
