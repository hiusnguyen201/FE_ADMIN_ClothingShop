import { Fragment } from 'react';
import * as Yup from 'yup';
import { CreateDialogForm } from '@/components/dialog-form';
import { InputField, SelectField } from '@/components/field';
import { GENDER, REGEX_PATTERN } from '@/constant';
import { capitalizeStr } from '@/utils/string';

const initialValues = { name: '', email: '', gender: null };

const createUserSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  email: Yup.string().email().required(),
  phone: Yup.string().matches(REGEX_PATTERN.PHONE_NUMBER.VN, 'Invalid Vietnamese phone number').required(),
  gender: Yup.mixed().oneOf(Object.values(GENDER)).required(),
  roleId: Yup.string(),
});

export function CreateUserDialogForm({ open, onClose }) {
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

          <SelectField
            name="gender"
            type="radio"
            label="Gender"
            required
            {...formikProps}
            options={Object.values(GENDER)}
          />

          <SelectField name="roleId" type="select" label="Role" {...formikProps} options={Object.values(GENDER)} />
        </Fragment>
      )}
    </CreateDialogForm>
  );
}
