import React, { useState } from "react";
import {
  useRequestsByEmployeeId,
  useAddRequest,
  useDeleteRequest,
} from "../UseSWR/useRequests";
import { useAuth } from "../Auth/AuthProvider";

const RequestView = () => {
  const { user } = useAuth();
  const [showRequests, setShowRequests] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { requests } = useRequestsByEmployeeId(user.id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { createRequest } = useAddRequest();
  const { deleteRequest } = useDeleteRequest();

  // MOSTRAR AVISOS
  const handleShowRequests = () => {
    setShowRequests(!showRequests);
    setShowForm(false);
  };

  // MOSTRAR FORMULARIO
  const handleShowForm = () => {
    setShowForm(!showForm);
    setShowRequests(false);
  };

  // MANEJAR CAMBIOS EN EL FORMULARIO
  const handleOnChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleOnChangeContent = (e) => {
    setContent(e.target.value);
  };

  // CREAR AVISO
  const handleCreateRequest = async () => {
    const formData = {
      title: title,
      content: content,
      sender: user.id,
    };
    createRequest(formData);
  };

  // BORRAR AVISO
  const handleDeleteRequest = async (requestId) => {
    deleteRequest(requestId);
  };

  return (
    <div className="wrap">
      {showForm ? (
        <div className="wrap" onClick={handleShowForm}>
          CERRAR CREAR SOLICITUD
        </div>
      ) : (
        <div className="wrap" onClick={handleShowForm}>
          CREAR SOLICITUD
        </div>
      )}
      {showForm && (
        <form className="request-form">
          <label htmlFor="title">Motivo de la solicitud</label>
          <input type="text" name="title" onChange={handleOnChangeTitle} />
          <label htmlFor="content">Comentarios</label>
          <textarea
            name="content"
            onChange={handleOnChangeContent}
            cols="30"
            rows="10"
          ></textarea>
          <button onClick={handleCreateRequest}>Enviar</button>
        </form>
      )}
      {showRequests ? (
        <div className="wrap" onClick={handleShowRequests}>
          CERRAR SOLICITUDES
        </div>
      ) : (
        <div className="wrap" onClick={handleShowRequests}>
          VER SOLICITUDES
        </div>
      )}
      {showRequests && (
        <div className="wrap">
          <h2>TUS SOLICITUDES</h2>
          {requests && requests.length === 0 && <p>No hay solicitudes</p>}
          {requests.map((request) => (
            <div key={request.id} className="wrap">
              <h3>MOTIVO: {request.title}</h3>
                  <p>SOLICITADO: {request.content}</p>
                <p>Estado: {request.status}</p>
              <form>
                <button
                  type="submit"
                  onClick={() => handleDeleteRequest(request.id)}
                >
                  BORRAR
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestView;
