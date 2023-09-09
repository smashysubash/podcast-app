import React, { useEffect } from "react";
import { authService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layout";

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <DefaultLayout>
        <div>Dashboard</div>
      </DefaultLayout>
    </>
  );
};
