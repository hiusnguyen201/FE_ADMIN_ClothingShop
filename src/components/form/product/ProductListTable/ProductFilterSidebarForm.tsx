import { FilterSidebar } from "@/components/FilterSidebar";
import { InputFormField } from "@/components/form-fields/InputFormField";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { PRODUCT_STATUS } from "@/types/product";
import { Button } from "@/components/ui/button";
import { SelectFormField } from "@/components/form-fields";
import { useFormik } from "formik";
import { GetListProductPayload } from "@/redux/product/product.type";
import { object, string } from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CategoryState } from "@/redux/category/category.type";
import { getListCategory } from "@/redux/category/category.thunk";
import { SelectBoxFormField } from "@/components/form-fields/SelectBoxFormField";
import { filterTruthyValues } from "@/utils/object";

type FilterParams = Pick<GetListProductPayload, "maxPrice" | "minPrice" | "categoryIds" | "status">;

type ProductFilterSidebarFormProps = {
  onApplyFilter: (filters: FilterParams) => void;
  values: FilterParams;
};

const MIN_PRICE_FILTER = 0;
const MAX_PRICE_FILTER = 1000000;

const initialValues: FilterParams = {
  minPrice: undefined,
  maxPrice: undefined,
  categoryIds: null,
  status: null,
};

const filterProductSchema = object().shape({
  minPrice: string().min(MIN_PRICE_FILTER).max(MAX_PRICE_FILTER),
  maxPrice: string().min(MIN_PRICE_FILTER).max(MAX_PRICE_FILTER),
  categoryIds: string().nullable().default(null),
  status: string().nullable().default(null),
});

export function ProductFilterSidebarForm({ onApplyFilter, values }: ProductFilterSidebarFormProps) {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector<CategoryState>((state) => state.category);
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
    (async () => {
      await dispatch(getListCategory({ page: 1, limit: 100 }));
    })();
  }, []);

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
        {/* <div>
          <Label className="select-none mb-2 block">Product price</Label>
          <div className="flex items-center gap-2">
            <InputFormField
              onValueChange={(value) => formik.setFieldValue("minPrice", value)}
              name="minPrice"
              type="number"
              value={formik.values.minPrice ?? ""}
              unit="đ"
              min={MIN_PRICE_FILTER}
              max={MAX_PRICE_FILTER}
              error={formik.errors.minPrice}
            />
            <span>—</span>
            <InputFormField
              onValueChange={(value) => formik.setFieldValue("maxPrice", value)}
              name="maxPrice"
              type="number"
              value={formik.values.maxPrice ?? ""}
              unit="đ"
              min={MIN_PRICE_FILTER}
              max={MAX_PRICE_FILTER}
              error={formik.errors.maxPrice}
            />
          </div>
        </div> */}

        <SelectFormField
          name="status"
          label="Product status"
          value={formik.values.status}
          onValueChange={(value) => formik.setFieldValue("status", value)}
          options={Object.values(PRODUCT_STATUS).map((item) => ({ value: item, title: item }))}
        />

        <SelectBoxFormField
          label="Product category"
          type="checkbox"
          name="categoryIds"
          direction="column"
          value={formik.values.categoryIds?.split(",") ?? []}
          onValueChange={(values) => formik.setFieldValue("categoryIds", values.join(","))}
          options={list.map((item) => ({ value: item.id, label: item.name }))}
        />

        <Button type="submit" className="w-full mt-6">
          Query
        </Button>
      </form>
    </FilterSidebar>
  );
}
