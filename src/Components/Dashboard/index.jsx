import { useAuth } from "../../utils/AuthProvider";
export const Dashboard = () => {
  const { token } = useAuth();
  return (
    <section>
      <h2>Dashboard (Protected)</h2>
      <div>Authenticated as {token}</div>
    </section>
  );
};
