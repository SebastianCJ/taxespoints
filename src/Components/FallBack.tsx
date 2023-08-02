import { Box, Typography } from "@mui/material";

const MyFallbackComponent = (error: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "20vh",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" style={{ color: "#000" }}>
        Oops! {error.error.message}.
      </Typography>
    </Box>
  );
};

export default MyFallbackComponent;
