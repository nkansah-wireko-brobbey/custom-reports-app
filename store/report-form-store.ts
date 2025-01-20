import { create } from "zustand";

type Filter = {
  field: string;
  operator: string;
  value: string;
};

export type DataSource = {
    id: string;
    name: string
}

type ReportPreferenceStore = {
  selectedDataSource: string | undefined;
  selectedColumns: string[];
  filters: Filter[];
  setSelectedDataSource: (dataSource: string | undefined) => void;
  setSelectedColumns: (columns: string[]) => void;
  setFilters: (filters: Filter[]) => void;
};

const useReportPreferenceStore = create<ReportPreferenceStore>((set) => ({
  selectedDataSource: undefined,
  selectedColumns: [],
  filters: [],
  setSelectedDataSource: (dataSource) => set({ selectedDataSource: dataSource }),
  setSelectedColumns: (columns) => set({ selectedColumns: columns }),
  setFilters: (filters) => set({ filters }),
}));

export default useReportPreferenceStore;
