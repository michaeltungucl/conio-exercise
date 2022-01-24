import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { Details } from '../components/LoginForm';
import Router, { useRouter } from 'next/router';

interface Props {
  login: () => void;
}

const Home: NextPage<Props> = () => {
  const [user, setUser] = useState<Details>({email: '', password: ''});
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('email', 'tung@hotmail.it');
    localStorage.setItem('password', 'tung123456');
  }, [])

  const login = (details: {email: string, password: string}) => {
    if(details.email === localStorage.getItem('email') && details.password === localStorage.getItem('password')) {
      setError('');
      setUser({
        email: details.email,
        password: details.password
      })
      router.push('/landing');
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
