import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { numberToPrice, priceToNumber } from "@/utils/currency";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";

const PriceInput = ({ label, name }: { label: string; name: string }) => {
  const color = useThemeColor({}, "text");
  const { control } = useFormContext();

  if (!control)
    throw new Error("Envuelve el componente en un contexto de formulario");

  return (
    <View style={styles.view}>
      <ThemedText children={label} style={styles.label} />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, { color }]}
            value={numberToPrice(value | 0)}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(priceToNumber(text));
            }}
          />
        )}
        name={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: 150,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    fontSize: 20,
    paddingTop: 10,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
});
export default PriceInput;
