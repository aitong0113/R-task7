import { Outlet } from "react-router-dom";

import Header from "../components/Header";

export default function FrontendLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}