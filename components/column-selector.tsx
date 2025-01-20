import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import useMetadataStore from "@/store/metadata-store";
import useReportPreferenceStore from "@/store/report-form-store";

// const columnsByDataSource = {
//   sales: ["Date", "Product", "Quantity", "Price", "Total"],
//   inventory: ["Product", "Quantity", "Reorder Level", "Last Restocked"],
//   customers: ["Name", "Email", "Phone", "Last Purchase Date"],
// }

export default function ColumnSelector() {
  const {
    selectedDataSource,
    selectedColumns,
    setSelectedColumns,
  } = useReportPreferenceStore();

  const {
    metadata
  } = useMetadataStore()

  const relatedDataSources = metadata?.relationships[selectedDataSource ?? ''] ?? {}

  const relatedColumns = Object.keys(relatedDataSources)
  .map((dataSource) => {
    const formattedDataSource = dataSource.charAt(0).toUpperCase() + dataSource.slice(1);
    const fields = metadata?.fields[formattedDataSource] || [];
    return fields.map((field) => `${dataSource}__${field}`);
  })
  .flat();

console.log(relatedColumns);


  const baseColumns = metadata?.fields[selectedDataSource ?? ''] || []

  const columns = [...baseColumns, ...relatedColumns]



  const handleColumnToggle = (column: string) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((c: string) => c !== column))
    } else {
      setSelectedColumns([...selectedColumns, column])
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Columns</h2>
      <div className="grid grid-cols-2 gap-4">
        {columns.map((column) => (
          <div key={column} className="flex items-center space-x-2">
            <Checkbox
              id={column}
              checked={selectedColumns.includes(column)}
              onCheckedChange={() => handleColumnToggle(column)}
            />
            <Label htmlFor={column}>{column}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

