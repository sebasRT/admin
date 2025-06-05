import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from "expo-image";
import React, { useRef } from "react";
import {
  Animated,
  Button,
  Dimensions,
  Pressable,
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
          source={require("@/assets/images/miDomi.png")}
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
          <Text style={styles.title}>¡Bienvenido a MiDomi!</Text>
          <Text style={styles.label}>Teléfono</Text>
          <Text>Teléfono ingresado al registrarte</Text>
          <TextInput style={styles.input} />
          <Pressable style={styles.button} onPress={handleNext}>
            <Text style={{ color: "white" }}>Siguiente</Text>
          </Pressable>
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
  title:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#0849EE",
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
    width: "100%",
    height: "100%",
  },
  button:{
    backgroundColor: "#0849EE",
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  }
});

export default Login;
