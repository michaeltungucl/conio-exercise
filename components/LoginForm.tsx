import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import styles from '../styles/LoginForm.module.css';

export interface Details {
  email: string,
  password: string
}

interface Props {
  login: (details: Details) => void,
  error: string
}

const LoginForm: React.FC<Props> = ({ login, error }) => {
  const [details, setDetails] = useState({email: '', password: ''});
  const router = useRouter();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(details);
    router.push('/landing')
  }

  return (
    <form onSubmit={submitHandler} className={styles.container}>
      <div className={styles.form__inner}>
        <h2 className={styles.h2}>Please enter your credentials</h2>
        {(error != '') ? ( <div className={styles.error}>{error}</div> ) : ''}
        <div className={styles.form__group} >
          <label htmlFor="email">Email: </label>
          <input type="email" name='email' id='email' className={styles.input} onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
        </div>
        <div className={styles.form__group} >
          <label htmlFor="password">Password: </label>
          <input type="password" name='password' id='password' className={styles.input} onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
        </div>
        <input type="submit" value="LOGIN" className={styles.input} />
      </div>
    </form>
  )
};

export default LoginForm;
