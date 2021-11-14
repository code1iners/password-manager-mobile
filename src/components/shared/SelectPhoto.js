import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Text,
  Alert,
  Image,
  FlatList,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import colors from "../../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import HeaderRightTextButton from "./HeaderRightTextButton";

const Container = styled.View`
  flex: 1;
`;

const SelectText = styled.Text`
  color: ${colors.blue};
  margin-right: 7px;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 1.25px;
  font-weight: 600;
`;

const SelectedPhotoContainer = styled.View`
  flex: 1;
  background-color: ${colors.black};
  justify-content: center;
  align-items: center;
`;
const PhotosContainer = styled.View`
  flex: 1;
  background-color: ${colors.black};
`;

const PhotoImageContainer = styled.TouchableOpacity``;
const PhotoCheckedContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const SelectPhoto = ({ navigation, route }) => {
  const { from } = route.params;

  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState();

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    const [firstPhoto] = photos;
    if (firstPhoto) setSelectedPhoto(firstPhoto?.uri);
  };

  const getPermissions = async () => {
    const permissions = await MediaLibrary.getPermissionsAsync();
    const { accessPrivileges, canAskAgain, granted } = permissions;
    if (canAskAgain && accessPrivileges === "none") {
      const { accessPrivileges, granted } =
        await MediaLibrary.requestPermissionsAsync();
      if (granted && accessPrivileges !== "none") {
        if (accessPrivileges === "limited") {
          Alert.alert(
            "Caution",
            "Currently accessible only selected photos.\n(Setting > App > Photo > All photos)"
          );
        }
        setOk(true);
        getPhotos();
      }
    } else if (granted && accessPrivileges !== "none") {
      if (accessPrivileges === "limited") {
        Alert.alert(
          "Caution",
          "Currently accessible only selected photos.\n(Setting > App > Photo > All photos)"
        );
      }
      setOk(true);
      getPhotos();
    } else {
      Alert.alert(
        "No permissions",
        "Need allow photo permission.\n(Setting > App > Photo > All photos)"
      );
    }
  };

  const numColumns = 4;
  const { width } = useWindowDimensions();
  const handleIconClick = (photoUri) => setSelectedPhoto(photoUri);
  const renderItem = ({ item: photo }) => {
    return (
      <PhotoImageContainer onPress={() => handleIconClick(photo?.uri)}>
        <Image
          style={{
            width: width / numColumns,
            height: 100,
          }}
          source={{
            uri: photo?.uri,
          }}
        />
        <PhotoCheckedContainer>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={photo?.uri === selectedPhoto ? colors.primary : "gray"}
          />
        </PhotoCheckedContainer>
      </PhotoImageContainer>
    );
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onSelectClick = () => {
    navigation.navigate(from, {
      selectedPhoto,
    });
  };
  const HeaderRight = () => (
    <HeaderRightTextButton text="Select" onPress={onSelectClick} />
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  });

  return (
    <Container>
      <StatusBar hidden={false} />
      <SelectedPhotoContainer>
        {selectedPhoto ? (
          <Image
            source={{ uri: selectedPhoto }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Text
            style={{
              color: colors.white,
              letterSpacing: 2,
              fontSize: 24,
              opacity: 0.7,
            }}
          >
            No photo
          </Text>
        )}
      </SelectedPhotoContainer>

      {/* Photo list */}
      <PhotosContainer>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </PhotosContainer>
    </Container>
  );
};

export default SelectPhoto;
