import {Navigate, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import MissionaryHomePage from "./Pages/HomePagesFolder/MissionaryHomePage/MissionaryHomePage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import AuthDonorForm from "./Pages/AuthForms/AuthDonorPages/AuthDonorForm";
import EmailFormResetPassword from "./Pages/AuthForms/ResetPassword/EmailFormResetPassword";
import PageLayoutSpinner from "./Layouts/PageLayoutSpinner/PageLayoutSpinner";
import AuthMissionaryForm from "./Pages/AuthForms/AuthMissionaryPage/AuthMissionaryForm";
import AuthSocialProjectForm from "./Pages/AuthForms/AuthSocialProjectPage/AuthSocialProjectForm";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, db } from "./utils/firebase";
import { useState, useEffect, useRef } from "react";
import { getDoc, doc, collection, getDocs, query, where } from "firebase/firestore";
import CustomPasswordReset from "./Pages/AuthForms/ResetPassword/CustomPasswordReset";
import AuthAdmin from "./Pages/AuthForms/AuthAdmin/AuthAdmin";
import AuthRegistrationPanel from "./Pages/AuthForms/AuthAdmin/AuthRegistrationPanel";
import AdminMissionarySignUpSucess from "./components/AuthForms/AdminForms/AdminSuccessPage";
import useAuthAdminStore from "./store/authAdminStore";
import MissionarySignUpSucess from "./components/AuthForms/MissionaryForms/MissionarySuccessPage";
import DonorHomePage from "./Pages/HomePagesFolder/DonorHomePage/DonorHomePage";
import useGetUserProfileByUsername from "./hooks/useGetUserProfileByUsername";
import EditHeader from "./components/EditPages/MissionaryEditPages/EditHeader";
import { Button, Flex, useToast, VStack } from "@chakra-ui/react";
import useAuthStore from "./store/authStore";
import ScrollToTop from "./Layouts/Scrolling/ScrollToTop";
import EditProject from "./components/EditPages/MissionaryEditPages/EditProject";
import Followers from "./components/MissionaryComponents/Followers/Followers";
import useUserProfileStore from "./store/useProfileStore";
import { signOut } from "firebase/auth";

