import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';
import styles from '../Login/Login.module.css';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value
      })
    );
  };

  return (
    <div className={styles['login']}>
      <Heading>Registration</Heading>
      {registerErrorMessage && (
        <div className={styles['error']}>{registerErrorMessage}</div>
      )}
      <form className={styles['form']} onSubmit={submit}>
        <div className={styles['field']}>
          <label htmlFor='email'>Your email</label>
          <Input id='email' name='email' placeholder='Email' />
        </div>
        <div className={styles['field']}>
          <label htmlFor='password'>Your password</label>
          <Input
            id='password'
            name='password'
            type='password'
            placeholder='Password'
          />
        </div>
        <div className={styles['field']}>
          <label htmlFor='password'>Your Name</label>
          <Input id='name' name='name' type='text' placeholder='Name' />
        </div>
        <Button appearance='big'>Register</Button>
      </form>
      <div className={styles['links']}>
        <div>Do you have an account ?</div>
        <Link to='/auth/login'>Log In</Link>
      </div>
    </div>
  );
}
