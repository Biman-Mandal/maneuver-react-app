import React from "react";
import { Provider } from "react-redux"; // Import Provider from react-redux
import { BrowserRouter } from "react-router-dom";
import store from "./services/redux/Store";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./utils/AuthContext"; // Import AuthProvider

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}
