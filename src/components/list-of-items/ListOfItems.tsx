import type { Item } from '@/interfaces';

interface Props {
  title: string;
  items?: Item[];
}
export const ListOfItems = ({ title, items }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      {items && (
        <ul>
          {items.map((item, i) => {
            const {
              age,
              confirmPassword,
              country,
              email,
              gender,

              name,
              password,
              tc,
            } = item;
            return (
              <li key={email + i}>
                <h4>name: {name}</h4>
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
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
