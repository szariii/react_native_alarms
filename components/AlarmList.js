import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Vibration,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";

import ListItems from "./ListItems";
import CircleButton from "./CircleButton";
import Database from "./Database";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "background-fetch";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = new Date();

  console.log(`Got background fetch call at date: ${now.toISOString()}`);

  const db = JSON.parse(await Database.getAll());
  const alarmsInfo = db.rows._array;

  alarmsInfo.forEach((ele) => {
    const splitedTime = ele.time.split(":").map((ele) => parseInt(ele));

    if (
      splitedTime[0] === now.getHours() &&
      splitedTime[1] === now.getMinutes()
    ) {
      if (ele.vibrations == "true") {
        console.log("*wibruje* brbrbrbrbrbrbrb");
        Vibration.vibrate(3000);
      }

      if (ele.music == "true") {
        console.log("*muzyczka gra* dryn dryn dryn");
        bgMusic();
      }
    }
  });

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

const bgMusic = async () => {
  await Audio.Sound.createAsync(require("../assets/audio/alarm.mp3"));
};

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 1 * 10, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

const AlarmList = ({ navigation }) => {
  const soundRef = useRef(new Audio.Sound());
  const [alarmsInfo, setAlarmsInfo] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    Database.getAll().then((all) => {
      setAlarmsInfo(JSON.parse(all).rows._array);
    });
    checkStatusAsync();
  }, []);

  //
  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    setStatus(status);
    setIsRegistered(isRegistered);
    registerBackgroundFetchAsync();
  };
  //

  useEffect(() => {
    Vibration.cancel();
    const date = new Date();
    let musicFlag = false;
    alarmsInfo.forEach((ele) => {
      const splitedTime = ele.time.split(":").map((ele) => parseInt(ele));

      if (
        splitedTime[0] === date.getHours() &&
        splitedTime[1] === date.getMinutes()
      ) {
        if (ele.vibrations == "true") {
          Vibration.vibrate(3100);
        }

        if (ele.music == "true") {
          musicFlag = true;
          playMusic();
        }
      }
    });

    if (musicFlag === false) {
      stopMusic();
    }

    const interval = setInterval(() => {
      const date = new Date();
      alarmsInfo.forEach((ele) => {
        const splitedTime = ele.time.split(":").map((ele) => parseInt(ele));

        if (
          splitedTime[0] === date.getHours() &&
          splitedTime[1] === date.getMinutes()
        ) {
          if (ele.vibrations == "true") {
            Vibration.vibrate(3100);
          }

          if (ele.music == "true") {
            playMusic();
          }
        }
      });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [alarmsInfo]);

  const stopMusic = async () => {
    const playInfo = await soundRef.current.getStatusAsync();
    if (playInfo.isLoaded === true) {
      await soundRef.current.pauseAsync();
    }
  };

  const playMusic = async () => {
    const playInfo = await soundRef.current.getStatusAsync();
    if (playInfo.isPlaying === false || playInfo.isLoaded === false) {
      if (playInfo.isLoaded === false) {
        const { sound: playbackObject } = await Audio.Sound.createAsync(
          require("../assets/audio/alarm.mp3")
        );
        soundRef.current = playbackObject;
      }
      await soundRef.current.setPositionAsync(0);
      await soundRef.current.playAsync();
    }
  };

  const width = Dimensions.get("window").width;

  const changeView = () => {
    navigation.navigate("addAlarm", {
      alarmsInfo: alarmsInfo,
      setAlarmsInfo: setAlarmsInfo,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#3F51B5" }}>
      <ScrollView>
        <SafeAreaView>
          <ListItems alarmsInfo={alarmsInfo} setAlarmsInfo={setAlarmsInfo} />
        </SafeAreaView>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          left: "35%",
          bottom: 10,
          left: width / 2 - 50,
        }}
      >
        <CircleButton
          width={100}
          height={100}
          path="plus"
          action={changeView}
        />
      </View>
    </View>
  );
};

export default AlarmList;
