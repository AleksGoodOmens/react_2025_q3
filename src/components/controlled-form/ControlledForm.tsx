import { formSchema, type FormSchemaType } from '@/schemas/formSchema';
import { toBase64 } from '@/utils/toBase64';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useStore } from '@/hooks';

import { Button, ErrorMessage, InputWithError } from '@/components';

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
        <InputWithError
          message={errors['name']?.message}
          label="Name"
          placeholder="Name"
          id="name"
          {...register('name')}
        />
        <InputWithError
          message={errors['age']?.message}
          label="age"
          id="age"
          {...register('age')}
          type="number"
        />
      </div>
      <InputWithError
        message={errors['email']?.message}
        id="email"
        label="email"
        {...register('email')}
        placeholder="your email"
      />

      <div className="flex gap-2">
        <InputWithError
          message={errors['password']?.message}
          label="Password"
          type="password"
          placeholder="password"
          id="password"
          {...register('password')}
          textValue={watch('password')}
        />

        <InputWithError
          label="confirm password"
          message={errors['confirmPassword']?.message}
          type="password"
          placeholder="confirm password"
          id="confirmPassword"
          {...register('confirmPassword')}
          textValue={watch('password')}
        />
      </div>
      <div className="relative grid grid-cols-2 rounded-2xl border bg-amber-400 p-2 pb-10">
        <InputWithError
          label="male"
          type="radio"
          id="gender-male"
          {...register('gender')}
          value={'male'}
        />
        <InputWithError
          label="female"
          type="radio"
          id="gender-female"
          {...register('gender')}
          value={'female'}
        />
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
