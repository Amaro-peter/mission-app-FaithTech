import {Navigate, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import MissionaryHomePage from "./Pages/HomePagesFolder/MissionaryHomePage/MissionaryHomePage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import AuthDonorForm from "./Pages/AuthForms/AuthDonorPages/AuthDonorForm";
import EmailFormResetPassword from "./Pages/AuthForms/ResetPassword/EmailFormResetPassword";
import PageLayoutSpinner from "./Layouts/PageLayoutSpinner/PageLayoutSpinner";
import AuthMissionaryForm from "./Pages/AuthForms/AuthMissionaryPage/AuthMissionaryForm";
import AuthSocialProjectForm from "./Pages/AuthForms/AuthSocialProjectPage/AuthSocialProjectForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./utils/firebase";
import { useState, useEffect } from "react";
import { getDoc, doc, collection, getDocs, query, where } from "firebase/firestore";
import CustomPasswordReset from "./Pages/AuthForms/ResetPassword/CustomPasswordReset";
import AuthAdmin from "./Pages/AuthForms/AuthAdmin/AuthAdmin";
import AuthRegistrationPanel from "./Pages/AuthForms/AuthAdmin/AuthRegistrationPanel";

function App() {

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user) {
        try{
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if(userDoc.exists()) {
            const userData = userDoc.data();
            setAuthUser({ ...user, username: userData.username, role: userData.role });
          } else {
            setAuthUser(null)
          }
        } catch (error) {
          setAuthUser(null)
        }
      } else {
        setAuthUser(null);
      }
      setLoading(false);
    })

    return () => unsubscribe();
  }, [setAuthUser]);

  const isMissionary = authUser && authUser.role === "missionary";

  const isAdmin = authUser && authUser.role === "admin";

  if(loading) {
    return <PageLayoutSpinner />
  }

  return (
    <>
      <PageLayout loading={loading} authUser={authUser}>
        <Routes>
          <Route 
          path="/" 
          element= {isMissionary ? ( <Navigate to={`/${authUser.username}`} />) : isAdmin ? (
                <Navigate to="/adminRegistrationPanel" />
              ) : (
                <Navigate to="/landingPage" />
              )} />

          <Route 
            path="/:username" 
            element={isMissionary ? (
              <UsernameRoute isMissionary={isMissionary} authUser={authUser} />
            ) : isAdmin ? (
              <Navigate to="/adminRegistrationPanel" />
            ) : (
              <Navigate to="/landingPage" />
            )} 
          />

          <Route 
          path='/landingPage' 
          element={isMissionary ? (
              <Navigate to={`/${authUser.username}`} />
              ) : isAdmin ? (
              <Navigate to="/adminRegistrationPanel" />
              ) : (
                <LandingPage />
              )} 
          />
          <Route 
          path='/donorSignPage' 
          element={isMissionary ? (
              <Navigate to={`/${authUser.username}`} />
            ) : isAdmin ? (
              <Navigate to="/adminRegistrationPanel" />
            ) : (
              <AuthDonorForm />
            )} 
          />
          <Route path="/resetForm" element={<EmailFormResetPassword />} />
          <Route path="/resetPassword" element={<CustomPasswordReset />} />
          <Route 
          path="/adminRegistrationPanel" 
          element={isMissionary ? (
            <Navigate to={`/${authUser.username}`} />
          ) : isAdmin ? (
            <AdminRoute isAdmin={isAdmin} authUser={authUser} />
          ) : (
            <Navigate to="/landingPage" />
          )} 
          />
          <Route
          path='/authAdmin'
          element={
            isMissionary ? (
              <Navigate to={`/${authUser.username}`} />
            ) : isAdmin ? (
              <Navigate to="/adminRegistrationPanel" />
            ) : (
              <AuthAdmin />
            )
          }
          />

          <Route
          path='/missionarySignPage'
          element={
              isMissionary ? (
                <Navigate to={`/${authUser.username}`} />
              ) : isAdmin ? (
                <Navigate to="/adminRegistrationPanel" />
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

function UsernameRoute({ isMissionary, authUser }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const checkUserExists = async () => {
      if(username) {
        try{
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("username", "==", username));
          const querySnapshot = await getDocs(q);
          if(querySnapshot.empty) {
            setErrorMessage("Usuário não encontrado");
            navigate(isMissionary ? `/${authUser.username}` : "/landingPage");
            
          } else {
            setLoading(false);
          }
        } catch (error) {
          navigate(isMissionary ? `/${authUser.username}` : "/landingPage");
        }
      } else {
        navigate(isMissionary ? `/${authUser.username}` : "/landingPage");
      }
    };

    checkUserExists();
  }, [username, isMissionary, authUser, navigate]);

  if(loading) {
    return <PageLayoutSpinner />
  }

  return isMissionary ? <MissionaryHomePage errorMessage={errorMessage} setErrorMessage={setErrorMessage} /> : <Navigate to="/landingPage" />;
}

function AdminRoute({ isAdmin, authUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const checkAdminExists = async () => {
      if (authUser.role === "admin") {
        setLoading(false);
      } else {
        setErrorMessage("Acesso negado");
        navigate("/landingPage");
      }
    };

    checkAdminExists();
  }, [authUser, navigate]);

  if (loading) {
    return <PageLayoutSpinner />;
  }

  return isAdmin ? <AuthRegistrationPanel errorMessage={errorMessage} setErrorMessage={setErrorMessage} /> : <Navigate to="/landingPage" />;
}


export default App;
