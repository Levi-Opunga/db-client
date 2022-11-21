import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { allUsers } from "./api/client";
import MyAwesomeTable from "./components/MyAwesomeTableUsers";
import Link from "next/link";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  ProSidebarProvider,
} from "react-pro-sidebar";

export function Layout({ children }) {
  const { collapseSidebar } = useProSidebar();

  return (
    <main style={{ display: "flex", height: "100%" }}>
      <Sidebar>
        <Menu>
          <Link href="/homepage">
            <MenuItem>Home</MenuItem>
          </Link>
          <Link href="/addcontact">
            <MenuItem>Add Contact</MenuItem>
          </Link>
          <Link href="/users">
            <MenuItem>Users</MenuItem>
          </Link>
        </Menu>
      </Sidebar>
      <main>
        {/* <button onClick={() => collapseSidebar()}>Collapse</button> */}
        {children}
      </main>
    </main>
  );
}

export default function HomePage() {



  return (
    <ProSidebarProvider>
      <Layout>
        <MyAwesomeTable ></MyAwesomeTable>
      </Layout>
    </ProSidebarProvider>
  );
}
