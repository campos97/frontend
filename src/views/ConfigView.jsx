import React, { useState, useContext } from "react";
import { useUpdateProfile } from "../UseSWR/useProfiles";
import { useUpdatePassword } from "../UseSWR/usePassword";
import { useAuth, AuthContext } from "../Auth/AuthProvider";

const ConfigView = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [preview, setPreview] = useState(null);
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [imageIsBig, setImageIsBig] = useState(false);
  const [notValidPassword, setNotValidPassword] = useState(false);
  const [notValidRepeatPassword, setNotValidRepeatPassword] = useState(false);
  const { logout } = useContext(AuthContext);
  const { updateProfile } = useUpdateProfile();
  const { updatePassword } = useUpdatePassword();

  const handleFileChange = (e) => {
    // Limitar a 20MB
    if (e.target.files[0].size > 20 * 1024 * 1024) {
      setImageIsBig(true);
      console.error("La imagen es demasiado grande.");
      return;
    }
    setImageIsBig(false);
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const changeProfilePicture = async () => {
    if (!image) {
      console.error("No se ha seleccionado ninguna imagen.");
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    formData.append("employeeId", user.id);

    updateProfile(formData);
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setNotValidRepeatPassword(true);
      console.error("Las contraseñas no coinciden");
      return;
    } else if (!validatePassword(password)) {
      setNotValidRepeatPassword(false);
      setNotValidPassword(true);
      console.error("La contraseña no cumple con los requisitos");
      return;
    } else {
      setNotValidRepeatPassword(false);
      setNotValidPassword(false);
      const passwordData = {
        password,
        employeeId: user.id,
      };
      updatePassword(passwordData);
    }
  };

  const validatePassword = (password) => {
    // La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="wrap">
      <div className="wrap">
        <h2>Cuenta</h2>
        <ul>
          <li>
            <h3>Cambiar foto de perfil</h3>
            <form>
              <input
                className="file-input"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              {preview && <img className="round" src={preview} alt="Preview" />}
              <button onClick={changeProfilePicture}>Guardar</button>
            </form>
            {imageIsBig && (
              <p className="error-message">
                La imagen es demasiado grande. El tamaño máximo es 20MB.
              </p>
            )}
          </li>
          <li>
            <h3>Cambiar contraseña</h3>
            <form>
              <input
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Nueva contraseña"
              />
              <input
                name="repeatPassword"
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
                type="password"
                placeholder="Repetir contraseña"
              />
              <button onClick={(e) => changePassword(e)}>Guardar</button>
            </form>
            {notValidPassword && (
              <p className="error-message">
                La constraseña debe tener al menos 8 caracteres, una letra
                mayúscula, una letra minúscula y un número.
              </p>
            )}
            {notValidRepeatPassword && (
              <p className="error-message">Las constraseñas no coinciden.</p>
            )}
          </li>
        </ul>
      </div>
      <div className="wrap">
        <h2>Cerrar sesión</h2>
        <ul>
          <li>
            <button onClick={() => logout()}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConfigView;
