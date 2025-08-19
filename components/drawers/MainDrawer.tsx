import { useAuth } from "@/auth/AuthProvider";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Button } from "@rneui/base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function MainDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const backgroundColor = useThemeColor({}, "background");

  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      hideStatusBarOnOpen
      drawerStyle={{
        backgroundColor,
        width: "80%",
        paddingTop: insets.top,
      }}
      drawerPosition="right"
      drawerType="front"
      renderDrawerContent={() => <DrawerContent />}
    >
      <HeaderTitle title="Main Drawer" openDrawer={() => setOpen(true)} />
      {children}
    </Drawer>
  );
}

function HeaderTitle({
  title,
  openDrawer,
}: {
  title: string;
  openDrawer: () => void;
}) {
  const iconColor = useThemeColor({}, "icon");
  const insets = useSafeAreaInsets();
  return (
    <ThemedView
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: insets.top + 10,
        padding: 10,
      }}
    >
      <ThemedText style={{ fontSize: 22 }}>MiDomi</ThemedText>
      <Button
        type="clear"
        icon={{ name: "more-vert", type: "material", color: iconColor }}
        onPress={openDrawer}
        containerStyle={{ borderRadius: 99 }}
      />
    </ThemedView>
  );
}

function DrawerContent() {
  const insets = useSafeAreaInsets();
  const { logOut } = useAuth((state) => state);
  return (
    <ThemedView
      style={{
        paddingBottom: insets.bottom + 10,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ThemedText>MiDomi</ThemedText>
      <Button title="Cerrar sesión" onPress={logOut} />
    </ThemedView>
  );
}
export { HeaderTitle };
const styles = StyleSheet.create({});
