import React, { useState, useEffect } from "react";
import { useProfileByEmployeeId } from "../../UseSWR/useProfiles";
import { useAuth } from "../../Auth/AuthProvider";

const UserBar = () => {
  const { token, user } = useAuth() || {};
  const { profile } = useProfileByEmployeeId(user?.id) || {};

  // obtener la imagen de perfil de profile y convertirla en base64
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (profile && profile.imagedata) {
      const base64 = btoa(
        new Uint8Array(profile.imagedata.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImageSrc(`data:${profile.imagetype};base64,${base64}`);
    }
  }, [profile]);

  

  if (!token) {
    return <div></div>;
  }

  return (
    <div className="user-bar">
      <nav>
        <img
          className="logo"
          src="https://img.freepik.com/free-vector/gradient-logo_23-2148149233.jpg?w=740&t=st=1716912920~exp=1716913520~hmac=6f0027730eb5b939a587c06d4c810f9027d4302a7bf7e87a709a43d765b1dd86"
          alt="logo"
        />
        <ul>
          <li>
            {imageSrc ? (
              <img className="profile-pic" src={imageSrc} alt="user" />
            ) : (
              <div className="loading-profile-pic">Cargando...</div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserBar;
