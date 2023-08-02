import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import PointsLogo from "../Points_PG_Dark.png";

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={PointsLogo}
        alt="Points Logo"
      />
    </Card>
  );
}
