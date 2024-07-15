import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="pt-14 pb-20 lg:pt-8 ">
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
