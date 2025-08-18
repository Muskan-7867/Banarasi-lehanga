"use client"
import Register from '@/components/user/auth/Register';
import { useState } from 'react';


export default function RegisterPage() {
  const [showSignup, setShowSignup] = useState(true);
  console.log(showSignup)

  return (
    <Register
      setShowSignup={setShowSignup} 
  
    />
  );
}