import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  FlatList,
  Vibration,
} from "react-native";

const SmallHoursButton = ({ staticHour, hours, setHours }) => {
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
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#757575",
    alignItems: "center",
    justifyContent: "center",
  },
  feedback: {
    width: 40,
    height: 40,
  },
});

export default SmallHoursButton;
