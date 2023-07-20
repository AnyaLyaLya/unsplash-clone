import { FC } from 'react';
import SignInSide from '../../components/SignInSide';
import './signIn.scss';

const SignIn: FC = () => (
  <div className="auth_form__container">
    <SignInSide />
  </div>
);

export default SignIn;
