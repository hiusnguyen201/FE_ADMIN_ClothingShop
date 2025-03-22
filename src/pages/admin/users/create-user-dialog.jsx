import * as Yup from 'yup';
import { createContext, Fragment, useContext, useState } from 'react';
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

const CreateUserDialogContext = createContext();

export function CreateUserDialogProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openCreateUserDialog = () => {
    setOpen(true);
  };

  const closeCreateUserDialog = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  return (
    <CreateUserDialogContext.Provider value={{ open, openCreateUserDialog, closeCreateUserDialog }}>
      {children}

      {open && (
        <CreateDialogForm
          title="Create user"
          open={open}
          onClose={closeCreateUserDialog}
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
      )}
    </CreateUserDialogContext.Provider>
  );
}

export const useCreateUserDialog = () => {
  const context = useContext(CreateUserDialogContext);
  if (!context) {
    throw new Error('useCreateUserDialog must be used within a CreateUserDialogProvider');
  }
  return context;
};
