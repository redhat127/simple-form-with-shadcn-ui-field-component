import type { ComponentProps } from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { FormBase, type Props } from "./form-base";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SelectInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  control,
  name,
  label,
  description,
  placeholder,
  items,
  ...inputProps
}: Props<TFieldValues, TName, TTransformedValues> & {
  placeholder?: string;
  items: string[];
} & ComponentProps<typeof Select>) => {
  const {
    field: { onChange, ...field },
    fieldState,
  } = useController({
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
      <Select
        {...inputProps}
        {...field}
        onValueChange={onChange}
        data-invalid={fieldState.invalid}
      >
        <SelectTrigger
          id={field.name}
          onBlur={field.onBlur}
          aria-invalid={fieldState.invalid}
          ref={field.ref}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormBase>
  );
};
