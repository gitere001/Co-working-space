// import { Provider,  } from "react-redux";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import App from "./App";

const RootComponent = () => {
  return (
    <>
      <Navbar />
      <App />
      <Footer />
    </>
  );
};

const Root = () => {
  return <RootComponent />;
};

export default Root;
