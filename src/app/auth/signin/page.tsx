'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password
    });

    if (res?.ok) {
      window.location.href = '/admin';
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='flex flex-col gap-4 w-full h-screen justify-center items-center'>
      <h1 className='font-bold lg:text-xl text-lg'>Авторизуйтесь как администратор</h1>
      <form className='border border-black rounded-md p-5 flex flex-col gap-3' onSubmit={handleSubmit}>
        <div className='flex gap-2 w-full'>
          <label>Логин:</label>
          <input
            className='w-full'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='flex gap-2 w-full'>
          <label>Пароль:</label>
          <input
            className='w-full'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='btn' type="submit">Войти</button>
      </form>
    </div>
  );
}