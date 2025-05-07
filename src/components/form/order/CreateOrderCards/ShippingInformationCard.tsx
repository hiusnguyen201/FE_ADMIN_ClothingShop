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
    if (formikProps.values.provinceId) {
      formikProps.setFieldValue("districtId", "");
      formikProps.setFieldValue("wardCode", "");
      (async () => {
        await dispatch(getListDistrict({ provinceId: formikProps.values.provinceId })).unwrap();
      })();
    }
  }, [formikProps.values.provinceId]);

  useEffect(() => {
    if (formikProps.values.districtId) {
      formikProps.setFieldValue("wardCode", "");
      (async () => {
        await dispatch(getListWard({ districtId: formikProps.values.districtId })).unwrap();
      })();
    }
  }, [formikProps.values.districtId]);

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
            name="provinceId"
            className="w-full"
            placeHolder="Select province"
            options={division.provinces.map((item) => ({ title: item.ProvinceName, value: item.ProvinceID }))}
            formikProps={formikProps}
          />

          <SelectObjectFormikField
            searchable
            searchInForm
            loading={loading.getListDistrict}
            disabled={division.districts.length === 0}
            name="districtId"
            className="w-full"
            placeHolder="Select district"
            options={division.districts.map((item) => ({ title: item.DistrictName, value: item.DistrictID }))}
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
            options={division.wards.map((item) => ({ title: item.WardName, value: item.WardCode }))}
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
