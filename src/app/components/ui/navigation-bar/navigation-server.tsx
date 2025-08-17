import { NavLink } from 'components/ui/NavLink';

interface ILinks {
  links: { path: string; name: string }[];
}

export const NavigationServer = ({ links }: ILinks) => {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.name}
          path={link.path}
          name={link.name}
          isActive={false}
        />
      ))}
    </>
  );
};
