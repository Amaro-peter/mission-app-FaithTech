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
import { Button, Flex, VStack } from "@chakra-ui/react";
import useAuthStore from "./store/authStore";
import ScrollToTop from "./Layouts/Scrolling/ScrollToTop";
import EditProject from "./components/EditPages/MissionaryEditPages/EditProject";
import Followers from "./components/MissionaryComponents/Followers/Followers";


function App() {

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const storedAdminUser = useAuthAdminStore((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        setAuthUser(null);
        setLoading(false);
        return;
      }

      if (storedAdminUser?.role === "admin") {
        setAuthUser({ ...storedAdminUser });
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAuthUser(userData);
        } else {
          setAuthUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [storedAdminUser]);

  const isMissionary = authUser && authUser.role === "missionary";

  const isAdmin = authUser && authUser.role === "admin";

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
            <AdminRoute isAdmin={isAdmin} authUser={authUser} />
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

function UserMissionaryRoute({ isMissionary, authUser, setAuthUser}) {
  const { username } = useParams();
  const {isLoading, userProfile} = useGetUserProfileByUsername(username);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    if(!isLoading && userProfile === null) {
      setErrorMessage("Usuário não encontrado");
      navigate(isMissionary ? `/${authUser.username}` : "/landingPage");
    }
  }, [isLoading, userProfile, navigate, isMissionary, authUser]);

  if(isLoading) {
    return <PageLayoutSpinner />;
  }

  if(!authUser && userProfile.role === "missionary") {
    return (
      <MissionaryHomePage 
        unauthenticated={true}
        username={username}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    );
  } else if(!authUser && userProfile.role === "user") {
    return <Navigate to={"/landingPage"} />;
  } else if(!authUser && !userProfile) {
    return <Navigate to={"/landingPage"} />;
  }

  if(isMissionary && authUser.username === username) {
    return <MissionaryHomePage username={username} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />;
  } else if(isMissionary && authUser.username !== username && userProfile.role === "missionary") {
    return <MissionaryHomePage username={username} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />;
  } else if(isMissionary && authUser.username !== username && userProfile.role === "user") {
    return <DonorHomePage username={username} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />;
  } else {
    return <Navigate to="/landingPage" />;
  }
}

function MissionaryEditHeaderRoute({authUser, isMissionary, isUser}) {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      if (isMissionary && authUser.username === username) {
        // Do nothing, let the component render EditHeader
      } else if (isMissionary && authUser.username !== username) {
        setErrorMessage("Acesso negado");
      } else if (isUser && authUser.username !== username && userProfile?.role === "user") {
        setErrorMessage("Acesso negado");
      } else {
        navigate("/landingPage");
      }
    }
  }, [isLoading, isMissionary, isUser, authUser, username, userProfile, setErrorMessage, navigate]);


  if(isLoading) {
    return <PageLayoutSpinner />
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

  useEffect(() => {
    if (!isLoading) {
      if (isMissionary && authUser.username === username) {
        // Do nothing, let the component render EditHeader
      } else if (isMissionary && authUser.username !== username) {
        setErrorMessage("Acesso negado");
      } else if (isUser && authUser.username !== username && userProfile?.role === "user") {
        setErrorMessage("Acesso negado");
      } else {
        navigate("/landingPage");
      }
    }
  }, [isLoading, isMissionary, isUser, authUser, username, userProfile, setErrorMessage, navigate]);


  if(isLoading) {
    return <PageLayoutSpinner />
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

  useEffect(() => {
    if (!isLoading) {
      if (isMissionary && authUser.username === username) {

      } else if (isMissionary && authUser.username !== username) {
        setErrorMessage("Acesso negado");
      } else if (isUser && authUser.username !== username && userProfile?.role === "user") {
        setErrorMessage("Acesso negado");
      } else {
        navigate("/landingPage");
      }
    }
  }, [isLoading, isMissionary, isUser, authUser, username, userProfile, setErrorMessage, navigate]);


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
  const {isLoading, userProfile} = useGetUserProfileByUsername(username);
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
            navigate(isUser ? `/${authUser.username}` : "/landingPage");
            
          } else {
            setLoading(false);
          }
        } catch (error) {
          navigate(isUser ? `/${authUser.username}` : "/landingPage");
        }
      } else {
        navigate(isUser ? `/${authUser.username}` : "/landingPage");
      }
    };

    checkUserExists();
  }, [username, isUser, authUser, navigate]);

  if(loading) {
    return <PageLayoutSpinner />
  }

  if(isUser && authUser.username === username) {
    return <DonorHomePage username={username} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />;
  } else if(isUser && authUser.username !== username && userProfile.role === "missionary") {
    return <MissionaryHomePage username={username} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />;
  } else if(isUser && authUser.username !== username && userProfile.role === "user") {
    return <DonorHomePage username={username} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />;
  } else {
    return <Navigate to="/landingPage" />;
  }
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
