"use client"
import Login from '@/components/user/auth/Login';
import { useState } from 'react';


export default function LoginPage() {
  const [showSignup, setShowSignup] = useState(true);
  console.log(showSignup)

  return (
    <Login
      setShowSignup={setShowSignup} 
    />
  );
}