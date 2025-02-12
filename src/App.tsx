import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import AppContent from "./components/AppContent";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Provider>
  );
};

export default App;