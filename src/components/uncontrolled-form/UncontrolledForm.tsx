import { Button } from '../button/Button';
import { ErrorMessage } from '../error-message/ErrorMessage';
import { InputWithError } from '../input-with-error/InputWithError';
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
          if (formattedErrors[key] === undefined)
            formattedErrors[key] = [err.message][0];
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
        <InputWithError
          message={errors['name']}
          label="Name"
          placeholder="Name"
          id="name"
          name="name"
        />
        <InputWithError
          message={errors['age']}
          label="age"
          id="age"
          name="age"
          type="number"
        />
      </div>
      <InputWithError
        message={errors['email']}
        id="email"
        label="email"
        name="email"
        placeholder="your email"
      />

      <div className="flex gap-2">
        <InputWithError
          message={errors['password']}
          label="Password"
          type="password"
          placeholder="password"
          id="password"
          name="password"
          textValue={value}
        />

        <InputWithError
          label="confirm password"
          message={errors['confirmPassword']}
          type="password"
          placeholder="confirm password"
          id="confirmPassword"
          name="confirmPassword"
        />
      </div>
      <div className="relative grid grid-cols-2 rounded-2xl border bg-amber-400 p-2 pb-10">
        <InputWithError
          label="male"
          type="radio"
          id="gender-male"
          name="gender"
          value={'male'}
        />
        <InputWithError
          label="female"
          type="radio"
          id="gender-female"
          name="gender"
          value={'female'}
        />

        {errors['gender'] && <ErrorMessage>{errors['gender']}</ErrorMessage>}
      </div>

      <div className="flex">
        <InputWithError
          message={errors['file']}
          label="upload file"
          type="file"
          id="file"
          name="file"
        />

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
