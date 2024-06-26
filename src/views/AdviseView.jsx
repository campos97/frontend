import React, { useState } from "react";
import {
  useAdvises,
  useDeleteAdvise,
  useAddAdvise,
} from "../UseSWR/useAdvises";
import { useAuth } from "../Auth/AuthProvider";

const AdviseView = () => {
  const [showAvisos, setShowAvisos] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { advises } = useAdvises();
  const { deleteAdvise } = useDeleteAdvise();
  const { createAdvise } = useAddAdvise();
  const { user } = useAuth();

  // CREAR AVISO
  const handleCreateAviso = async () => {
    createAdvise( title, content, user.id );
  };

  // BORRAR AVISO
  const handleDeleteAviso = async (adviseId) => {
    deleteAdvise(adviseId);
  };

  // MOSTRAR AVISOS
  const handleShowAvisos = () => {
    setShowAvisos(!showAvisos);
    setShowForm(false);
  };

  // MOSTRAR FORMULARIO
  const handleShowForm = () => {
    setShowForm(!showForm);
    setShowAvisos(false);
  };

  // MANEJAR CAMBIOS EN EL FORMULARIO
  const handleOnChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleOnChangeContent = (e) => {
    setContent(e.target.value);
  };

  

  return (
    <div className="wrap">
      {showForm ? (
        <div className="wrap" onClick={handleShowForm}>
          CERRAR CREAR AVISOS
        </div>
      ) : (
        <div className="wrap" onClick={handleShowForm}>
          CREAR AVISOS
        </div>
      )}
      {showForm && (
        <div className="wrap">
          <h2>Crear aviso</h2>
          <form className="advise-form">
            <input
              type="text"
              placeholder="Título"
              onChange={handleOnChangeTitle}
            />
            <textarea
              placeholder="Contenido"
              onChange={handleOnChangeContent}
            ></textarea>
            <button type="submit" onClick={handleCreateAviso}>
              Crear
            </button>
          </form>
        </div>
      )}
      {showAvisos ? (
        <div className="wrap" onClick={handleShowAvisos}>
          CERRAR AVISOS
        </div>
      ) : (
        <div className="wrap" onClick={handleShowAvisos}>
          VER AVISOS
        </div>
      )}

      {showAvisos && (
        <div className="wrap">
          <h2>Avisos importantes</h2>
          {advises.map((advise) => (
            <div key={advise.id} className="wrap">
              <h3>{advise.title}</h3>
              <p>{advise.content}</p>
              <form>
                <button
                  type="submit"
                  onClick={() => handleDeleteAviso(advise.id)}
                >
                  DELETE
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdviseView;
