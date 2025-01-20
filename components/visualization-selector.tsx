import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function VisualizationSelector({ onAdd, dataSource }) {
  const [visualizations] = useState([
    { id: 1, name: "Bar Chart" },
    { id: 2, name: "Line Chart" },
    { id: 3, name: "Pie Chart" },
    { id: 4, name: "Table" },
  ])

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Add Visualization</h2>
      <div className="flex flex-wrap gap-2">
        {visualizations.map((viz) => (
          <Button key={viz.id} onClick={() => onAdd({ type: "visualization", ...viz })} disabled={!dataSource}>
            {viz.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

