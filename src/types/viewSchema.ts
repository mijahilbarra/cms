export type SchemaFieldType = "text" | "textarea" | "url" | "color" | "json" | "select";

export type RepeaterField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url";
  placeholder?: string;
};

export type RepeaterConfig = {
  itemLabel: string;
  fields: RepeaterField[];
};

export type SchemaField = {
  label: string;
  type: SchemaFieldType;
  value: string;
  options?: string[];
  placeholder?: string;
  helpText?: string;
  repeater?: RepeaterConfig;
};

export type SchemaSection = {
  label: string;
  description?: string;
  fields: Record<string, SchemaField>;
};

export type ViewSchema = Record<string, SchemaSection>;

export type ViewDocument = {
  schema: ViewSchema;
};

export type ViewTemplate = {
  id: string;
  titulo: string;
  descripcion: string;
  schema: ViewSchema;
};
