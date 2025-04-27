// import { Provider,  } from "react-redux";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import Overlay from "./components/Overlay";

const RootComponent = () => {
  return (
    <Provider store={store}>
      <Overlay />
      <Navbar />
      <App />
      <Footer />
    </Provider>
  );
};

const Root = () => {
  return <RootComponent />;
};

export default Root;
