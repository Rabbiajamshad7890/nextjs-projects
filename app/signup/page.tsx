import SignupWrapper from '@/app/signup/SignupWrapper';
import React from 'react';

// This is the correct location for generateStaticParams.
// Since /signup is generally a static page, it returns an empty array.
export async function generateStaticParams() {
  return []; 
}

// The main Page component remains a Server Component (no 'use client')
// and imports the client logic wrapper.
const SignupPage: React.FC = () => {
  // You can set dynamic metadata here if needed
  return (
    <SignupWrapper />
  );
};

export default SignupPage;
