import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { CheckboxInput } from "./components/checkbox-input";
import { SelectInput } from "./components/select-input";
import { TextInput } from "./components/text-input";
import { TextareaInput } from "./components/textarea-input";
import { Button } from "./components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "./components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./components/ui/input-group";

const status = ["draft", "published", "archived"];

const formSchema = z.object({
  name: z.string().trim().min(1, { error: "name is required." }),
  description: z.string().trim(),
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
      description: "",
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
          <TextInput
            control={form.control}
            name="name"
            label="Name"
            description="Enter your full name as you would like it displayed"
          />
          <TextareaInput
            control={form.control}
            name="description"
            label="Description"
            description="Please provide a description of yourself"
          />
          <SelectInput
            control={form.control}
            name="status"
            label="Status"
            description="Select the current status of your post"
            placeholder="Pick a status"
            items={status}
          />
          <FieldSet>
            <FieldLegend variant="label">Notifications</FieldLegend>
            <FieldDescription>
              Select the types of notifications you wish to receive about
              comments and post updates.
            </FieldDescription>
            <FieldGroup data-slot={"checkbox-group"}>
              <CheckboxInput
                control={form.control}
                name="notifications.email"
                label="Email"
              />
              <CheckboxInput
                control={form.control}
                name="notifications.sms"
                label="Sms"
              />
              <CheckboxInput
                control={form.control}
                name="notifications.push"
                label="Push"
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
