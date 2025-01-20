import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const columnsByDataSource = {
  sales: ["Date", "Product", "Quantity", "Price", "Total"],
  inventory: ["Product", "Quantity", "Reorder Level", "Last Restocked"],
  customers: ["Name", "Email", "Phone", "Last Purchase Date"],
}

const operators = ["equals", "not equals", "greater than", "less than", "contains"]

export default function FilterBuilder({ dataSource, filters, onUpdateFilters }) {
  const [column, setColumn] = useState("")
  const [operator, setOperator] = useState("")
  const [value, setValue] = useState("")

  const columns = columnsByDataSource[dataSource.id] || []

  const addFilter = () => {
    if (column && operator && value) {
      onUpdateFilters([...filters, { column, operator, value }])
      setColumn("")
      setOperator("")
      setValue("")
    }
  }

  const removeFilter = (index) => {
    onUpdateFilters(filters.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Build Filters</h2>
      <div className="flex space-x-2">
        <Select value={column} onValueChange={setColumn}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent>
            {columns.map((col) => (
              <SelectItem key={col} value={col}>
                {col}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={operator} onValueChange={setOperator}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            {operators.map((op) => (
              <SelectItem key={op} value={op}>
                {op}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="text" placeholder="Enter value" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={addFilter}>Add Filter</Button>
      </div>
      <div className="space-y-2">
        {filters.map((filter, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>
              {filter.column} {filter.operator} {filter.value}
            </span>
            <Button variant="destructive" size="sm" onClick={() => removeFilter(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

