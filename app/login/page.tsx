import LoginWrapper from '@/app/login/LoginWrapper';
import React from 'react';

// Export generateStaticParams from the Server Component
export async function generateStaticParams() {
  // Since /login is generally a static route, we return an empty array.
  return []; 
}

// The main Page component remains a Server Component (no 'use client')
// and imports the client logic wrapper.
const LoginPage: React.FC = () => {
  return (
    <LoginWrapper />
  );
};

export default LoginPage;
