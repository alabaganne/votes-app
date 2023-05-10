import { Authenticated } from "./Routes.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Content />
    </AuthProvider>
  );
};

const Content = () => {
  return <RouterProvider router={Authenticated} />;
};

export default App;
