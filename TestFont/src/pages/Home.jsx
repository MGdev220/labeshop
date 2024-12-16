/* eslint-disable no-unused-vars */

import {useEffect} from "react"
import Sidebar from "../components/Sidebar";
import ProductSection from "../components/ProductSection";
import { Box } from "@mui/material";

const HomePage = () => {

  // useEffect(() => {
  //   window.stop();
  //   window.location.reload();
  //   window.stop();
  // }, [])
  
  // window.stop();
  //   window.location.reload();
  //   window.stop();

  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <Sidebar />

      {/* Section principale */}
      <ProductSection />
    </Box>
  );
};

export default HomePage;
