import { Button } from '../button/Button';

export const UncontrolledForm = () => {
  return (
    <form className="grid gap-2 py-4">
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
        </label>
        <label className="rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">age</h3>
          <input
            type="number"
            id="age"
            name="age"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          />
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
        </label>
      </div>
      <div className="grid grid-cols-2 rounded-2xl border bg-amber-400 p-2">
        <label className="flex justify-center gap-2">
          <h3>Male</h3>
          <input
            type="radio"
            id="gender"
            name="gender"
            value={'male'}
            className="rounded-b-xl bg-amber-800 px-4 py-2"
          />
        </label>
        <label className="flex justify-center gap-2">
          <h3>Female</h3>
          <input
            type="radio"
            id="gender"
            name="gender"
            value={'female'}
            className="rounded-b-xl bg-amber-800 px-4 py-2"
          />
        </label>
      </div>

      <div className="flex">
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Upload file</h3>
          <input type="file" name="file" id="file" />
        </label>
        <label className="w-full rounded-2xl border bg-amber-400 p-2">
          <h3 className="rounded-t-xl bg-amber-600 p-2">Country</h3>
          <select
            defaultValue="choose you country"
            className="w-full rounded-b-xl bg-amber-800 px-4 py-2"
          >
            <option value="russia">russia</option>
          </select>
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
        </label>
      </div>
    </form>
  );
};
