export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface PropsTableProps {
  props: PropDef[];
  componentName?: string;
}

export function PropsTable({ props, componentName }: PropsTableProps) {
  if (props.length === 0) return null;

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        borderColor: "var(--border-subtle)",
        fontFamily: "var(--font-family-supreme)",
      }}
    >
      {/* Optional component name header */}
      {componentName && (
        <div
          className="flex items-center border-b"
          style={{
            padding: "var(--space-4) var(--space-6)",
            backgroundColor: "var(--preview-header-bg)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: "var(--font-weight-bold)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            {componentName} Props
          </span>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "var(--preview-header-bg)",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              {["Prop", "Type", "Default", "Description"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "var(--space-3) var(--space-5)",
                    fontSize: "11px",
                    fontWeight: "var(--font-weight-bold)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-family-supreme)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.map((prop, i) => (
              <tr
                key={prop.name}
                style={{
                  backgroundColor: i % 2 === 0 ? "var(--background)" : "var(--preview-header-bg)",
                  borderBottom:
                    i < props.length - 1 ? "1px solid var(--border-subtle)" : undefined,
                }}
              >
                {/* Name */}
                <td
                  style={{
                    padding: "var(--space-3) var(--space-5)",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "12.5px",
                    color: "var(--brand-default)",
                    fontWeight: "var(--font-weight-medium)",
                    whiteSpace: "nowrap",
                    verticalAlign: "top",
                  }}
                >
                  {prop.name}
                  {prop.required && (
                    <span
                      style={{
                        color: "var(--color-red-500, #ef4444)",
                        marginLeft: "2px",
                        fontSize: "14px",
                        lineHeight: 1,
                      }}
                      title="Required"
                    >
                      *
                    </span>
                  )}
                </td>

                {/* Type */}
                <td
                  style={{
                    padding: "var(--space-3) var(--space-5)",
                    verticalAlign: "top",
                    maxWidth: 280,
                  }}
                >
                  <code
                    style={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "11.5px",
                      color: "var(--foreground)",
                      backgroundColor: "var(--secondary)",
                      padding: "2px 6px",
                      borderRadius: "var(--radius-xs, 4px)",
                      wordBreak: "break-word",
                      lineHeight: 1.7,
                      display: "inline",
                    }}
                  >
                    {prop.type}
                  </code>
                </td>

                {/* Default */}
                <td
                  style={{
                    padding: "var(--space-3) var(--space-5)",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "12px",
                    color: "var(--muted-foreground)",
                    verticalAlign: "top",
                    whiteSpace: "nowrap",
                  }}
                >
                  {prop.default ?? "—"}
                </td>

                {/* Description */}
                <td
                  style={{
                    padding: "var(--space-3) var(--space-5)",
                    fontSize: "13px",
                    color: "var(--foreground)",
                    lineHeight: 1.5,
                    verticalAlign: "top",
                  }}
                >
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
