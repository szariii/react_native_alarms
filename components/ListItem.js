import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  TouchableNativeFeedback,
  Animated,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Database from "./Database";
import CheckboxButton from "./CheckboxButton";
import { FontAwesome } from "@expo/vector-icons";

const ListItem = ({
  id,
  time,
  days,
  alarmsInfo,
  setAlarmsInfo,
  vibrationsBool,
  musicBool,
}) => {
  const [vibration, setVibration] = useState(false);
  const [music, setMusic] = useState(false);
  const [arrowDown, setArrowDown] = useState(true);
  const [height, setHeight] = useState(new Animated.Value(150));
  const [arraySelectedDays, setArraySelectedDays] = useState([]);

  const deletePressHandler = () => {
    setAlarmsInfo(alarmsInfo.filter((ele) => ele.id !== id));
    Database.remove(id);
  };

  useEffect(() => {
    if (vibrationsBool === "true") {
      setVibration(true);
    }

    if (musicBool === "true") {
      setMusic(true);
    }

    let array = days.split(",");
    setArraySelectedDays(array);
  }, []);

  const daysOfWeek = [
    { short: "PN", long: "Pon." },
    { short: "WT", long: "Wto." },
    { short: "ŚR", long: "Śro." },
    { short: "CZ", long: "Czw." },
    { short: "PT", long: "Pią." },
    { short: "SB", long: "Sob." },
    { short: "ND", long: "Niedz." },
  ];

  const toggleHeight = () => {
    let toHeightValue = 150;
    if (arrowDown) {
      toHeightValue = 200;
    }

    Animated.spring(height, {
      toValue: toHeightValue,
      useNativeDriver: false,
    }).start();

    setArrowDown(!arrowDown);
  };

  const toggleVibrations = () => {
    Database.updateVibrations(id, `${!vibration}`);
    setAlarmsInfo(
      alarmsInfo.map((ele) =>
        ele.id === id ? { ...ele, vibrations: `${!vibration}` } : { ...ele }
      )
    );

    console.log(
      alarmsInfo.map((ele) =>
        ele.id === id ? { ...ele, vibrations: `${!vibration}` } : { ...ele }
      )
    );
    setVibration((previousState) => !previousState);
  };

  const toggleMusic = () => {
    Database.updateMusic(id, `${!music}`);
    setAlarmsInfo(
      alarmsInfo.map((ele) =>
        ele.id === id ? { ...ele, music: `${!music}` } : { ...ele }
      )
    );

    setMusic((previousState) => !previousState);
  };

  return (
    <Animated.View style={{ height: height }}>
      {/* <MaterialIcons name="keyboard-arrow-up" size={24} color="black" /> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        {vibration ? (
          <Text style={{ fontSize: 50, color: "#8BC34A" }}>{time}</Text>
        ) : (
          <Text style={{ fontSize: 50 }}>{time}</Text>
        )}

        <View>
          <Switch value={vibration} onValueChange={toggleVibrations} />
          <Switch value={music} onValueChange={toggleMusic} />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={deletePressHandler}>
          <Ionicons name="trash-bin-sharp" size={24} color="black" />
        </TouchableOpacity>
        {music ? <FontAwesome name="music" size={50} color="#C5CAE9" /> : ""}

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            "rgba(255,255,255,1)",
            true
          )}
          onPress={() => toggleHeight()}
        >
          {arrowDown === true ? (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          ) : (
            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          )}
        </TouchableNativeFeedback>
      </View>
      <View>
        {arrowDown === true ? (
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 20 }}>
              {daysOfWeek.map((ele) =>
                arraySelectedDays.includes(ele.short) ? `${ele.long},` : ""
              )}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 30,
              justifyContent: "space-between",
            }}
          >
            {daysOfWeek.map((ele, index) => (
              <CheckboxButton
                key={index}
                id={id}
                day={ele.short}
                arraySelectedDays={arraySelectedDays}
                alarmsInfo={alarmsInfo}
                setAlarmsInfo={setAlarmsInfo}
                setArraySelectedDays={setArraySelectedDays}
              />
            ))}
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default ListItem;
