import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Vibration,
} from "react-native";

import { useState } from "react";

import HoursButton from "./HoursButton";
import SmallHoursButton from "./SmallHours";

const Hours = ({ hours, setHours }) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const heightAfterCut = height / 5;

  const r = 140;

  const array = [];
  for (let i = 1; i < 13; i++) {
    array.push(i);
  }

  const arrayLeft = [];
  for (let i = 0; i < 12; i++) {
    arrayLeft.push(
      r * Math.cos(((i + 1) / 12) * 2 * Math.PI - (6 / 12) * Math.PI) -
        30 +
        width / 2
    );
  }

  const arrayTop = [];
  for (let i = 0; i < 12; i++) {
    arrayTop.push(
      r * Math.sin(((i + 1) / 12) * 2 * Math.PI - (6 / 12) * Math.PI) -
        60 +
        (height / 2 + 50 - heightAfterCut)
    );
  }

  const smallArray = [0];
  for (let i = 13; i < 24; i++) {
    smallArray.push(i);
  }

  const smallR = 80;

  const smallArrayLeft = [];
  for (let i = 0; i < 12; i++) {
    smallArrayLeft.push(
      smallR * Math.cos(((i + 1) / 12) * 2 * Math.PI - (8 / 12) * Math.PI) -
        20 +
        width / 2
    );
  }

  const smallArrayTop = [];
  for (let i = 0; i < 12; i++) {
    smallArrayTop.push(
      smallR * Math.sin(((i + 1) / 12) * 2 * Math.PI - (8 / 12) * Math.PI) -
        50 +
        (height / 2 + 50 - heightAfterCut)
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {array.map((ele, index) => (
        <View
          key={index}
          style={{
            position: "absolute",
            left: arrayLeft[index],
            top: arrayTop[index],
          }}
        >
          <HoursButton staticHour={ele} hours={hours} setHours={setHours} />
        </View>
      ))}

      {smallArray.map((ele, index) => (
        <View
          key={index}
          style={{
            position: "absolute",
            left: smallArrayLeft[index],
            top: smallArrayTop[index],
          }}
        >
          <SmallHoursButton
            staticHour={ele}
            hours={hours}
            setHours={setHours}
          />
        </View>
      ))}
    </View>
  );
};

export default Hours;
