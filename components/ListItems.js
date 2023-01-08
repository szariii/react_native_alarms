import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import ListItem from "./ListItem";

const ListItems = ({ alarmsInfo, setAlarmsInfo }) => {
  return (
    <View style={{ padding: 40, paddingBottom: 100 }}>
      {alarmsInfo ? (
        alarmsInfo.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            time={item.time}
            days={item.days}
            vibrationsBool={item.vibrations}
            musicBool={item.music}
            setAlarmsInfo={setAlarmsInfo}
            alarmsInfo={alarmsInfo}
          />
        ))
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default ListItems;
