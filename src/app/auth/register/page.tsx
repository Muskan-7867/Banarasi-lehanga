"use client"
import Register from '@/components/user/auth/Register';
import { useState } from 'react';


export default function RegisterPage() {
  const [showSignup, setShowSignup] = useState(true);

  return (
    <Register
      setShowSignup={setShowSignup} 
  
    />
  );
}