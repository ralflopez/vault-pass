import React from 'react';
import { MasterPasswordForm, PasswordDashboard } from '../components/Password';
import { usePasswordsStore } from '../store/passwords';

const Password = () => {
  const passwords = usePasswordsStore((s) => s.passwords);

  return !passwords ? <MasterPasswordForm /> : <PasswordDashboard />;
};

export default Password;
