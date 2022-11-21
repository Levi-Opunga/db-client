import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { allUsers } from './api/client'
import MyAwesomeTable from './components/MyAwesomeTable'
import { Sidebar, Menu, MenuItem, useProSidebar,ProSidebarProvider } from "react-pro-sidebar";
import HomePage from './homepage'
import { BrowserRouter, Route, Routes, useNavigate,Switch } from "react-router-dom";
import  SignIn  from './login'





export default function Home() {
  return (
    <div>
      <SignIn/>
    </div>
  );
}

