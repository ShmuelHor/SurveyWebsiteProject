import "./App.css";
import Login from "./components/User/Login";
import Registration from "./components/User/Registration";
import Error from "./components/User/Error";
import VotingPage from "./components/candidates/ListCandidates/VotingPage";
import { Route, Routes } from "react-router-dom";
import Statistics from "./components/Statistics/Statistics";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import { useSelector } from "react-redux";
import { selectUser } from "./store/features/users/usersSlice";
import PrivateRouteToken from "./components/PrivateRouteToken";

function App() {
  const data = useSelector(selectUser);

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Registration ><Error/></Registration>} />
        <Route path="/" element={<Login />} />
        <Route
          path="/votes"
          element={<PrivateRouteToken children={<VotingPage />} ></PrivateRouteToken>}
        />
        <Route
          path="/statistics"
          element={
            <PrivateRouteAdmin
              isAdmin={data.user?.data?.isAdmin === true ? true : false}
              children={<Statistics />}
            ></PrivateRouteAdmin>
          }
        />
      </Routes>
      
    </div>
  );
}

export default App;
