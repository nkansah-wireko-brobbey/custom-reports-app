type Fields = {
    [table: string]: string[]; // Fields of each table
  };
  
  type Relationships = {
    [table: string]: { [relatedField: string]: string } | string[]; // Relationships between tables
  };
  
  export type Metadata = {
    tables: string[];
    fields: Fields;
    relationships: Relationships;
  };
  