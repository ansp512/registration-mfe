import React from "react";
import "./App.css";
import EventsReg from "./registration-page";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <EventsReg />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
