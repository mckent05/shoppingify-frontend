import React from "react";
import { makeStyles } from "@mui/styles";
import { fetchItemDetails } from "../../../Store/itemspagereducer/thunkCreators";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  itemCont: {
    width: "22%",
    position: "relative",
    backgroundColor: "#fff",
    padding: 2.5,
    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    "& .MuiTypography-root": {
      width: "75%",
      overflowWrap: 'break-word',
      textTransform: "capitalize",
      fontFamily: "QuickSand, sans-serif",
      fontSize: 16,
      fontWeight: "bold",
      color: "#000000",
      textAlign: "left",
    },
    [theme.breakpoints.down("md")]: {
      width: "45%",
    },
  },
}));

const ItemName = ({ itemName, unit, changeView, control, id }) => {
  const classes = useStyles();

  const dispatch = useDispatch()

  const viewItemDetails = (id) => {
    dispatch(fetchItemDetails(id))
    changeView("itemDetails");
    control(false);
    
  }

  const useUnit = unit !== null ? unit : "";
  return (
    <Box className={classes.itemCont}>
      <Typography
        onClick={() => viewItemDetails(id)}
      >{`${itemName} ${useUnit}`}</Typography>
      <IconButton>
        {" "}
        <Add />
      </IconButton>
    </Box>
  );
};

export default ItemName;
