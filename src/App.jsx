import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MissionaryHomePage from "./Pages/HomePagesFolder/MissionaryHomePage/MissionaryHomePage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import AuthDonorForm from "./Pages/AuthForms/AuthDonorPages/AuthDonorForm";
import ResetPassword from "./Pages/AuthForms/ResetPassword/ResetPassword";
import AuthMissionaryForm from "./Pages/AuthForms/AuthMissionaryPage/AuthMissionaryForm";
import AuthSocialProjectForm from "./Pages/AuthForms/AuthSocialProjectPage/AuthSocialProjectForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./utils/firebase";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";


function App() {

  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user) {
        try{
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if(userDoc.exists()) {
            const userData = userDoc.data();
            setAuthUser({ ...user, role: userData.role });
          } else {
            setAuthUser(null)
            navigate("/landingPage");
          }
        } catch (error) {
          setAuthUser(null);
          navigate("/landingPage");
        }
      } else {
        setAuthUser(null);
        navigate("/landingPage");
      }
    })

    return () => unsubscribe();
  }, [setAuthUser]);

  const isMissionary = authUser && authUser.role === "missionary";

  return (
    <>
      <PageLayout authUser={authUser}>
        <Routes>
          <Route path='/' element={isMissionary ? (
            <MissionaryHomePage />
          ) : <Navigate to={'/landingPage'} />} />
          <Route path='/landingPage' element={!authUser ? <LandingPage /> : <Navigate to={"/"} />} />
          <Route path='/donorSignPage' element={<AuthDonorForm />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route
            path='/missionarySignPage'
            element={
              authUser ? (
                (isMissionary && (
                  <Navigate to={"/"} />
                  )
                )
              ) : (
                  <AuthMissionaryForm />
                )
            }
          />
          <Route path='/socialProjectSignPage' element={<AuthSocialProjectForm />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App
