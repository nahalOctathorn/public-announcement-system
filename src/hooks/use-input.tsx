import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import type { FieldConfig } from "@/@types/feild.type";
import { cn } from "@/lib/utils";

interface UseInputProps {
  fields: FieldConfig[];
  showRequiredAsterisk?: boolean;
  form: any;
  validationMode?: "onChange" | "onBlur";
}

export function useInput({
  fields,
  showRequiredAsterisk,
  form,
  validationMode = "onChange",
}: UseInputProps) {
  const inputs = fields.map((inputField) => {
    return (
      <form.AppField
        key={inputField.id}
        name={inputField.name}
        children={(field: any) => (
          <field.FormItem>
            <field.FormLabel className="text-muted-foreground ">
              {inputField.label}

              {showRequiredAsterisk && inputField.required && (
                <span className="text-red-500">*</span>
              )}
            </field.FormLabel>

            <field.FormControl>
              <div className="relative">
                {inputField.startAdornment && (
                  <div className="absolute left-3 top-2.5 flex items-center pointer-events-none">
                    {inputField.startAdornment}
                  </div>
                )}
                {inputField.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      if (validationMode === "onChange") {
                        field.handleBlur();
                      }
                    }}
                    onBlur={() => {
                      if (validationMode === "onBlur") {
                        field.handleBlur();
                      }
                    }}
                    placeholder={inputField.placeholder}
                    className={cn(
                      inputField.startAdornment && "pl-10",
                      inputField.endAdornment && "pr-10"
                    )}
                  />
                ) : inputField.type === "select" && inputField.options ? (
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value);
                      if (validationMode === "onChange") {
                        field.handleBlur();
                      }
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        inputField.startAdornment && "pl-10",
                        inputField.endAdornment && "pr-10",
                        inputField.className
                      )}
                    >
                      <SelectValue
                        placeholder={inputField.placeholder || "Select..."}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {inputField.options.map((option) => (
                        <SelectItem key={option.label} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={inputField.type}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      if (validationMode === "onChange") {
                        field.handleBlur();
                      }
                    }}
                    onBlur={() => {
                      if (validationMode === "onBlur") {
                        field.handleBlur();
                      }
                    }}
                    placeholder={inputField.placeholder}
                    className={cn(
                      inputField.startAdornment && "pl-10",
                      inputField.endAdornment && "pr-10"
                    )}
                  />
                )}

                {inputField.endAdornment && inputField.type !== "select" && (
                  <div className="absolute right-3 top-2.5 flex items-center">
                    {inputField.endAdornment}
                  </div>
                )}
              </div>
            </field.FormControl>
            <field.FormMessage />
            <field.FormDescription>
              {inputField.bottomAdornment && inputField.bottomAdornment}
            </field.FormDescription>
          </field.FormItem>
        )}
      />
    );
  });

  return { inputs };
}
