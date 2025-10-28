import type { ComponentProps, ReactNode } from "react";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "./ui/field";

export const FormFieldSet = ({
  legend,
  description,
  dataSlot,
  children,
}: {
  legend?: ComponentProps<typeof FieldLegend>;
  description?: string;
  dataSlot?: string;
  children: ReactNode;
}) => {
  return (
    <FieldSet>
      <FieldLegend {...legend} />
      <FieldDescription>{description}</FieldDescription>
      <FieldGroup data-slot={dataSlot}>{children}</FieldGroup>
    </FieldSet>
  );
};
