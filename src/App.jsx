import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import useUserStore from "./lib/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase"; 

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        fetchUserInfo(user?.uid); 
    });

    return () => unsubscribe();
  }, [fetchUserInfo]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div> 
      </div>
    );
  }

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
