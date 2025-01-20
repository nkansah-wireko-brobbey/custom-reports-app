import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for demonstration
const mockData = {
  sales: [
    { Date: "2023-05-01", Product: "Widget A", Quantity: 100, Price: 9.99, Total: 999 },
    { Date: "2023-05-02", Product: "Widget B", Quantity: 50, Price: 19.99, Total: 999.5 },
    { Date: "2023-05-03", Product: "Widget C", Quantity: 75, Price: 14.99, Total: 1124.25 },
  ],
  inventory: [
    { Product: "Widget A", Quantity: 500, "Reorder Level": 100, "Last Restocked": "2023-04-15" },
    { Product: "Widget B", Quantity: 250, "Reorder Level": 50, "Last Restocked": "2023-04-20" },
    { Product: "Widget C", Quantity: 375, "Reorder Level": 75, "Last Restocked": "2023-04-25" },
  ],
  customers: [
    { Name: "John Doe", Email: "john@example.com", Phone: "123-456-7890", "Last Purchase Date": "2023-05-01" },
    { Name: "Jane Smith", Email: "jane@example.com", Phone: "234-567-8901", "Last Purchase Date": "2023-04-28" },
    { Name: "Bob Johnson", Email: "bob@example.com", Phone: "345-678-9012", "Last Purchase Date": "2023-05-02" },
  ],
}

export default function ReportPreview({ dataSource, columns, filters }) {
  const data = mockData[dataSource.id] || []

  // Apply filters (this is a simple implementation and might need to be more robust in a real application)
  const filteredData = data.filter((row) =>
    filters.every((filter) => {
      const value = row[filter.column]
      switch (filter.operator) {
        case "equals":
          return value == filter.value
        case "not equals":
          return value != filter.value
        case "greater than":
          return value > filter.value
        case "less than":
          return value < filter.value
        case "contains":
          return value.includes(filter.value)
        default:
          return true
      }
    }),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Preview: {dataSource.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

