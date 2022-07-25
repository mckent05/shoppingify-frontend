import React from 'react'
import { Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import ItemName from "./ItemName";

const useStyles = makeStyles(() => ({
    listCont: {
        width: '100%',
        position:'relative',
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: 25,
        justifyContent: 'space-between',
    }
}))

const Item = ({ itemList, changeView, category, sidecontrol }) => {
  const classes = useStyles()
  return (
    <Box className={classes.listCont}>
        {
            itemList.map((item) => <ItemName changeView={changeView} key ={`${item.name}${category}`} itemName={item.name} unit={item.measurement_unit} control={sidecontrol} />)
        }
    </Box>
  )
}

export default Item