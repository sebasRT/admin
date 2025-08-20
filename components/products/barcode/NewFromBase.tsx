import { ThemedText } from "@/components/ThemedText";
import useKeyboard from "@/hooks/useKeyboard";
import { addProduct } from "@/lib/api/products";
import { BarcodeProduct, BaseBarcodeProduct } from "@/model/products/barcode";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, SubmitErrorHandler, useForm } from "react-hook-form";
import { Button, StyleSheet, View } from "react-native";
import ProductImage from "../Image";
import PriceInput from "../inputs/Price";

// formulario de creacion a partir de producto base (global)
const NewFromBase = ({
  defaultValues,
}: {
  defaultValues: BaseBarcodeProduct;
}) => {
  const { image, name, brand, measure } = defaultValues;
  const { shown } = useKeyboard();
  const form = useForm<BarcodeProduct>({
    defaultValues: {
      ...defaultValues,
      stockStatus: "available",
      type: "barcode",
    },
  });

  const {
    formState: { isValid },
  } = form;

  const { mutate, isPending, isSuccess, failureReason } = useMutation({
    mutationFn: addProduct,
  });

  const onSubmit = form.handleSubmit(
    (data: BarcodeProduct) => mutate(data),
    errorHandler
  );

  if (isPending) {
    return <ThemedText>Creando producto</ThemedText>;
  }

  if (isSuccess) {
    return <ThemedText>Producto creado correctamente.</ThemedText>;
  }

  if (failureReason) {
    return (
      <ThemedText>
        Error al crear el producto: {failureReason.message}
      </ThemedText>
    );
  }

  return (
    <View style={styles.view}>
      <ProductImage img={image} width={shown ? 100 : 200} />
      <ThemedText children={brand} style={styles.brand} />
      <ThemedText children={name} style={styles.name} />
      <ThemedText children={measure} style={styles.measure} />

      <View style={styles.inputs}>
        <FormProvider {...form}>
          <PriceInput label="Costo" name="cost" />
          <PriceInput label="Precio" name="price" />
        </FormProvider>
      </View>
      <Button title="Subir producto" onPress={onSubmit} disabled={!isValid} />
    </View>
  );
};

const errorHandler: SubmitErrorHandler<BarcodeProduct> = (e) => {
  console.log(e);
};

const styles = StyleSheet.create({
  view: {
    alignContent: "center",
    alignItems: "center",
  },
  new: {
    fontWeight: "bold",
    marginVertical: 20,
  },
  brand: {
    fontSize: 15,
    fontWeight: "bold",
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "300",
  },
  measure: {
    fontSize: 18,
    fontWeight: "300",
  },
  inputs: {
    marginVertical: 20,
    flexDirection: "row",
    gap: 10,
  },
});
export default NewFromBase;
