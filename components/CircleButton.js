import { TouchableOpacity, Image } from "react-native";
const CircleButton = ({ width, height, path, action }) => {
  let file = "";
  if (path === "plus") {
    file = require("../img/plus.png");
  }

  return (
    <TouchableOpacity onPress={action}>
      <Image
        style={{
          width: width,
          height: height,
          backgroundColor: "#FFFFFF",
          borderRadius: width,
          opacity: 0.5,
        }}
        source={file}
      />
    </TouchableOpacity>
  );
};

export default CircleButton;
