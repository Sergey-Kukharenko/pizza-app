import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import styles from './Login.module.css';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles['login']}>
      <Heading>Log In</Heading>
      {loginErrorMessage && (
        <div className={styles['error']}>{loginErrorMessage}</div>
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
        <Button appearance='big'>Log In</Button>
      </form>
      <div className={styles['links']}>
        <div>Don't have an account ?</div>
        <Link to='/auth/register'>Register ?</Link>
      </div>
    </div>
  );
}
