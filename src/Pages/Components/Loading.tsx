import React, { useEffect } from "react";
import { Spinner } from "reactstrap";

interface IProps {
  isLoading: boolean;
  children: React.ReactNode;
}

function Loading({ children, isLoading }: IProps) {
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default Loading;
