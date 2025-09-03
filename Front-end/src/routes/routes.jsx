import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Vendedores from '../components/Body/Vendedores';
import Financeiro from '../components/Body/Financeiro';
import Vendedor from '../components/Body/Vendedor';
import Login from '../components/Pages/Login';
import Registrar from '../components/Pages/Registrar';
import Menu from '../components/Headers/Menu';
import Clientes from '../components/Body/Clientes';
import Estoque from '../components/Body/Estoque';
import Header from '../components/Headers/Header';
import Home from '../components/Body/Home';
import Landing from '../components/Headers/Landing';
import VendasVendedor from '../components/Tables/VendasVendedor';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <PHome /> },
      { path: "/vendedor", element: <PVendedor /> },
      { path: "/vendedores", element: <PVendedores /> },
      { path: "/financeiro", element: <PFinanceiro /> },
      { path: "/estoque", element: <PEstoque /> },
      { path: "/clientes", element: <PClientes /> },
      { path: "/login", element: <PLogin /> },
      { path: "/registrar", element: <PCadastro /> }
    ]
  }
]);

export default router;

function PHome() {
  return (
    <>
      <Landing />
      <Home />
    </>
  );
}

function PClientes() {
  return (
    <>
      <Menu />
      <Clientes />
    </>
  );
}

function PVendedores() {
  return (
    <>
      <Menu />
      <Vendedores/>
    </>
  );
}


function PEstoque() {
  return (
    <>
      <Menu />
      <Estoque />
    </>
  );
}

function PVendedor() {
  return (
    <>
      <Header/>
      <Vendedor />
    </>
  );
}

function PLogin() {
  return (
    <>
      <Login/>
    </>
  );
}

function PCadastro() {
    return (
    <>
        <Registrar/>
    </>
    );
}

function PFinanceiro() {
    return (
    <>
        <Menu/>
        <Financeiro/>
    </>
    );
}