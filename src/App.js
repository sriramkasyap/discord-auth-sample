import { createContext, useState } from "react";
import "./App.css";

const context = createContext();

function App({ children }) {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <context.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </context.Provider>
    </div>
  );
}

export { context };
export default App;
