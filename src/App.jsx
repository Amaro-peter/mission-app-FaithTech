import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import AuthDonorForm from "./Pages/AuthForms/AuthDonorPages/AuthDonorForm";
import ResetPassword from "./Pages/AuthForms/ResetPassword/ResetPassword";
import AuthMissionaryForm from "./Pages/AuthForms/AuthMissionaryPage/AuthMissionaryForm";

function App() {

  return (
    <>
      <PageLayout>
        <Routes>
          <Route path='/' element={ <HomePage />} />
          <Route path='/landingPage' element={<LandingPage />} />
          <Route path='/donorSignPage' element={<AuthDonorForm />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/missionarySignPage" element={<AuthMissionaryForm />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App
