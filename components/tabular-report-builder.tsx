"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ColumnSelector from "./column-selector"
import DataSourceSelector from "./data-source-selector"
import FilterBuilder from "./filter-builder"
import ReportPreview from "./report-preview"
import useReportPreferenceStore from "@/store/report-form-store"
import useMetadataStore from "@/store/metadata-store"
import { fetchData } from "@/lib/fetch-metadata"

const handleFetchMetadata = async () => {
  try {
    const metadata = await fetchData("metadata");
    console.log("Metadata fetched:", metadata);
    useMetadataStore.getState().setMetadata(metadata); // Preload metadata
  } catch (error : Error) {
    console.error("Failed to fetch metadata:", error.message);
  }
};

await handleFetchMetadata()

export default function TabularReportBuilder() {


  const {
    selectedDataSource,
    selectedColumns,
    filters,
    setFilters,
  } = useReportPreferenceStore();



  return (
    <Card className="border-[1px] border-primary">
      <CardHeader>
        <CardTitle>Build your preference suited report!</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="data-source" className="space-y-4">
          <TabsList>
            <TabsTrigger value="data-source">Data Source</TabsTrigger>
            <TabsTrigger value="columns" disabled={!selectedDataSource}>
              Columns
            </TabsTrigger>
            <TabsTrigger value="filters" disabled={!selectedDataSource}>
              Filters
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!selectedDataSource || selectedColumns.length === 0}>
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="data-source">
            <DataSourceSelector />
          </TabsContent>
          <TabsContent value="columns">
            <ColumnSelector/>
          </TabsContent>
          <TabsContent value="filters">
            <FilterBuilder dataSource={selectedDataSource} filters={filters} onUpdateFilters={setFilters} />
          </TabsContent>
          <TabsContent value="preview">
            <ReportPreview dataSource={selectedDataSource} columns={selectedColumns} filters={filters} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

