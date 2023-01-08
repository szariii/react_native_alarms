import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  FlatList,
  Vibration,
} from "react-native";

import { useState } from "react";

const MinutesButton = ({
  staticMinutes,
  minutes,
  setMinutes,
  selectedMinute,
  setSelectedMinute,
}) => {
  const presshandler = () => {
    Vibration.vibrate(100);

    if (selectedMinute !== staticMinutes) {
      setSelectedMinute(staticMinutes);
      setMinutes(staticMinutes);
      return;
    }

    if (staticMinutes + 4 === minutes) {
      setMinutes(staticMinutes);
      return;
    }

    setMinutes(minutes + 1);
  };

  return (
    <TouchableNativeFeedback
      onPress={presshandler}
      style={styles.feedback}
      background={TouchableNativeFeedback.Ripple("rgba(255,255,255,1)", true)}
    >
      <View style={styles.minutesButtonStyle}>
        <Text style={{ fontSize: 30 }}>{staticMinutes}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  minutesButtonStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  feedback: {
    width: 60,
    height: 60,
  },
});

export default MinutesButton;
