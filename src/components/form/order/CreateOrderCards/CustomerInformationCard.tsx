import { FlexBox } from "@/components/FlexBox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCustomerDialogForm } from "@/components/form/customer/CreateCustomerDialogForm";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputFormikField, SelectObjectFormikField } from "@/components/formik-fields";
import { FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CustomerState } from "@/redux/customer/customer.type";
import { getListCustomer } from "@/redux/customer/customer.thunk";
import { useCustomerTableFilters } from "@/components/form/customer/CustomerListTable/useCustomerTableFilters";
import { CreateOrderPayload } from "@/redux/order/order.type";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function CustomerInformationCard({ formikProps }: { formikProps: FormikProps<CreateOrderPayload> }) {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { setFieldValue, setFieldError, values } = formikProps;
  const { loading, list: customers, totalCount } = useAppSelector<CustomerState>((selector) => selector.customer);
  const { filters, handleKeywordChange, handlePageChange } = useCustomerTableFilters();

  useEffect(() => {
    (async () => {
      await dispatch(getListCustomer({ page: filters.page, limit: filters.limit, keyword: filters.keyword })).unwrap();
    })();
  }, [filters]);

  useEffect(() => {
    if (values.customerId) {
      const customer = customers.find((item) => item.id === values.customerId);
      setFieldValue("customerName", customer?.name);
      setFieldError("customerName", undefined);
      setFieldValue("customerPhone", customer?.phone);
      setFieldError("customerPhone", undefined);
      setFieldValue("customerEmail", customer?.email);
      setFieldError("customerEmail", undefined);
    }
  }, [values.customerId]);

  return (
    <Card>
      <CardHeader>
        <FlexBox direction="row" className="justify-between">
          <div>
            <CardTitle className="mb-2">Customer Information</CardTitle>
            <CardDescription>Select an existing customer or create a new one</CardDescription>
          </div>

          {!isMobile && (
            <CreateCustomerDialogForm>
              <Button>
                <Plus size={14} />
                Create Customer
              </Button>
            </CreateCustomerDialogForm>
          )}
        </FlexBox>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {isMobile && (
              <CreateCustomerDialogForm>
                <Button>
                  <Plus size={14} />
                  Create Customer
                </Button>
              </CreateCustomerDialogForm>
            )}

            <SelectObjectFormikField
              searchable
              pagination
              switchable
              searchValue={filters.keyword}
              onSearchChange={handleKeywordChange}
              name="customerId"
              label="Customer"
              required
              placeHolder="Select customer"
              loading={loading.getListCustomer}
              options={customers.map((item) => ({ title: item.email, value: item.id }))}
              formikProps={formikProps}
              onPageChange={handlePageChange}
              page={filters.page}
              limit={filters.limit}
              totalCount={totalCount}
            />
          </div>

          {values.customerId && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <InputFormikField
                name="customerName"
                placeholder="Enter customer name"
                type="text"
                formikProps={formikProps}
                label="Recipient name"
                required
              />
              <InputFormikField
                name="customerEmail"
                placeholder="Enter customer email"
                type="email"
                formikProps={formikProps}
                label="Recipient email"
                required
              />
              <InputFormikField
                placeholder="Enter customer phone"
                name="customerPhone"
                type="tel"
                formikProps={formikProps}
                label="Recipient phone"
                required
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
