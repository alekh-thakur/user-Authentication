import { useLocation } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  const name = location.state?.name;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h1>Welcome! {name}</h1>
    </div>
  );
};

export default Welcome;
