import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useMetadataStore from "@/store/metadata-store"
import useReportPreferenceStore from "@/store/report-form-store"

// const dataSources = [
//   { id: "sales", name: "Sales Data" },
//   { id: "inventory", name: "Inventory Data" },
//   { id: "customers", name: "Customer Data" },
// ]

// type Props = {
//   onSelect :  (dataSource: DataSource| undefined)=> void
// }

export default function DataSourceSelector() {

  const {metadata} = useMetadataStore()
  const {setSelectedDataSource} = useReportPreferenceStore()

  const handleOnSelect=(value: string)=>{

   const selectedValue  = dataSources?.find((source)=>source === value)

   setSelectedDataSource(selectedValue)
  }

  const dataSources = metadata?.tables

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Data Source</h2>
      <Select onValueChange={(value) => handleOnSelect(value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Choose a data source" />
        </SelectTrigger>
        <SelectContent>
          {dataSources?.map((source) => (
            <SelectItem key={source} value={source}>
              {source}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

