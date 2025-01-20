"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import DataSourceSelector from "./DataSourceSelector"
import VisualizationSelector from "./VisualizationSelector"
import ReportPreview from "./ReportPreview"

export default function ReportBuilder() {
  const [reportElements, setReportElements] = useState([])
  const [selectedDataSource, setSelectedDataSource] = useState(null)

  const onDragEnd = (result) => {
    // Implement drag and drop logic here
  }

  const addElement = (element) => {
    setReportElements([...reportElements, element])
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <DataSourceSelector onSelect={setSelectedDataSource} />
        <VisualizationSelector onAdd={addElement} dataSource={selectedDataSource} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="report">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {reportElements.map((element, index) => (
                  <Draggable key={element.id} draggableId={element.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {/* Render report element */}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div>
        <ReportPreview elements={reportElements} />
      </div>
    </div>
  )
}

