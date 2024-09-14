import {Route, Routes} from "react-router-dom";
import MissionaryHomePage from "./Pages/HomePagesFolder/MissionaryHomePage/MissionaryHomePage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import AuthDonorForm from "./Pages/AuthForms/AuthDonorPages/AuthDonorForm";
import ResetPassword from "./Pages/AuthForms/ResetPassword/ResetPassword";
import AuthMissionaryForm from "./Pages/AuthForms/AuthMissionaryPage/AuthMissionaryForm";
import AuthSocialProjectForm from "./Pages/AuthForms/AuthSocialProjectPage/AuthSocialProjectForm";

function App() {

  return (
    <>
      <PageLayout>
        <Routes>
          <Route path='/' element={ <MissionaryHomePage />} />
          <Route path='/landingPage' element={<LandingPage />} />
          <Route path='/donorSignPage' element={<AuthDonorForm />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/missionarySignPage" element={<AuthMissionaryForm />} />
          <Route path='/socialProjectSignPage' element={<AuthSocialProjectForm />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App
