import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from "expo-image";
import React, { useRef } from "react";
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Login = () => {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <TwoStepFormAnimated />
    </ParallaxScrollView>
  );
};

const SCREEN_WIDTH = Dimensions.get("window").width;

const TwoStepFormAnimated = () => {
  const animation = useRef(new Animated.Value(0)).current; // 0 for step 1, -SCREEN_WIDTH for step 2

  const handleNext = () => {
    Animated.timing(animation, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const handleSubmit = () => {
    console.log("Form submitted:");
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.container, { transform: [{ translateX: animation }] }]}
      >
        {/* Step 1 */}
        <View style={styles.step}>
          <Text style={styles.label}>Teléfono</Text>
          <Text>Teléfono ingresado al registrarte</Text>
          <TextInput style={styles.input} />
          <Button title="Next" onPress={handleNext} />
        </View>

        {/* Step 2 */}
        <View style={styles.step}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
          />
          <Button title="Back" onPress={handleBack} />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    width: SCREEN_WIDTH,
    marginTop: 50,
  },
  container: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 2,
  },
  step: {
    width: SCREEN_WIDTH,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

export default Login;
