import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function ActivityIndicatorBox({
  minHeight = "100vh",
}: {
  minHeight?: number | string;
}) {
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={minHeight}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
