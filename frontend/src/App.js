import React from "react";
import User from "./component/User/User";
import store from "./redux/store/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <User />
      </div>
    </Provider>
  );
};

export default App;
