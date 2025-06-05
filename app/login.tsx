import { useAuth } from "@/auth/AuthProvider";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
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
  const [email, setEmail] = useState("");
  const sendOtp  = useAuth((state) => state.sendOtp);
  const hasOtp = useAuth((state) => state.hasOtp);
  console.log("hasOtp", hasOtp);
  
  const handleNext = () => {
    if(hasOtp){
      Animated.timing(animation, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

  };

  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const handleSubmit = async () => {
    try {
      const response = await sendOtp(email);
      console.log(response);
      handleNext();
    }
    catch (error) {
      console.error("Error fetching OTP:", error);
    }

  };

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.container, { transform: [{ translateX: animation }] }]}
      >
        {/* Step 1 */}
        <View style={styles.step}>
          <Text style={styles.title}>¡Bienvenido a MiDomi!</Text>
          <Text style={styles.label}>Correo</Text>
          <TextInput style={styles.input} placeholder="Ingrese el correo registrado" onChangeText={setEmail} />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Siguiente</Text>
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
    paddingInline: 30,
  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#0067F6",
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  reactLogo: {
    width: "100%",
    height: "100%",
  },
  button:{
    backgroundColor: "#0067F6",
    padding: 8,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

});

export default Login;
