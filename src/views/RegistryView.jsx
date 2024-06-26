import React from "react";
import { useAddRecord, useLastRecord } from "../UseSWR/useRecords";
import { useAuth } from "../Auth/AuthProvider";

const RegistryView = () => {
  const { user } = useAuth();
  const { createRecord } = useAddRecord();
  const { lastRecord, isLoading, isError } = useLastRecord(user.id);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading last record</div>;

  const handleRegistry = () => {
    createRecord(user.id);
  };

  return (
    <div className="wrap">
      <form>
        <h1>Fichaje</h1>
        <button className="registry-btn" type="submit" onClick={handleRegistry}>
          Registrar
        </button>
        <h2>Último registro:</h2>
        <h2>{lastRecord?.createdAt}</h2>
      </form>
    </div>
  );
};

export default RegistryView;
