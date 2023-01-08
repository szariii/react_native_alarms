import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Vibration,
} from "react-native";

import { useState } from "react";

import MinutesButton from "./MinutesButton";

const Minutes = ({ minutes, setMinutes }) => {
  const [selectedMinute, setSelectedMinute] = useState("");

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const heightAfterCut = height / 5;

  const r = 135;

  const array = [];
  for (let i = 0; i < 60; i = i + 5) {
    array.push(i);
  }

  const arrayLeft = [];
  for (let i = 0; i < 12; i++) {
    arrayLeft.push(
      r * Math.cos(((i + 1) / 12) * 2 * Math.PI - (8 / 12) * Math.PI) -
        30 +
        width / 2
    );
  }

  const arrayTop = [];
  for (let i = 0; i < 12; i++) {
    arrayTop.push(
      r * Math.sin(((i + 1) / 12) * 2 * Math.PI - (8 / 12) * Math.PI) -
        60 +
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
          <MinutesButton
            staticMinutes={ele}
            minutes={minutes}
            setMinutes={setMinutes}
            selectedMinute={selectedMinute}
            setSelectedMinute={setSelectedMinute}
          />
        </View>
      ))}
    </View>
  );
};

export default Minutes;
