import React from 'react';
import Header from '../components/Header';
import Login from '../components/Login';

export default function LoginPage() {
  return (
    <>
      <Header
        heading="Fila de Espera"
        paragraph="Não tem cadastro? "
        linkName="Cadastrar"
        linkUrl="/signup"
      />
      <Login />
      <div className="absolute bottom-0 text-gray-300 left-0 ml-8 w-full flex justify-center">
        <div>{`versão: 0.1.1-beta.21`}</div>
      </div>
    </>
  );
}
