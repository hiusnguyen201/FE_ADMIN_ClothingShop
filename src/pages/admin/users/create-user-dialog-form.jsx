import { Fragment } from 'react';
import * as Yup from 'yup';
import { CreateDialogForm } from '@/components/dialog-form';
import { InputField, SelectStringField, SelectObjectField } from '@/components/field';
import { GENDER, REGEX_PATTERN } from '@/constant';

const roles = [
  {
    value: '1',
    title: 'Admin',
  },
  {
    value: '2',
    title: 'Delivery',
  },
  {
    value: '3',
    title: 'Salesperson',
  },
];

const initialValues = {
  name: '',
  email: '',
  phone: '',
  gender: null,
  roleId: null,
};

const createUserSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  email: Yup.string().email().required(),
  phone: Yup.string().matches(REGEX_PATTERN.PHONE_NUMBER.VN, 'Invalid Vietnamese phone number').required(),
  gender: Yup.mixed().oneOf(Object.values(GENDER)).required(),
  roleId: Yup.string().nullable(),
});

export function CreateUserDialogForm({ open, onClose }) {
  if (!open) return <Fragment />;

  const handleSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  return (
    <CreateDialogForm
      title="Create user"
      open={open}
      onClose={onClose}
      initialValues={initialValues}
      validationSchema={createUserSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Fragment>
          <InputField name="name" type="text" label="Name" required {...formikProps} />

          <InputField name="email" type="email" label="Email" required {...formikProps} />

          <InputField name="phone" type="tel" label="Phone" required {...formikProps} />

          <SelectStringField
            name="gender"
            type="radio"
            label="Gender"
            required
            options={Object.values(GENDER)}
            {...formikProps}
          />

          <SelectObjectField name="roleId" label="Role" {...formikProps} options={roles} />
        </Fragment>
      )}
    </CreateDialogForm>
  );
}
