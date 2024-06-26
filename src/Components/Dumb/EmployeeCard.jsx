import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEmployeeById } from "../../UseSWR/useEmployees";
import { useDepartmentById } from "../../UseSWR/useDepartments";
import {
  useSkillsByEmployee,
  useSkills,
  useAddSkillToEmployee,
} from "../../UseSWR/useSkill";
import { useProfileByEmployeeId } from "../../UseSWR/useProfiles";
import HourGrid from "../Smart/HourGrid";
import {
  useRequestsByEmployeeId,
  useUpdateRequest,
} from "../../UseSWR/useRequests";
import { usePositionById } from "../../UseSWR/usePositions";

const EmployeeCard = (props) => {
  const { employeeId } = useParams() || props.employeeId;
  const { departmentId } = useParams();
  const employee = useEmployeeById(employeeId).employee;
  const department = useDepartmentById(departmentId).department;
  const [showHourGrid, setShowHourGrid] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const { profile } = useProfileByEmployeeId(employeeId);
  const {
    skills: employeeSkills,
    isLoading,
    isError,
  } = useSkillsByEmployee(employeeId);
  const { skills } = useSkills();
  const { requests } = useRequestsByEmployeeId(employeeId);
  const { updateRequest } = useUpdateRequest();
  const { position } = usePositionById(employee?.positionId) || {};
  const [showAddSkill, setShowAddSkill] = useState(false);
  const { addSkillToEmployee } = useAddSkillToEmployee();
  const [skillId, setSkillId] = useState(null);

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

  const handleSkillChange = (e) => {
    setSkillId(e.target.value);
  };

  const switchHourGrid = () => {
    if (showHourGrid === false) {
      setShowHourGrid(true);
    } else {
      setShowHourGrid(false);
    }
  };

  const switchRequests = () => {
      setShowRequests(!showRequests);
    
  };

  const handleUpdateRequest = (requestId, status) => {
    const formData = {
      id: requestId,
      status: status,
    };
    return async () => {
      try {
        await updateRequest(formData);
      } catch (error) {
        console.error("Error updating request:", error);
      }
    };
  };

  const closeCard = () => {
    window.history.back();
  };

  const swithShowAddSkill = () => {
    setShowAddSkill(!showAddSkill);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const data = {
      employeeId: employeeId,
      skillId: skillId,
    };
    addSkillToEmployee(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading skills</div>;

  return (
    <div>
      <div className="employee-card">
        {employee && department && (
          <div className="card-container">
            <span className="close">
              <button className="close-button" onClick={closeCard}>
                Close
              </button>
            </span>
            <span className="delete">
              <button className="close-button" onClick={swithShowAddSkill}>
                Añadir
              </button>
            </span>

            <img className="round" src={imageSrc} alt="user" />
            <h3>
              {employee.name} {employee.surname1} {employee.surname2}
            </h3>
            <h6>{department.name}</h6>
            <h6>{position?.name}</h6>
            <div className="buttons">
              <button className="primary" onClick={switchRequests}>
                Solicitudes
              </button>
              <button className="primary ghost" onClick={switchHourGrid}>
                Horario
              </button>
            </div>
            <div className="skills">
              <h6>Especializado en</h6>
              <ul>
                {employeeSkills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      {showAddSkill && (
        <div className="wrap">
          <form>
            <select name="skills" onChange={(e) => handleSkillChange(e)}>
              <option value="">Selecciona una especialidad</option>
              {skills?.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
            <button onClick={(e) => handleAddSkill(e)}>Confirmar</button>
          </form>
        </div>
      )}
      {showHourGrid && (<div className="wrap"><HourGrid employee={employee} /></div>)}
      {showRequests && (
        <div className="wrap">
          {requests.length === 0 && (
            <h3>NO HAY SOLICITUDES DE {employee.name}</h3>
          )}
          {requests.map((request) => (
            <div key={request.id} className="wrap">
              <h3>MOTIVO: {request.title}</h3>
              <p>SOLICITADO: {request.content}</p>
              <p>Estado: {request.status}</p>

              {request.status === "PENDIENTE" && (
                <form>
                  <button onClick={handleUpdateRequest(request.id, "APROBADO")}>
                    APROBAR
                  </button>
                  <button
                    onClick={handleUpdateRequest(request.id, "RECHAZADO")}
                  >
                    RECHAZAR
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
