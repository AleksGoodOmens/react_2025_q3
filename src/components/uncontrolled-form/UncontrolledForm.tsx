import { Button } from '../button/Button';
import { ErrorMessage } from '../error-message/ErrorMessage';
import { PasswordStrength } from '../password-strength/PasswordStrength';
import { formSchema } from '@/schemas/formSchema';
import { toBase64 } from '@/utils/toBase64';
import { filesToFileList } from '@/utils/toFileList';
import { useState } from 'react';
import type { ErrorsMessageTypes } from '@/interfaces';

import { useStore } from '@/hooks';

interface Props {
  closeForm: () => void;
}

export const UncontrolledForm = ({ closeForm }: Props) => {
  const [errors, setErrors] = useState<ErrorsMessageTypes>({});
  const { countries, addToUnControlledForm } = useStore();
  const [value, setValue] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      gender: formData.get('gender'),
      tc: Boolean(formData.get('tc')),
      file: filesToFileList(formData.getAll('file') as File[]),
      country: formData.get('country'),
    };

    if (data.password) setValue(data.password as string);
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const formattedErrors: ErrorsMessageTypes = {};

      result.error.issues.forEach((err) => {
        const key = err.path[0] as keyof ErrorsMessageTypes;
        if (typeof key === 'string') {
          if (Array.isArray(formattedErrors[key])) {
            (formattedErrors[key] as string[]).push(err.message);
          } else {
            formattedErrors[key] = [err.message];
          }
        }
      });
      setErrors(formattedErrors);
      return;
    }

    const base64 = (await toBase64(data.file[0])) as string;

    const item = {
      ...result.data,
      age: result.data.age.toString(),
      file: base64,
      tc: result.data.tc ? 'on' : null,
    };

    addToUnControlledForm(item);
    closeForm();
  };
  return (
    <form className="grid gap-2 py-4" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Name</h3>
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['name'] && <ErrorMessage>{errors['name']}</ErrorMessage>}
        </label>
        <label className="relative rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Age</h3>
          <input
            type="number"
            id="age"
            name="age"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['age'] && <ErrorMessage>{errors['age']}</ErrorMessage>}
        </label>
      </div>
      <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
        <h3 className="rounded-t-xl bg-amber-600 p-2">Email</h3>
        <input
          type="email"
          placeholder="your email"
          name="email"
          id="email"
          className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
        />
        {errors['email'] && <ErrorMessage>{errors['email']}</ErrorMessage>}
      </label>
      <div className="flex gap-2">
        <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Password</h3>
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />

          <PasswordStrength text={value} />
          {errors['password'] && (
            <ErrorMessage>{errors['password'][0]}</ErrorMessage>
          )}
        </label>
        <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Confirm</h3>
          <input
            type="password"
            placeholder="confirm password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['confirmPassword'] && (
            <ErrorMessage>{errors['confirmPassword']}</ErrorMessage>
          )}
        </label>
      </div>
      <div className="relative grid grid-cols-2 rounded-2xl border bg-amber-400 p-2 pb-10">
        <label className="flex justify-center gap-2">
          <h3>Male</h3>
          <input
            type="radio"
            id="gender-male"
            name="gender"
            value={'male'}
            className="rounded-b-xl bg-amber-800 px-4 py-2"
          />
        </label>
        <label className="flex justify-center gap-2">
          <h3>Female</h3>
          <input
            type="radio"
            id="gender-female"
            name="gender"
            value={'female'}
            className="rounded-b-xl bg-amber-800 px-4 py-2"
          />
        </label>
        {errors['gender'] && <ErrorMessage>{errors['gender']}</ErrorMessage>}
      </div>

      <div className="flex">
        <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Upload file</h3>
          <input type="file" name="file" id="file" />
          {errors['file'] && <ErrorMessage>{errors['file']}</ErrorMessage>}
        </label>
        <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Country</h3>
          <select
            defaultValue="choose you country"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
            name="country"
          >
            {countries.map((country) => {
              return (
                <option key={country} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
          {errors['country'] && (
            <ErrorMessage>{errors['country']}</ErrorMessage>
          )}
        </label>
      </div>
      <div className="flex gap-2">
        <Button>Submit</Button>
        <label className="relative flex grow rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="w-full rounded-l-xl bg-amber-600 p-2">
            Terms and conditions
          </h3>
          <div className="grid place-content-center rounded-r-xl bg-amber-800 px-4">
            <input type="checkbox" name="tc" id="tc" className="px-4 py-2" />
          </div>
          {errors['tc'] && <ErrorMessage>{errors['tc']}</ErrorMessage>}
        </label>
      </div>
    </form>
  );
};
