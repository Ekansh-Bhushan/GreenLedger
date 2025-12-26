import { useState } from "react";
import UsageForm from "../components/UsageForm";

export default function AddUsage({ userId, refresh }) {
  const [success, setSuccess] = useState(false);

  const handleSuccess = async () => {
    setSuccess(true);
    await refresh();
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Add Monthly Usage</h3>
      <p style={styles.subtitle}>
        Record your household’s monthly consumption to track impact and
        identify inefficiencies.
      </p>

      <UsageForm userId={userId} onSuccess={handleSuccess} />

      {success && (
        <p style={styles.success}>Usage recorded successfully ✔</p>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  card: {
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fff",
  },
  title: {
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "14px",
  },
  success: {
    marginTop: "12px",
    color: "green",
    fontWeight: "500",
  },
};
