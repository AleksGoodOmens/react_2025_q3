import type { Item } from '@/interfaces';

interface Props {
  title: string;
  items?: Item[];
}
export const ListOfItems = ({ title, items }: Props) => {
  return (
    <div>
      <h2 className="text-center">{title}</h2>
      <ul className="grid gap-2 rounded-2xl border-2 px-2 py-4">
        {!items?.length && <h3 className="text-center">no items added</h3>}

        {items && (
          <>
            {items.map((item, i) => {
              const {
                age,
                confirmPassword,
                country,
                email,
                gender,
                file,
                name,
                password,
                tc,
              } = item;
              return (
                <li key={email + i} className="rounded-2xl border p-2">
                  <h4 className="text-center">name: {name}</h4>
                  <div className="grid grid-cols-3">
                    <div className="col-span-2">
                      <p>
                        Email: <a href={`email:${email}`}>{email}</a>
                      </p>
                      <p>Age:{age}</p>
                      <p>from: {country}</p>
                      <div>
                        <p>Password: {password}</p>{' '}
                        <p>Password confirm: {confirmPassword}</p>
                      </div>
                      <p>gender: {gender}</p>
                      {tc && <p>terms and conditions accepted</p>}
                    </div>
                    <div className="relative rounded-2xl border-8">
                      {file && (
                        <img
                          className="absolute h-full w-full rounded-lg object-cover"
                          src={file}
                          alt={name}
                        />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};
