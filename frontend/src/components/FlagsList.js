export default function FlagsList({ flags }) {
  if (!flags.length) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>No inefficiencies detected 🎉</p>
        <p style={styles.emptySub}>
          Your recent usage is within healthy limits.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={styles.title}>Alerts</h3>

      <div style={styles.list}>
        {flags.map((f, i) => (
          <div
            key={i}
            style={{
              ...styles.card,
              borderLeft: `6px solid ${severityColor(f.severity)}`,
            }}
          >
            <div style={styles.cardHeader}>
              <span style={styles.type}>{f.type}</span>
              <span
                style={{
                  ...styles.severity,
                  backgroundColor: severityColor(f.severity),
                }}
              >
                {f.severity}
              </span>
            </div>

            <p style={styles.reason}>{f.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function severityColor(severity) {
  switch (severity) {
    case "CRITICAL":
      return "#d32f2f";
    case "HIGH":
      return "#f57c00";
    case "MEDIUM":
      return "#fbc02d";
    case "LOW":
      return "#388e3c";
    default:
      return "#999";
  }
}

/* ---------------- STYLES ---------------- */

const styles = {
  title: {
    marginBottom: "12px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    padding: "14px",
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  type: {
    fontWeight: "600",
    fontSize: "14px",
  },
  severity: {
    color: "#000",
    fontSize: "12px",
    padding: "2px 8px",
    borderRadius: "12px",
    fontWeight: "600",
  },
  reason: {
    fontSize: "14px",
    color: "#444",
    margin: 0,
  },
  empty: {
    padding: "16px",
    background: "#e8f5e9",
    borderRadius: "8px",
  },
  emptyText: {
    margin: 0,
    fontWeight: "600",
    color: "#2e7d32",
  },
  emptySub: {
    marginTop: "4px",
    fontSize: "13px",
    color: "#2e7d32",
  },
};
