import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import {persistor, store}from "./store/index.ts";

import { PersistGate } from "redux-persist/integration/react";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { SocketContextProvider } from "./context/SocketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/* <StrictMode> */}
          <AuthContextProvider>
            <SocketContextProvider>
            <App />
            </SocketContextProvider>
          </AuthContextProvider>
        {/* </StrictMode> */}
      </BrowserRouter>
      </PersistGate>
  </Provider>
);
