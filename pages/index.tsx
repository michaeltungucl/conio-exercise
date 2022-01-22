import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { Details } from '../components/LoginForm';

const adminUser = {
  email: 'tung@hotmail.it',
  password: 'tung123456'
}

interface Props {
  login: () => void;
}

const Home: NextPage<Props> = () => {
  const [user, setUser] = useState<Details>({email: '', password: ''});
  const [error, setError] = useState<string>('');

  const login = (details: {email: string, password: string}) => {
    if(details.email === adminUser.email && details.password === adminUser.password) {
      console.log('logged in')
      setError('');
      setUser({
        email: details.email,
        password: details.password
      })
    } else {
      setError('Details do not match')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Stella LogIn</title>
      </Head>
      <LoginForm login={login} error={error} />
    </div>
  )
};

export default Home;
