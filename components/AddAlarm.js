import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  FlatList,
  Dimensions,
} from "react-native";
import { useState } from "react";

import CircleButton from "./CircleButton";
import Hours from "./Hours";
import Minutes from "./Minutes";

import Database from "./Database";

const AddAlarm = ({ route, navigation }) => {
  const { alarmsInfo, setAlarmsInfo } = route.params;
  const [selectHours, setSelectHours] = useState(true);
  const [minutes, setMinutes] = useState("0");
  const [hours, setHours] = useState("0");
  const width = Dimensions.get("window").width;
  const addAlarmHandler = (time) => {
    let lastIndex = 0;
    alarmsInfo.forEach((ele) => {
      if (lastIndex < ele.id) {
        lastIndex = ele.id;
      }
    });
    let newIndex = lastIndex + 1;
    Database.add(newIndex, time, "", "false", "false");
    setAlarmsInfo([
      ...alarmsInfo,
      {
        id: newIndex,
        days: "",
        time: time,
        vibrations: "false",
        music: "false",
      },
    ]);
    navigation.navigate("alarmList");
  };

  const clickTimeHandler = (value) => {
    setSelectHours(value);
  };

  return (
    <View
      style={{
        backgroundColor: "#3F51B5",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View style={styles.textView}>
        <TouchableNativeFeedback onPress={() => clickTimeHandler(true)}>
          {selectHours ? (
            <Text style={styles.selectedText}>{hours}</Text>
          ) : (
            <Text style={styles.text}>{hours}</Text>
          )}
        </TouchableNativeFeedback>
        <Text style={styles.text}>:</Text>
        <TouchableNativeFeedback onPress={() => clickTimeHandler(false)}>
          {!selectHours ? (
            <Text style={styles.selectedText}>{minutes}</Text>
          ) : (
            <Text style={styles.text}>{minutes}</Text>
          )}
        </TouchableNativeFeedback>
      </View>
      <View style={{ flex: 4, alignSelf: "stretch" }}>
        {selectHours ? (
          <Hours hours={hours} setHours={setHours} />
        ) : (
          <Minutes minutes={minutes} setMinutes={setMinutes} />
        )}
      </View>

      <View style={{ position: "absolute", bottom: 10, left: width / 2 - 50 }}>
        <CircleButton
          width={100}
          height={100}
          path="plus"
          action={() => addAlarmHandler(`${hours}:${minutes}`)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 80,
  },

  selectedText: {
    fontSize: 80,
    color: "#8BC34A",
  },

  textView: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
  },
});

export default AddAlarm;
