import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  FlatList,
  Vibration,
} from "react-native";

const HoursButton = ({ staticHour, hours, setHours }) => {
  const presshandler = () => {
    Vibration.vibrate(100);

    setHours(staticHour);
  };

  return (
    <TouchableNativeFeedback
      onPress={presshandler}
      style={styles.feedback}
      background={TouchableNativeFeedback.Ripple("rgba(255,255,255,1)", true)}
    >
      <View style={styles.minutesButtonStyle}>
        <Text style={{ fontSize: 30 }}>{staticHour}</Text>
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

export default HoursButton;
