import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import LandingPage from "./Pages/AuthPage/LandingPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import AuthDonorForm from "./components/AuthForms/AuthDonorForm";

function App() {

  return (
    <>
      <PageLayout>
        <Routes>
          <Route path='/' element={ <HomePage />} />
          <Route path='/landingPage' element={<LandingPage />} />
          <Route path='/donorPage' element={<AuthDonorForm />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App
