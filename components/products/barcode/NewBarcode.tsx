import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { postNewProduct } from "@/lib/api/products";
import { NewBarcodeProduct, newBarcodeSchema } from "@/model/products/barcode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Button, TextInput, TextInputProps } from "react-native";

const NewBarcode = ({ barcode }: { barcode: string }) => {
  const methods = useForm<NewBarcodeProduct>({
    resolver: zodResolver(newBarcodeSchema),
    defaultValues: { barcode },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const { mutate, isPending, isSuccess, failureReason } = useMutation({
    mutationFn: postNewProduct,
  });

  const onSubmit = handleSubmit(
    (data: NewBarcodeProduct) => mutate(data),
    errorHandler
  );

  if (isPending) {
    return <ThemedText>Creando producto</ThemedText>;
  }

  if (isSuccess) {
    return <ThemedText>Producto creado correctamente.</ThemedText>;
  }

  return (
    <FormProvider {...methods}>
      <ThemedText children={failureReason?.message} />
      <Input name="name" label="Nombre" autoFocus />
      <Input name="brand" label="Marca" />
      <Input name="measure" label="Medida" />
      <Input name="price" label="Medida" inputMode="numeric" />
      <Button title="Subir producto" onPress={onSubmit} />
    </FormProvider>
  );
};

const errorHandler: SubmitErrorHandler<NewBarcodeProduct> = (e) => {
  console.log(e);
};

type InputProps = { name: string; label: string } & TextInputProps;
const Input = ({ name, ...props }: InputProps) => {
  const placeholderColor = useThemeColor({}, "icon");
  const color = useThemeColor({}, "text");
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{ required: true, minLength: 1 }}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder={name}
          placeholderTextColor={placeholderColor}
          style={{ color }}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          {...props}
        />
      )}
    />
  );
};

export default NewBarcode;
