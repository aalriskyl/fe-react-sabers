import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingSpinnerProps {
  size?: number;
  tip?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 32,
  tip = "Loading...",
  fullScreen = false,
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;

  const spinnerStyle: React.CSSProperties = fullScreen
    ? {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
      }
    : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      };

  return (
    <div style={spinnerStyle}>
      <Spin indicator={antIcon} tip={tip} size="large" />
    </div>
  );
};

export default LoadingSpinner;
