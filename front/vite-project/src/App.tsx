import "./App.css";
import Login from "./components/User/Login";
import Registration from "./components/User/Registration";
import Error from "./components/User/Error";
import VotingPage from "./components/candidates/ListCandidates/VotingPage";
import { Route, Routes } from "react-router-dom";
import Statistics from "./components/Statistics/Statistics";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import { selectUser } from "./store/features/users/usersSlice";

function App() {
    const data = useSelector(selectUser);

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Login />} />
        <Route path="/votes" element={<VotingPage />} />
        <Route
          path="/statistics"
          element={
            <PrivateRoute
              isAdmin={data.user?.data?.isAdmin === true ? true : false}
              children={<Statistics />}
            ></PrivateRoute>
          }
        />
      </Routes>
      <Error />
    </div>
  );
}

export default App;
