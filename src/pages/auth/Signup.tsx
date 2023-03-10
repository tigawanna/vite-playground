import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../utils/types';

interface SignupProps {
  user?: User;
}

export const Signup: React.FC<SignupProps> = () => (
  // const navigate = useNavigate()
  // React.useEffect(() => {
  //   if (user?.email) {
  //     navigate('/profile')
  //   }
  // }, [user?.email])

  // eslint-disable-next-line implicit-arrow-linebreak
  <div className="w-full h-[80%] flex flex-col items-center justify-center">
    <div
      className="w-[80%] h-fit md:w-[60%]  m-2 flex flex-col
    items-center justify-center "
    />
    <Link to="/auth" className="text-blue-500">
      Already have an account?, go to login
    </Link>
  </div>
);
