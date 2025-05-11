import { FilterSidebar } from "@/components/FilterSidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectFormField } from "@/components/form-fields";
import { useFormik } from "formik";
import { object, string } from "yup";
import { filterTruthyValues } from "@/utils/object";
import { GetListCustomerPayload } from "@/redux/customer/customer.type";
import { GENDER, USER_STATUS } from "@/types/user";

type FilterParams = Pick<GetListCustomerPayload, "status" | "gender">;

type CustomerFilterSidebarFormProps = {
  onApplyFilter: (filters: FilterParams) => void;
  values: FilterParams;
};

const initialValues: FilterParams = {
  status: undefined,
  gender: undefined,
};

const filterProductSchema = object().shape({
  status: string().nullable().default(null),
  gender: string().oneOf(Object.values(GENDER)),
});

export function CustomerFilterSidebarForm({ onApplyFilter, values }: CustomerFilterSidebarFormProps) {
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
        <SelectFormField
          name="status"
          label="Customer status"
          value={formik.values.status}
          onValueChange={(value) => formik.setFieldValue("status", value)}
          options={Object.values(USER_STATUS).map((item) => ({ value: item, title: item }))}
        />

        <SelectFormField
          name="gender"
          label="Gender"
          value={formik.values.gender}
          onValueChange={(value) => formik.setFieldValue("gender", value)}
          options={Object.values(GENDER).map((item) => ({ value: item, title: item }))}
        />

        <Button type="submit" className="w-full mt-6">
          Query
        </Button>
      </form>
    </FilterSidebar>
  );
}
