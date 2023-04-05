import { Outlet } from "react-router-dom";
import Container from "./Container/Container";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

export default function RootLayout() {
  return (
    <div className="root-layout" style={{ minHeight: "100vh" }}>
      <Navbar />
      <Container colLg={20}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
