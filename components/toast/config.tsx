import { View } from "react-native";
import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";
import { ThemedText } from "../ThemedText";
import NoInternetToast from "./NoInternet";


const toastConfig: ToastConfig = {
    success: (props) => (
        <BaseToast
      { ...props }
      style={{ borderLeftColor: "pink" }}
contentContainerStyle = {{ paddingHorizontal: 20 }}
text1Style = {{
    fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),

error: (props) => (
    <ErrorToast
      { ...props }
      text1Style = {{
    fontSize: 17,
      }}
text2Style = {{
    fontSize: 15,
      }}
    />
  ),

tomatoToast: ({ text1, props }) => (
    <View style= {{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <ThemedText>{ text1 } </ThemedText>
        < ThemedText > { props.uuid } </ThemedText>
        </View>
  ),

noInternet: () => <NoInternetToast />,
};

export default toastConfig;
