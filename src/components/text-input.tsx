import type { ComponentProps } from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { FormBase, type Props } from "./form-base";
import { Input } from "./ui/input";

export const TextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  control,
  name,
  label,
  description,
  ...inputProps
}: Props<TFieldValues, TName, TTransformedValues> &
  ComponentProps<"input">) => {
  const { field, fieldState } = useController({
    control: control,
    name: name,
  });
  return (
    <FormBase
      control={control}
      name={name}
      label={label}
      description={description}
    >
      <Input
        {...inputProps}
        {...field}
        id={field.name}
        autoComplete="on"
        aria-invalid={fieldState.invalid}
      />
    </FormBase>
  );
};
