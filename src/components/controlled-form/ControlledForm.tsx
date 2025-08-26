import { Button } from '../button/Button';
import { formSchema, type FormSchemaType } from '@/schemas/formSchema';
import { toBase64 } from '@/utils/toBase64';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useStore } from '@/hooks';

interface Props {
  closeForm: () => void;
}
export const ControlledForm = ({ closeForm }: Props) => {
  const { countries, addToControlledForm } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: undefined,
      country: '',
      tc: false,
      file: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const base64 = (await toBase64(data.file[0])) as string;
    addToControlledForm({
      ...data,
      file: base64,
      tc: data.tc ? 'on' : null,
    });
    reset();
    closeForm();
  };

  return (
    <form className="grid gap-2 py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Name</h3>
          <input
            {...register('name')}
            type="text"
            placeholder="Name"
            id="name"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['name'] && <p>{errors.name.message}</p>}
        </label>
        <label className="rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Age</h3>
          <input
            type="text"
            id="age"
            {...register('age')}
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['age'] && <p>{errors.age.message}</p>}
        </label>
      </div>
      <label className="w-full rounded-2xl border bg-amber-400 p-2">
        <h3 className="rounded-t-xl bg-amber-600 p-2">Email</h3>
        <input
          type="email"
          placeholder="your email"
          {...register('email')}
          id="email"
          className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
        />
        {errors['email'] && <p>{errors.email.message}</p>}
      </label>
      <div className="flex gap-2">
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Password</h3>
          <input
            type="password"
            placeholder="password"
            id="password"
            {...register('password')}
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          <div
            className={clsx(
              'h-5',
              'bg-green-500',
              'text-black',
              'text-center',
              'rounded-2xl'
            )}
          >
            {passWordStrength(errors.password?.message?.length)}
          </div>
          {errors['password'] && <p>{errors.password.message}</p>}
        </label>
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Confirm</h3>
          <input
            type="password"
            placeholder="confirm password"
            id="confirmPassword"
            {...register('confirmPassword')}
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['confirmPassword'] && <p>{errors.confirmPassword.message}</p>}
        </label>
      </div>
      <div className="grid grid-cols-2 rounded-2xl border bg-amber-400 p-2">
        <label className="flex justify-center gap-2">
          <h3>Male</h3>
          <input
            type="radio"
            id="gender-male"
            {...register('gender')}
            value={'male'}
            className="rounded-b-xl bg-amber-800 px-4 py-2"
          />
        </label>
        <label className="flex justify-center gap-2">
          <h3>Female</h3>
          <input
            type="radio"
            id="gender-female"
            {...register('gender')}
            value={'female'}
            className="rounded-b-xl bg-amber-800 px-4 py-2"
          />
        </label>
        {errors['gender'] && <p>{errors.gender.message}</p>}
      </div>

      <div className="flex">
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Upload file</h3>
          <input type="file" {...register('file')} id="file" />
          {errors['file'] && <p>{errors.file.message}</p>}
        </label>
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Country</h3>
          <select
            defaultValue="choose you country"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
            {...register('country')}
          >
            {countries.map((country) => {
              return (
                <option key={country} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
          {errors['country'] && <p>{errors.country.message}</p>}
        </label>
      </div>
      <div className="flex gap-2">
        <Button className="grow">Submit</Button>
        <label className="flex rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-l-xl bg-amber-600 p-2">
            Terms and conditions
          </h3>
          <div className="grid place-content-center rounded-r-xl bg-amber-800 px-4">
            <input
              type="checkbox"
              {...register('tc')}
              id="tc"
              className="px-4 py-2"
            />
          </div>
          {errors['tc'] && <p>{errors.tc.message}</p>}
        </label>
      </div>
    </form>
  );
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
