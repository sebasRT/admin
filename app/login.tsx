import { useAuth } from "@/auth/AuthProvider";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";

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
  const animation = useRef(new Animated.Value(0)).current;
  // 0 for step 1, -SCREEN_WIDTH for step 2
  const [email, setEmail] = useState(
    process.env.NODE_ENV === "development" ? "dev@midomi.app" : ""
  );
  
  const [otp, setOtp] = useState("");

  const {
    sendOtp,
    hasOtp,
    logIn: verifyOtp,
    isLoading,
  } = useAuth((state) => state);

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const handleNext = () => {
    Animated.timing(animation, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (hasOtp && !isSendingOtp) {
      handleNext();
    }
  }, [hasOtp, isSendingOtp]);

  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = async () => {
    setIsSendingOtp(true);
    try {
      const response = await sendOtp(email);
      console.log(response);
      handleNext();
    } catch (error) {
      console.error("Error fetching OTP:", error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleLogin = async () => {
    setIsVerifyingOtp(true);
    try {
      await verifyOtp(email, Number(otp));
    } catch (error) {
      console.log("Login failed:", error);
      setIsVerifyingOtp(false);
    }

    setIsVerifyingOtp(false);
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
          <TextInput
            editable={!isSendingOtp}
            style={styles.input}
            placeholder="Ingrese el correo registrado"
            onChangeText={setEmail}
          />
          <Pressable
            style={styles.button}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isSendingOtp ? "Enviando..." : "Siguiente"}
            </Text>
          </Pressable>
          {isSendingOtp && (
            <ActivityIndicator
              size="large"
              color="#0067F6"
              style={{ marginTop: 10 }}
            />
          )}
        </View>

        {/* Step 2 */}
        <View style={styles.step}>
          <Text style={styles.title}>Verificación de correo</Text>
          <Text style={[styles.label, { marginBottom: 20 }]}>
            Ingresa el código de inicio de sesión que ha sido enviado a tú
            correo
          </Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={setOtp}
            focusColor={"#0067F6"}
            theme={{
              pinCodeContainerStyle: styles.pinStyle,
              containerStyle: styles.otpInputContainer,
            }}
          />
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </Pressable>
          {isVerifyingOtp && (
            <ActivityIndicator
              size="large"
              color="#0067F6"
              style={{ marginTop: 10 }}
            />
          )}
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
  title: {
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
  button: {
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
  pinStyle: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    padding: 10,
  },
  otpInputContainer: {
    paddingInline: 20,
    marginBottom: 20,
  },
});

export default Login;
