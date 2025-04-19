import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputFormikField, SelectObjectFormikField } from "@/components/formik-fields";
import { FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CreateOrderPayload } from "@/redux/order/order.type";
import { useEffect } from "react";
import { getListDistrict, getListProvince, getListWard } from "@/redux/division/division.thunk";
import { DivisionState } from "@/redux/division/division.type";

export function ShippingInformationCard({ formikProps }: { formikProps: FormikProps<CreateOrderPayload> }) {
  const dispatch = useAppDispatch();
  const { loading, list: division } = useAppSelector<DivisionState>((selector) => selector.division);

  useEffect(() => {
    (async () => {
      await dispatch(getListProvince()).unwrap();
    })();
  }, []);

  useEffect(() => {
    if (formikProps.values.provinceCode) {
      formikProps.setFieldValue("districtCode", "");
      formikProps.setFieldValue("wardCode", "");
      (async () => {
        await dispatch(getListDistrict({ provinceCode: formikProps.values.provinceCode })).unwrap();
      })();
    }
  }, [formikProps.values.provinceCode]);

  useEffect(() => {
    if (formikProps.values.districtCode) {
      formikProps.setFieldValue("wardCode", "");
      (async () => {
        await dispatch(getListWard({ districtCode: formikProps.values.districtCode })).unwrap();
      })();
    }
  }, [formikProps.values.districtCode]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>Enter the shipping details for this order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <SelectObjectFormikField
            searchable
            searchInForm
            loading={loading.getListProvince}
            disabled={division.provinces.length === 0}
            name="provinceCode"
            className="w-full"
            placeHolder="Select province"
            options={division.provinces.map((item) => ({ title: item.name, value: item.code }))}
            formikProps={formikProps}
          />

          <SelectObjectFormikField
            searchable
            searchInForm
            loading={loading.getListDistrict}
            disabled={division.districts.length === 0}
            name="districtCode"
            className="w-full"
            placeHolder="Select district"
            options={division.districts.map((item) => ({ title: item.name, value: item.code }))}
            formikProps={formikProps}
          />

          <SelectObjectFormikField
            searchable
            searchInForm
            loading={loading.getListWard}
            disabled={division.wards.length === 0}
            name="wardCode"
            className="w-full"
            placeHolder="Select ward"
            options={division.wards.map((item) => ({ title: item.name, value: item.code }))}
            formikProps={formikProps}
          />

          <InputFormikField
            name="address"
            type="text"
            className="w-full"
            placeholder="House number, street name, etc."
            formikProps={formikProps}
          />
        </div>
      </CardContent>
    </Card>
  );
}
