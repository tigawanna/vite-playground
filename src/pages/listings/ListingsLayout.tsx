import { Outlet } from 'react-router-dom';

interface ListingsProps {}

export const ListingsLayout = ({}: ListingsProps) => {
  return (
    <>
      <Outlet />
    </>
  );
};
