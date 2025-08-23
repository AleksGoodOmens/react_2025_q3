import { Button } from '../button/Button';
import { formSchema } from '@/schemas/formSchema';
import clsx from 'clsx';
import { useState } from 'react';
import type { ErrorsMessageTypes } from '@/interfaces';

export const UncontrolledForm = () => {
  const [errors, setErrors] = useState<ErrorsMessageTypes>({});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      gender: formData.get('gender'),
      tc: formData.get('tc'),
      file: formData.getAll('file') as unknown as FileList,
      country: formData.get('country'),
    };

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

    console.log('Valid data:', result.data);

    if (result.data.file?.[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        console.log('File in base64:', base64);
      };
      reader.readAsDataURL(result.data.file[0]);
    }
  };
  return (
    <form className="grid gap-2 py-4" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Name</h3>
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['name'] && drawErrors(errors['name'])}
        </label>
        <label className="rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Age</h3>
          <input
            type="number"
            id="age"
            name="age"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['age'] && drawErrors(errors['age'])}
        </label>
      </div>
      <label className="w-full rounded-2xl border bg-amber-400 p-2">
        <h3 className="rounded-t-xl bg-amber-600 p-2">Email</h3>
        <input
          type="email"
          placeholder="your email"
          name="email"
          id="email"
          className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
        />
        {errors['email'] && drawErrors(errors['email'])}
      </label>
      <div className="flex gap-2">
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Password</h3>
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          <div
            className={clsx(
              'h-5',
              'bg-green-500',
              'text-black',
              'text-center',
              'rounded-2xl',
              errors['password']?.length === 1 && 'bg-yellow-200',
              errors['password']?.length === 2 && 'bg-yellow-400',
              errors['password']?.length === 3 && 'bg-yellow-600',
              errors['password']?.length === 4 && 'bg-orange-500',
              errors['password']?.length === 5 && 'bg-red-500'
            )}
          >
            {passWordStrength(errors.password?.length)}
          </div>
          {errors['password'] && drawErrors(errors['password'])}
        </label>
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Confirm</h3>
          <input
            type="password"
            placeholder="confirm password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['confirmPassword'] && drawErrors(errors['confirmPassword'])}
        </label>
      </div>
      <div className="grid grid-cols-2 rounded-2xl border bg-amber-400 p-2">
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
        {errors['gender'] && drawErrors(errors['gender'])}
      </div>

      <div className="flex">
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Upload file</h3>
          <input type="file" name="file" id="file" />
          {errors['file'] && drawErrors(errors['file'])}
        </label>
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Country</h3>
          <select
            defaultValue="choose you country"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
            name="country"
          >
            <option value="russia">russia</option>
          </select>
          {errors['country'] && drawErrors(errors['country'])}
        </label>
      </div>
      <div className="flex gap-2">
        <Button className="grow">Submit</Button>
        <label className="flex rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-l-xl bg-amber-600 p-2">
            Terms and conditions
          </h3>
          <div className="grid place-content-center rounded-r-xl bg-amber-800 px-4">
            <input type="checkbox" name="tc" id="tc" className="px-4 py-2" />
          </div>
          {errors['tc'] && drawErrors(errors['tc'])}
        </label>
      </div>
    </form>
  );
};

const drawErrors = (errors: string[]) => {
  return <p>{errors[errors.length - 1]}</p>;
};

const passWordStrength = (value: number | undefined) => {
  switch (value) {
    case 5:
      return 'bad';
    case 4:
      return 'ugly';
    case 3:
      return 'worse';
    case 2:
      return 'still bad';
    case 1:
      return 'intermediate';
    case undefined:
      return '';
    default:
      return 'superman';
  }
};
