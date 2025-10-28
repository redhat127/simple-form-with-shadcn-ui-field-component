import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "./ui/field";

export type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = Pick<
  ControllerProps<TFieldValues, TName, TTransformedValues>,
  "control" | "name"
> & {
  label: string;
  description?: string;
};

export const FormBase = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  control,
  name,
  label,
  description,
  children,
  isCheckbox = false,
}: Props<TFieldValues, TName, TTransformedValues> & {
  children: React.ReactNode;
  isCheckbox?: boolean;
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <Field
        data-invalid={fieldState.invalid}
        orientation={isCheckbox ? "horizontal" : "vertical"}
      >
        {isCheckbox && children}
        <FieldContent>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {description && !isCheckbox && (
            <FieldDescription>{description}</FieldDescription>
          )}
          {isCheckbox && fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </FieldContent>
        {!isCheckbox && (
          <>
            {children}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </>
        )}
      </Field>
    )}
  />
);
