import React, { useState } from "react";
import s from "./styles.module.css";

import { Card } from "../Card";

export const Cards = ({cards, handleUpdateNewPhone, toggle, handleDeletePhone, info, changeInfo}) => {
  
  return (
    <div className={s.cards}>
      {cards?.map( (dataItem, index) => {
        return (<Card key={`${index}`} {...dataItem} handleUpdateNewPhone={handleUpdateNewPhone} toggle={toggle} handleDeletePhone={handleDeletePhone} cards={cards} info={info} changeInfo={changeInfo}/>)
      })}
    </div>
  );
};
