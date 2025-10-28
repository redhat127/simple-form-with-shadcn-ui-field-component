import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./components/ui/field";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Checkbox } from "./components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./components/ui/input-group";
import { X } from "lucide-react";

const status = ["draft", "published", "archived"];

const formSchema = z.object({
  name: z.string().trim().min(1, { error: "name is required." }),
  description: z.string().trim().optional(),
  status: z.string().refine((v) => status.includes(v), {
    error: "Please select a valid status.",
  }),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
  }),
  users: z
    .array(z.object({ email: z.email("valid email is required.") }))
    .min(1, "One user is required.")
    .max(5, "Maximum users is 5."),
});

export const App = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "",
      notifications: { email: false, push: false, sms: false },
      users: [{ email: "" }],
    },
  });

  const {
    fields: users,
    append: addUser,
    remove: removeUser,
  } = useFieldArray({ control: form.control, name: "users" });

  return (
    <div className="max-w-2xl mx-auto py-16 px-8">
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
          form.reset();
        })}
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <FieldDescription>
                      Enter your full name as you would like it displayed
                    </FieldDescription>
                  </FieldContent>
                  <Input
                    {...field}
                    id={field.name}
                    autoComplete="on"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <FieldDescription>
                      Please provide a description of yourself
                    </FieldDescription>
                  </FieldContent>
                  <Textarea
                    {...field}
                    id={field.name}
                    autoComplete="on"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
          <Controller
            control={form.control}
            name="status"
            render={({ field: { onChange, ...field }, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                    <FieldDescription>
                      Select the current status of your post
                    </FieldDescription>
                  </FieldContent>
                  <Select
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
                      <SelectValue placeholder="Pick a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {status.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
          <FieldSet>
            <FieldLegend variant="label">Notifications</FieldLegend>
            <FieldDescription>
              Select the types of notifications you wish to receive about
              comments and post updates.
            </FieldDescription>
            <FieldGroup data-slot="checkbox-group">
              <Controller
                control={form.control}
                name="notifications.email"
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => {
                  return (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Checkbox
                        {...field}
                        checked={value}
                        onCheckedChange={onChange}
                        id={field.name}
                      />
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  );
                }}
              />
              <Controller
                control={form.control}
                name="notifications.push"
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => {
                  return (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Checkbox
                        {...field}
                        checked={value}
                        onCheckedChange={onChange}
                        id={field.name}
                      />
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>Push</FieldLabel>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  );
                }}
              />
              <Controller
                control={form.control}
                name="notifications.sms"
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => {
                  return (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Checkbox
                        {...field}
                        checked={value}
                        onCheckedChange={onChange}
                        id={field.name}
                      />
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>Sms</FieldLabel>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">User Email Addresses</FieldLegend>
            <FieldDescription>
              Use "Add User" to include more emails, or remove existing ones as
              needed.
            </FieldDescription>
            {form.formState.errors.users?.root && (
              <FieldError errors={[form.formState.errors.users.root]} />
            )}
            <div className="flex flex-col gap-4">
              <Button
                type="button"
                onClick={() => {
                  addUser({ email: "" });
                }}
                className="self-end"
              >
                Add More
              </Button>
              <FieldGroup>
                {users.map((user, index) => {
                  return (
                    <Controller
                      key={user.id}
                      control={form.control}
                      name={`users.${index}.email`}
                      render={({ field, fieldState }) => {
                        return (
                          <Field data-invalid={fieldState.invalid}>
                            <InputGroup>
                              <InputGroupInput
                                {...field}
                                id={field.name}
                                autoComplete="on"
                                aria-invalid={fieldState.invalid}
                              />
                              <InputGroupAddon align="inline-end">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeUser(index)}
                                >
                                  <X />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  );
                })}
              </FieldGroup>
            </div>
          </FieldSet>
          <Button type="submit">Submit</Button>
        </FieldGroup>
      </form>
    </div>
  );
};
