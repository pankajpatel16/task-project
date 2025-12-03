import { Route, Router, Routes } from "react-router";
import ReferralPage from "./pages/ReferralPage";
import RegisteredUsers from "./pages/RegisteredUsers";

function App() {
  return (
    <Routes>
      <Route path="/referral" element={<ReferralPage />} />
      <Route path="/" element={<RegisteredUsers />} />
    </Routes>
  );
}

export default App;
