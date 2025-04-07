import React from "react";
import IconWithName from "./IconWithName/IconWithName";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ProfileForm from "./ProfileForm/ProfileForm";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { email, name } = user || { email: "", name: "" };
  return (
    <div>
      <IconWithName name={name} email={email} />
      <ProfileForm />
    </div>
  );
};

export default Profile;
