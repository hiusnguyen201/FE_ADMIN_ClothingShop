import { FilterSidebar } from "@/components/FilterSidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { number, object } from "yup";
import { filterTruthyValues } from "@/utils/object";
import { GetListOrderPayload } from "@/redux/order/order.type";
import { Label } from "@/components/ui/label";
import { InputFormField } from "@/components/form-fields/InputFormField";

type FilterParams = Pick<GetListOrderPayload, "minTotal" | "maxTotal">;

type OrderFilterSidebarFormProps = {
  onApplyFilter: (filters: FilterParams) => void;
  values: FilterParams;
};

const initialValues: FilterParams = {
  minTotal: undefined,
  maxTotal: undefined,
};

const filterProductSchema = object().shape({
  minTotal: number().min(0).optional(),
  maxTotal: number().min(0).optional(),
});

export function OrderFilterSidebarForm({ onApplyFilter, values }: OrderFilterSidebarFormProps) {
  const [openFilter, setOpenFilter] = useState(false);

  const formik = useFormik({
    initialValues: values,
    validationSchema: filterProductSchema,
    onSubmit: (values: FilterParams) => {
      onApplyFilter(values);
      setOpenFilter(false);
    },
  });

  useEffect(() => {
    formik.setValues(values);
  }, [values]);

  return (
    <FilterSidebar
      isOpen={openFilter}
      title="Filter"
      countFilters={Object.keys(filterTruthyValues(values)).length}
      onClickClear={() => {
        onApplyFilter(initialValues);
      }}
      onOpenChange={setOpenFilter}
    >
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <Label className="select-none mb-2 block">Order total</Label>
          <div className="flex items-center gap-2">
            <InputFormField
              onValueChange={(value) => formik.setFieldValue("minTotal", value)}
              name="minTotal"
              type="number"
              value={formik.values.minTotal ?? ""}
              unit="đ"
              error={formik.errors.minTotal}
            />
            <span>—</span>
            <InputFormField
              onValueChange={(value) => formik.setFieldValue("maxTotal", value)}
              name="maxTotal"
              type="number"
              value={formik.values.maxTotal ?? ""}
              unit="đ"
              error={formik.errors.maxTotal}
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-6">
          Query
        </Button>
      </form>
    </FilterSidebar>
  );
}
