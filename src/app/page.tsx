"use client";
import AgGridTable from '@components/AgGridTable';
import type { ColDef } from 'ag-grid-community';

const rowData = [
  { id: 1, name: 'John Doe', age: 28 },
  { id: 2, name: 'Jane Smith', age: 34 },
  { id: 3, name: 'Alice Johnson', age: 22 },
];

const columnDefs: ColDef<{ id: number; name: string; age: number }>[] = [
  { headerName: 'ID', field: 'id', sortable: true, filter: true },
  { headerName: 'Name', field: 'name', sortable: true, filter: true },
  { headerName: 'Age', field: 'age', sortable: true, filter: true },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">AG Grid Example</h1>
      <AgGridTable rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
}