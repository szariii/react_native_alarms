import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useEffect, useState } from "react";
import Database from "./Database";

const CheckboxButton = ({
  day,
  arraySelectedDays,
  id,
  alarmsInfo,
  setAlarmsInfo,
  setArraySelectedDays,
}) => {
  const [bgColor, setBgColor] = useState("#757575");
  useEffect(() => {
    if (arraySelectedDays.includes(day)) {
      setBgColor("#8BC34A");
    }
  }, []);

  const pressHandler = () => {
    //let alarm = alarmsInfo.filter(ele=>ele.id===id)
    let array = arraySelectedDays;
    if (arraySelectedDays.includes(day)) {
      array = array.filter((ele) => ele !== day);
    } else {
      array.push(day);
    }

    array = array.filter((ele) => ele !== "");
    setArraySelectedDays(array);
    let str = "";
    array.forEach((ele) => {
      str += `${ele},`;
    });
    if (str.length !== 0) {
      str = str.slice(0, -1);
    }

    setAlarmsInfo(
      alarmsInfo.map((ele) =>
        ele.id === id ? { ...ele, days: str } : { ...ele }
      )
    );

    Database.update(id, str);

    if (array.includes(day)) {
      setBgColor("#8BC34A");
    } else {
      setBgColor("#757575");
    }
  };

  return (
    <TouchableOpacity
      onPress={pressHandler}
      style={{
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: bgColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{day}</Text>
    </TouchableOpacity>
  );
};

export default CheckboxButton;
