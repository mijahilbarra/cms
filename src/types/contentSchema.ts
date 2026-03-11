export type CmsStorageType = "document" | "dictionary";

export type CmsFieldType =
  | "text"
  | "numeric"
  | "id"
  | "textarea"
  | "richtext"
  | "image"
  | "select"
  | "document"
  | "boolean"
  | "array"
  | "map";

export type CmsNestedFieldSchema = {
  type: CmsFieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  documentSchemaId?: string;
  documentLabelField?: string;
  itemSchema?: CmsNestedFieldSchema;
  mapFields?: CmsFieldSchema[];
};

export type CmsFieldSchema = CmsNestedFieldSchema & {
  key: string;
  label: string;
};

export type CmsContentSchema = {
  id: string;
  title: string;
  description?: string;
  storageType: CmsStorageType;
  collectionName: string;
  dictionaryDocumentId?: string;
  dictionaryRootKey?: string;
  slugFromField?: string;
  previewField?: string;
  fields: CmsFieldSchema[];
};
