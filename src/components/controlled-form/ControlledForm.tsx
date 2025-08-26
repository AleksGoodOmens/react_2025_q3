import { formSchema, type FormSchemaType } from '@/schemas/formSchema';
import { toBase64 } from '@/utils/toBase64';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useStore } from '@/hooks';

import { Button, ErrorMessage, PasswordStrength } from '@/components';

interface Props {
  closeForm: () => void;
}
export const ControlledForm = ({ closeForm }: Props) => {
  const { countries, addToControlledForm } = useStore();
  const {
    register,
    handleSubmit,
    watch,
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
        <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Name</h3>
          <input
            {...register('name')}
            type="text"
            placeholder="Name"
            id="name"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['name'] && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </label>
        <label className="relative rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Age</h3>
          <input
            type="text"
            id="age"
            {...register('age')}
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          {errors['age'] && <ErrorMessage>{errors.age.message}</ErrorMessage>}
        </label>
      </div>
      <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
        <h3 className="rounded-t-xl bg-amber-600 p-2">Email</h3>
        <input
          type="email"
          placeholder="your email"
          {...register('email')}
          id="email"
          className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
        />
        {errors['email'] && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </label>
      <div className="flex gap-2">
        <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Password</h3>
          <input
            type="password"
            placeholder="password"
            id="password"
            {...register('password')}
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          <PasswordStrength text={watch('password')} />
          {errors['password'] && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </label>
        <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Confirm</h3>
          <input
            type="password"
            placeholder="confirm password"
            id="confirmPassword"
            {...register('confirmPassword')}
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
          <PasswordStrength text={watch('confirmPassword')} />

          {errors['confirmPassword'] && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </label>
      </div>
      <div className="relative grid grid-cols-2 rounded-2xl border bg-amber-400 p-2 pb-10">
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
        {errors['gender'] && (
          <ErrorMessage>{errors.gender.message}</ErrorMessage>
        )}
      </div>

      <div className="flex">
        <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Upload file</h3>
          <input type="file" {...register('file')} id="file" />
          {errors['file'] && <ErrorMessage>{errors.file.message}</ErrorMessage>}
        </label>
        <label className="relative w-full rounded-2xl border bg-amber-400 p-2 pb-10">
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
          {errors['country'] && (
            <ErrorMessage>{errors.country.message}</ErrorMessage>
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
            <input
              type="checkbox"
              {...register('tc')}
              id="tc"
              className="px-4 py-2"
            />
          </div>
          {errors['tc'] && <ErrorMessage>{errors.tc.message}</ErrorMessage>}
        </label>
      </div>
    </form>
  );
};
