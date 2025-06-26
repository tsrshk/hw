"use client";
import { ModuleRegistry, ClientSideRowModelModule, TextFilterModule, NumberFilterModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { ColDef } from 'ag-grid-community';
import React from 'react';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule
]);

type AgGridTableProps<T> = {
  rowData: T[];
  columnDefs: ColDef<T>[];
  className?: string;
};

const AgGridTable = <T,>({ rowData, columnDefs, className = '' }: AgGridTableProps<T>) => {
  return (
    <div className={`ag-theme-quartz w-full h-full ${className}`} tabIndex={0} aria-label="Data table">
      <AgGridReact<T>
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default AgGridTable; 