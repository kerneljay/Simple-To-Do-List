import { useState, useEffect } from "react";
import "./Notify.css";

export function Notify({ title, message }: any) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (!visible) return null;

  return (
    <div className="notify-container">
      <div className="notify-item">
        <h1>{title}</h1>
        <h1>{message}</h1>
      </div>
    </div>
  );
}
