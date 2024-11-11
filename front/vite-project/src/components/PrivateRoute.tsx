import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface PrivateRouteProps {
  children: ReactNode;
  isAdmin: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAdmin,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (!isAdmin) {
        navigate("/votes");
      }
      setIsLoading(false);
    }, 1500);
  }, []);

  return <>{isLoading ? <h1>Loading...</h1> : children}</>;
};

export default PrivateRoute;
