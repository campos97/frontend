import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { useDepartmentById } from "../UseSWR/useDepartments";
import { useSkillsByEmployee } from "../UseSWR/useSkill";
import { useProfileByEmployeeId } from "../UseSWR/useProfiles";
import { usePositionById } from "../UseSWR/usePositions";

const EmployeeView = () => {
  const { user } = useAuth();
  const department = useDepartmentById(user.departmentId).department;
  const { position } = usePositionById(user.positionId);
  const [imageSrc, setImageSrc] = useState(null);
  const { profile } = useProfileByEmployeeId(user.id);
  const { skills, isLoading, isError } = useSkillsByEmployee(user.id);

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading skills</div>;
  return (
    <div>
      <div className="employee-card">
        {user && department && (
          <div className="card-container">
            <img className="round" src={imageSrc} alt="user" />
            <h3>
              {user.name} {user.surname1} {user.surname2}
            </h3>
            <h6>{department.name}</h6>
            <h6>{position && position.name}</h6>
            <div className="skills">
              <h6>Especializado en</h6>
              <ul>
                {skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeView;
