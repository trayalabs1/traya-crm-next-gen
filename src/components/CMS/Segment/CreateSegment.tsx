import { useEffect } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import Select from "react-select";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { getComponents, getSegments } from "@services/cmsServices";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Component, FormSegmentSchemaType, SegmentMutationPayload } from "cms";
import { FormSegmentSchema } from "@schemas/cms/segments";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { reactSelectStyles } from "@components/ui/ReactSelect/reactSelect";
import {
  coins,
  daysSinceLatestFormFilled,
  formStatus,
  genderList,
  generateQueryString,
  phases,
  stages,
  streaks,
} from "@utils/common";
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

export default function CreateSegment({
  onSubmit,
  onBack,
}: CreateSegmentProps) {
  const handleSubmit = (data: FormSegmentSchemaType) => {
    onSubmit({ payload: data, id });
    // setShowOtpInput(true);
  };

  // const [otp, setOtp] = useState<string>("");
  // const handleOtpChange = () => {};

  // const [showOtpInput, setShowOtpInput] = useState(false);

  const { id } = useParams();

  const isNew = id === "new";

  const queryString = generateQueryString({
    segment_id: id,
  });
  const { data: segment, refetch } = useQuery({
    queryKey: ["getSegments", queryString],
    queryFn: () => getSegments(queryString),
    enabled: false,
  });

  const { data: components } = useQuery({
    queryKey: ["getComponents"],
    queryFn: () => getComponents(),
  });

  const form = useForm<FormSegmentSchemaType>({
    resolver: zodResolver(FormSegmentSchema),
    defaultValues: {
      name: "",
      gender: undefined,
      weeksInProgram: [],
      orderCounts: "",
      components: [],
      recommendedProducts: [],
      formStatus: undefined,
    },
  });

  const handleReset = () => {
    form.reset();
  };
  useEffect(() => {
    if (!isNew) {
      refetch();
    }
  }, [isNew, refetch, id]);

  useEffect(() => {
    if (segment) {
      const data = _.get(segment, ["mainData", 0]);
      const name = _.get(data, ["name"]);
      const gender = genderList.find(
        (gender) => gender.value === _.get(data, ["gender"]),
      );
      const orderCounts = _.get(data, ["order_counts"]);
      const recommendedProducts = _.get(data, ["recommended_products"]) || [];
      const component_ids = _.get(data, ["data", "components_ids"]) || [];

      const selectedProducts = _.map(recommendedProducts, (product) => ({
        label: product,
        value: product,
      }));
      const selectedComponents = _.map(component_ids, (component) => ({
        label: component,
        value: component,
      }));

      // let dataKey = "data";
      // if (data.status === "draft") dataKey = "draft_data";

      form.reset({
        name,
        gender,
        recommendedProducts: selectedProducts,
        orderCounts,
        components: selectedComponents,
      });
    }
  }, [segment, form]);

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
          {isNew ? "Create" : "Edit"} Segment
          {_.get(segment, ["mainData", 0, "status"]) == "draft"
            ? " (Draft Version) "
            : ""}
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
                          styles={reactSelectStyles}
                          placeholder="Select Gender"
                          options={genderList}
                          value={value}
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
                          styles={reactSelectStyles}
                          placeholder="Select Form Status"
                          options={formStatus}
                          value={value}
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
                  name="weeksInProgram"
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <FormItem>
                      <FormLabel>Select Weeks in Program</FormLabel>
                      <FormControl>
                        <Select
                          id="weeksInProgram"
                          onBlur={onBlur}
                          onChange={onChange}
                          ref={ref}
                          styles={reactSelectStyles}
                          placeholder="Select weeks..."
                          options={weeks}
                          value={value}
                          isMulti
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
                  name="orderCounts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Orders Count</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter orders count" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                          styles={reactSelectStyles}
                          placeholder="Select Latest Form Filled"
                          options={daysSinceLatestFormFilled}
                          value={value}
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
                          styles={reactSelectStyles}
                          placeholder="Select Stage"
                          options={stages}
                          value={value}
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
                          styles={reactSelectStyles}
                          placeholder="Select streaks"
                          options={streaks}
                          value={value}
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
                  name="coins"
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <FormItem>
                      <FormLabel>Coins</FormLabel>
                      <FormControl>
                        <Select
                          id="streak"
                          onBlur={onBlur}
                          onChange={onChange}
                          ref={ref}
                          styles={reactSelectStyles}
                          placeholder="Select coins"
                          options={coins}
                          value={value}
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
                          styles={reactSelectStyles}
                          placeholder="Select phases"
                          options={phases}
                          value={value}
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
                name="recommendedProducts"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <FormItem>
                    <FormLabel>Select Recommended Products</FormLabel>
                    <FormControl>
                      <Select
                        id="recommendedProducts"
                        onBlur={onBlur}
                        onChange={onChange}
                        ref={ref}
                        styles={reactSelectStyles}
                        placeholder="Select Recommended Products..."
                        options={products}
                        value={value}
                        isMulti
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
                name="components"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <FormItem>
                    <FormLabel>Select Components</FormLabel>
                    <FormControl>
                      <Select
                        id="components"
                        onBlur={onBlur}
                        onChange={onChange}
                        ref={ref}
                        styles={reactSelectStyles}
                        placeholder="Select components..."
                        options={_.map(
                          _.get(components, ["mainData"], []),
                          (item: Component) => ({
                            label: item.name,
                            value: item.component_id,
                          }),
                        )}
                        value={value}
                        isMulti
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* {showOtpInput && (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <InputOTP id="otp" maxLength={6} onChange={handleOtpChange}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            )} */}
            <div className="flex flex-wrap gap-2 justify-end">
              <Button
                type="reset"
                className="w-36"
                variant="outline"
                onClick={handleReset}
              >
                Clear
              </Button>
              <Button type="submit" className="w-36">
                {
                  // showOtpInput
                  //   ? "Verify OTP"
                  //   :
                  isNew ? "Create Segment" : "Save Segment"
                }
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
