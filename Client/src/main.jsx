import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";

const theme = extendTheme({
  colors: {
    dashboard: {
      dashboard_green_gradient: "#3ce2ad6e",
      dashboard_blue_gradient: "#0078aa78",
    },
    brand: {
      primary_green_dark: "#3ce2ad",
      primary_green_light: "#81efcc",
      primary_blue_dark: "#0078aa",
      primary_blue_light: "#63d5e1",
    },
    border: "#e4e6ea",
    button: {
      light_color: "#fff",
      light_backgroundColor: "#3ce2ad",
      active_light_backgroundColor: "#f2f2f2",
      hover_light_boxShadow: "0px 6px 8px 2px rgb(30 40 61 / 12%)",
      hover_light_backgroundColor: "transparent",
      hover_light_color: "#333",
      hover_light_border: "2px solid #3ce2ad",

      dark_color: "#fff",
      dark_backgroundColor: "#330582",
      active_dark_backgroundColor: "#CBD5DF",
      hover_dark_backgroundColor: "#5B369D",

      borderRadius: "20px",
      hover_transform: "translateY(-0.2rem)",

      buttonColor: "#330582",
      buttonHover: "#5F38A2",
    },
  },
  fontSize: {
    normal: "14px",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
