import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";
const CistomedCircularProgress = styled(CircularProgress)`
  color: #06b9ff;
`;
export const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
    }}
  >
    <CistomedCircularProgress />
  </div>
);
