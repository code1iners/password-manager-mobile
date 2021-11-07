import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";

const Container = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
`;

const Fab = ({ onPress }) => {
  // Don't use.
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animation default options.
  // const options = {
  //   duration: 300,
  //   useNativeDriver: true,
  // };

  // useEffect(() => {
  //   // Fab container display control.
  //   // Control by accounts list scrolling.
  //   // isShown is true = Display, isShown is false > Not display.
  //   Animated.timing(fadeAnim, {
  //     ...options,
  //     toValue: isShown ? 1 : 0,
  //   }).start();
  // }, [isShown]);

  return (
    <Container onPress={onPress}>
      <Ionicons
        style={{
          marginLeft: 4,
          transform: [
            {
              rotate: "45deg",
            },
          ],
        }}
        name="add"
        size={30}
        color="white"
      />
    </Container>
  );
};

export default Fab;
