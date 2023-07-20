import { FC } from 'react';
import SignUpSide from '../../components/SignUp';
import classes from './signUp.module.scss';

const { register_form__container: registerFormContainer } = classes;

const SignUp: FC = () => (
  <div className={registerFormContainer}>
    <SignUpSide />
  </div>
);

export default SignUp;
