import type { ComponentProps } from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { FormBase, type Props } from "./form-base";
import { Textarea } from "./ui/textarea";

export const TextareaInput = <
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
  ComponentProps<"textarea">) => {
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
      <Textarea
        {...inputProps}
        {...field}
        id={field.name}
        autoComplete="on"
        aria-invalid={fieldState.invalid}
      />
    </FormBase>
  );
};