function App() {

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const setAdmin = useAuthAdminStore((state) => state.setUser);
  const storedAdminUser = useAuthAdminStore((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [setAuthUser, authUser]);  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user && !storedAdminUser) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [storedAdminUser, setAdmin]);

  const isMissionary = authUser && authUser.role === "missionary";

  const isAdmin = storedAdminUser && storedAdminUser.role === "admin";

  const isUser = authUser && authUser.role === "user";

  if(loading) {
    return <PageLayoutSpinner />;
  }

  return (
    <>
      <ScrollToTop />
      <PageLayout loading={loading} authUser={authUser}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />

          <Route path="/adminMissionarySignUpSucess" element={ isAdmin ? <AdminMissionarySignUpSucess /> : isMissionary ? (
            <Navigate to={`/${authUser.username}`} />
          ) : isUser ? (
            <Navigate to={`/${authUser.username}`} />
          ) : <Navigate to={"/landingPage"} />} 
          />

          <Route path="/missionarySignUpSuccess" element={isMissionary ? <MissionarySignUpSucess /> : isAdmin ? (
            <Navigate to={"/adminRegistrationPanel"} />
          ) : isUser ? (
            <Navigate to={`/${authUser.username}`} />
          ) : (<Navigate to={"/landingPage"} />) } 
          />

          <Route path="/:username/EditProject" element={
            isMissionary ? <MissionaryEditProjectRoute authUser={authUser} isMissionary={isMissionary} isUser={isUser} /> : 
            isAdmin ? (
            <Navigate to={"/adminRegistrationPanel"} />
          ) : isUser ? (
            <Navigate to={`/${authUser.username}`} />
          ) : (<Navigate to={"/landingPage"} />) } 
          />

          <Route path="/:username/EditHeader" element={
            isMissionary ? <MissionaryEditHeaderRoute authUser={authUser} isMissionary={isMissionary} isUser={isUser} /> : 
            isAdmin ? (
            <Navigate to={"/adminRegistrationPanel"} />
          ) : isUser ? (
            <Navigate to={`/${authUser.username}`} />
          ) : (<Navigate to={"/landingPage"} />) } 
          />

          <Route path="/:username/Followers" element={
            isMissionary ? <MissionaryFollowersRoute authUser={authUser} isMissionary={isMissionary} isUser={isUser} /> : 
            isAdmin ? (
            <Navigate to={"/adminRegistrationPanel"} />
          ) : isUser ? (
            <Navigate to={`/${authUser.username}`} />
          ) : (<Navigate to={"/landingPage"} />) } 
          />
          
          
          <Route 
          path="/" 
          element= {isMissionary ? ( <Navigate to={`/${authUser.username}`} />) 
            : isAdmin ? (
                <Navigate to="/adminRegistrationPanel" />
              ) : isUser ? (
                <Navigate to={`/${authUser.username}`} />
              ) : (
                <Navigate to="/landingPage" />
              )} 
          />

          <Route 
            path="/:username" 
            element={isMissionary ? (
              <UserMissionaryRoute isMissionary={isMissionary} authUser={authUser} setAuthUser={setAuthUser} />
            ) : isAdmin ? (
              <Navigate to="/adminRegistrationPanel" />
            ) : isUser ? (
              <UserDonorRoute isUser={isUser} authUser={authUser} />
            ) : (
              <UserMissionaryRoute isMissionary={isMissionary} authUser={authUser} setAuthUser={setAuthUser} />
            )} 
          />

          <Route 
          path='/landingPage' 
          element={isMissionary ? (
              <Navigate to={`/${authUser.username}`} />
              ) : isAdmin ? (
              <Navigate to="/adminRegistrationPanel" />
              ) : isUser ? (
                <Navigate to={`/${authUser.username}`} />
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
            ) : isUser ? (
              <Navigate to={`/${authUser.username}`} />
            ) : <AuthDonorForm  />} 
          />
          <Route path="/resetForm" element={isMissionary ? (
              <Navigate to={`/${authUser.username}`} />
            ) : isAdmin ? (
              <Navigate to="/adminRegistrationPanel" />
            ) : isUser ? (
              <Navigate to={`/${authUser.username}`} />
            ) : <EmailFormResetPassword />
          } />

          <Route path="/resetPassword" element={<CustomPasswordReset />} />

          {/*<Route path="/resetPassword" element={isMissionary ? (
              <Navigate to={`/${authUser.username}`} />
            ) : isAdmin ? (
              <Navigate to="/adminRegistrationPanel" />
            ) : isUser ? (
              <Navigate to={`/${authUser.username}`} />
            ) : <CustomPasswordReset />

          } />*/}

          
          <Route 
          path="/adminRegistrationPanel" 
          element={isMissionary ? (
            <Navigate to={`/${authUser.username}`} />
          ) : isAdmin ? (
            <AdminRoute isAdmin={isAdmin} storedAdminUser={storedAdminUser} />
          ) : isUser ? (
            <Navigate to={`/${authUser.username}`} />
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
            ) : isUser ? (
              <Navigate to={`/${authUser.username}`}/>
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
              ) : isUser ? (
                <Navigate to={`/${authUser.username}`}/>
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

function UserMissionaryRoute({authUser, setAuthUser}) {
  const { username } = useParams();
  const toast = useToast();
  
  if(!authUser && username && username.endsWith("_missionary")) {
    return (
      <MissionaryHomePage 
      unauthenticated={true} 
      username={username}
      errorMessage={null}
      setErrorMessage={null}
      />
    );
  } else if(!authUser && username) {
    return(
      <Navigate to={"/landingPage"}/>
    );
  } else if(authUser && username && username.endsWith("_missionary")) {
    return (
      <MissionaryHomePage 
      unauthenticated={false} 
      username={username}
      errorMessage={null}
      setErrorMessage={null}
      />
    );
  } else {
    return(
      <DonorHomePage 
      username={username} 
      errorMessage={null} 
      setErrorMessage={null}
      /> 
    );
  }
}

function MissionaryEditHeaderRoute({authUser, isMissionary, isUser}) {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const navigate = useNavigate();


  if(isLoading) {
    return <PageLayoutSpinner />;
  }

  if(isMissionary && authUser.username === username) {
      return <EditHeader username={username} />;
  } else if(isMissionary && authUser.username !== username && userProfile.role === "missionary") {
    return navigate(`/${authUser.username}`);
  } else if(isMissionary && authUser.username !== username && userProfile.role === "user") {
    return navigate(`/${authUser.username}`);
  } else {
    return <Navigate to="/landingPage" />;
  }
}

function MissionaryEditProjectRoute({authUser, isMissionary, isUser}) {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);


  if(isLoading) {
    return <PageLayoutSpinner />;
  }

  if(isMissionary && authUser.username === username) {
      return <EditProject username={username} />;
  } else if(isMissionary && authUser.username !== username && userProfile.role === "missionary") {
    return navigate(`/${authUser.username}`);
  } else if(isMissionary && authUser.username !== username && userProfile.role === "user") {
    return navigate(`/${authUser.username}`);
  } else {
    return <Navigate to="/landingPage" />;
  }
}

function MissionaryFollowersRoute({authUser, isMissionary, isUser}) {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);


  if(isLoading) {
    return <PageLayoutSpinner />;
  }

  if(isMissionary && authUser.username === username) {
    return <Followers />;
  } else if(isMissionary && authUser.username !== username && userProfile.role === "missionary") {
    return navigate(`/${authUser.username}`);
  } else if(isMissionary && authUser.username !== username && userProfile.role === "user") {
    return navigate(`/${authUser.username}`);
  } else {
    return <Navigate to="/landingPage" />;
  }
}


function UserDonorRoute({ isUser, authUser }) {
  const { username } = useParams();

  if(!authUser && username && username.endsWith("_missionary")) {
    return (
      <MissionaryHomePage 
      unauthenticated={true} 
      username={username}
      errorMessage={null}
      setErrorMessage={null}
      />
    );
  } else if(!authUser && username) {
    return (
      <DonorHomePage 
      username={username} 
      errorMessage={null} 
      setErrorMessage={null} 
      />
    );
  } else if(authUser && username && username.endsWith("_missionary")) {
    return (
      <MissionaryHomePage 
        unauthenticated={false}
        username={username}
        errorMessage={null}
        setErrorMessage={null}
      />
    );
  } else if(authUser) {
    return (
      <DonorHomePage 
        username={username} 
        errorMessage={null} 
        setErrorMessage={null} 
      />
    );
  }
}

function AdminRoute({ isAdmin, storedAdminUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const checkAdminExists = async () => {
      if (storedAdminUser && storedAdminUser.role === "admin") {
        setLoading(false);
      } else {
        setErrorMessage("Acesso negado");
        navigate("/landingPage");
      }
    };

    checkAdminExists();
  }, [storedAdminUser, navigate]);

  if (loading) {
    return <PageLayoutSpinner />;
  }

  return isAdmin ? <AuthRegistrationPanel errorMessage={errorMessage} setErrorMessage={setErrorMessage} /> : <Navigate to="/landingPage" />;
}

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <VStack alignItems="center" gap={1} textAlign="center" marginTop="50px">
        <h1>Página não encontrada</h1>
        <p>A página que você procura não existe.</p>
        <Flex direction={"column"} gap={1}>
        <Button onClick={() => navigate("/")}>Voltar para página inicial</Button>
        </Flex>
    </VStack>
  );
}


export default App;
