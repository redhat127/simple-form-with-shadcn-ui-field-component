import {
  useController,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { FormBase, type Props } from "./form-base";
import { Checkbox } from "./ui/checkbox";

export const CheckboxInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>(
  props: Props<TFieldValues, TName, TTransformedValues>
) => {
  const {
    field: { value, onChange, ...field },
    fieldState,
  } = useController({
    control: props.control,
    name: props.name,
  });
  return (
    <FormBase {...props} isCheckbox>
      <Checkbox
        {...field}
        checked={value}
        onCheckedChange={onChange}
        id={field.name}
        aria-invalid={fieldState.invalid}
      />
    </FormBase>
  );
};
