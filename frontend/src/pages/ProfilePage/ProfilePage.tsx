import React from "react";
import TitlePage from "../../components/common/TitlePage/TitlePage";
import Profile from "./components/Profile";

const ProfilePage = () => {
  return (
    <div>
      <TitlePage icon="profile" title="Профиль" />
      <Profile />
    </div>
  );
};

export default ProfilePage;
