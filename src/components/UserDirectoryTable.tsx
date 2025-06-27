"use client";
import { FC, useRef, useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { User } from "../types/user";
// import Modal from "./Modal";
// import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import React from 'react';
import ConfirmModal from './ConfirmModal';

// Tailwind + ag-Grid: кастомный стиль для line-height
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `.ag-cell, .ag-full-width-row .ag-cell-wrapper.ag-row-group { line-height: 1em !important; vertical-align: middle !important; }`;
  document.head.appendChild(style);
}

ModuleRegistry.registerModules([AllCommunityModule]);

export type UserDirectoryTableProps = {
  users: User[];
  onRowClick?: (user: User) => void;
  onDeleteUser?: (userId: number) => void;
};

const ClipboardIcon = ({ className = "" }) => (
  <svg className={"w-4 h-4 inline ml-1 cursor-pointer text-gray-400 hover:text-blue-700 transition " + className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75V5.25A2.25 2.25 0 0 0 14.25 3h-4.5A2.25 2.25 0 0 0 7.5 5.25v1.5m9 0A2.25 2.25 0 0 1 18.75 9v9A2.25 2.25 0 0 1 16.5 20.25h-9A2.25 2.25 0 0 1 5.25 18V9A2.25 2.25 0 0 1 7.5 6.75m9 0h-9" /></svg>
);
const TrashIcon = ({ className = "" }) => (
  <svg className={"w-5 h-5 text-gray-300 hover:text-red-500 transition " + className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5V6.75A2.25 2.25 0 0 1 8.25 4.5h7.5A2.25 2.25 0 0 1 18 6.75V7.5M9.75 11.25v4.5m4.5-4.5v4.5M4.5 7.5h15m-1.125 0-.825 9.058a2.25 2.25 0 0 1-2.244 2.067H8.694a2.25 2.25 0 0 1-2.244-2.067L5.625 7.5" /></svg>
);

const UserDirectoryTableComponent: FC<UserDirectoryTableProps> = ({ users, onRowClick, onDeleteUser }) => {
  const gridRef = useRef<AgGridReact>(null);
  const [isGridReady, setIsGridReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  // Делегированный обработчик клика по строке
  const handleRowClick = (user: User) => {
    if (onRowClick) onRowClick(user);
  };

  // Кастомные рендеры ячеек
  const nameCellRenderer = (params: any) => (
    <div className="flex flex-col justify-center h-full cursor-pointer select-none"
      onClick={() => handleRowClick(params.data)}
    >
      <div className="font-bold text-gray-900 whitespace-nowrap">{params.data.name}</div>
      <div className="text-xs text-gray-500 flex items-center">
        {params.data.email}
        <button
          type="button"
          aria-label="Copy email"
          tabIndex={0}
          className="ml-1 p-0.5 rounded hover:bg-blue-50 focus:outline-none"
          onClick={async e => {
            e.stopPropagation();
            try {
              await navigator.clipboard.writeText(params.data.email);
              setCopied(params.data.email);
              setTimeout(() => setCopied(null), 1200);
            } catch {}
          }}
        >
          <ClipboardIcon className={copied === params.data.email ? 'text-blue-700' : ''} />
        </button>
      </div>
    </div>
  );

  const addressCellRenderer = (params: any) => (
    <div className="flex items-center h-full cursor-pointer select-none"
      onClick={() => handleRowClick(params.data)}
    >
      <span className="text-gray-700 text-sm">
        {params.data.address.street}, {params.data.address.suite}, {params.data.address.city}, {params.data.address.zipcode}
      </span>
    </div>
  );

  const phoneCellRenderer = (params: any) => (
    <div className="flex items-center h-full cursor-pointer select-none"
      onClick={() => handleRowClick(params.data)}
    >
      <span className="flex items-center text-gray-700 text-sm">
        {params.data.phone}
        <button
          type="button"
          aria-label="Copy phone"
          tabIndex={0}
          className="ml-1 p-0.5 rounded hover:bg-blue-50 focus:outline-none"
          onClick={async e => {
            e.stopPropagation();
            try {
              await navigator.clipboard.writeText(params.data.phone);
              setCopied(params.data.phone);
              setTimeout(() => setCopied(null), 1200);
            } catch {}
          }}
        >
          <ClipboardIcon className={copied === params.data.phone ? 'text-blue-700' : ''} />
        </button>
      </span>
    </div>
  );

  const websiteCellRenderer = (params: any) => (
    <div className="flex items-center h-full cursor-pointer select-none"
      onClick={() => handleRowClick(params.data)}
    >
      <a
        href={`http://${params.data.website}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline hover:text-blue-900 transition text-sm"
        tabIndex={0}
        onClick={e => e.stopPropagation()}
      >
        {params.data.website}
      </a>
    </div>
  );

  const companyCellRenderer = (params: any) => (
    <div className="flex items-center h-full cursor-pointer select-none"
      onClick={() => handleRowClick(params.data)}
    >
      <span className="text-gray-700 text-sm">{params.data.company.name}</span>
    </div>
  );

  const trashCellRenderer = (params: any) => (
    <div style={{ overflow: 'visible', whiteSpace: 'normal', textOverflow: 'unset' }}>
      <button
        type="button"
        aria-label="Delete user"
        tabIndex={0}
        className="ml-auto p-1 rounded hover:bg-red-50 focus:outline-none cursor-pointer"
        onClick={e => {
          e.stopPropagation();
          setDeleteUserId(params.data.id);
        }}
      >
        <TrashIcon />
      </button>
    </div>
  );

  const handleConfirmDelete = () => {
    if (onDeleteUser && deleteUserId !== null) {
      onDeleteUser(deleteUserId);
      setDeleteUserId(null);
    }
  };

  const handleCancelDelete = () => setDeleteUserId(null);

  const columnDefs = useMemo(() => [
    {
      headerName: "User",
      field: "name",
      minWidth: 200,
      flex: 2,
      headerClass: 'font-semibold text-blue-900 bg-neutral-50',
      cellRenderer: nameCellRenderer,
      cellClass: 'py-2',
    },
    {
      headerName: "Address",
      field: "address.city",
      minWidth: 220,
      flex: 2,
      headerClass: 'font-semibold text-blue-900 bg-neutral-50',
      cellRenderer: addressCellRenderer,
      cellClass: 'py-2',
    },
    {
      headerName: "Phone",
      field: "phone",
      minWidth: 190,
      maxWidth: 190,
      flex: 1,
      headerClass: 'font-semibold text-blue-900 bg-neutral-50',
      cellRenderer: phoneCellRenderer,
      cellClass: 'py-2',
    },
    {
      headerName: "Website",
      field: "website",
      minWidth: 160,
      flex: 1,
      headerClass: 'font-semibold text-blue-900 bg-neutral-50',
      cellRenderer: websiteCellRenderer,
      cellClass: 'py-2',
    },
    {
      headerName: "Company",
      field: "company.name",
      minWidth: 160,
      flex: 1,
      headerClass: 'font-semibold text-blue-900 bg-neutral-50',
      cellRenderer: companyCellRenderer,
      cellClass: 'py-2',
    },
    {
      headerName: 'Actions',
      field: 'actions',
      minWidth: 100,
      maxWidth: 100,
      headerClass: 'font-semibold text-blue-900 bg-neutral-50',
      cellRenderer: trashCellRenderer,
      cellClass: 'py-2 text-center overflow-visible whitespace-normal',
      suppressMenu: true,
      suppressSorting: true,
    },
  ], [copied]);

  const rowData = useMemo(() => users.map((user) => ({
    ...user,
    "address.city": user.address.city,
    "company.name": user.company.name,
  })), [users]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div
        className="ag-theme-alpine w-full rounded-2xl border border-gray-200 bg-white shadow-md overflow-x-auto"
        style={{ minHeight: 300 }}
        aria-label="User directory table"
        tabIndex={0}
      >
        {isClient && (
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={rowData}
            domLayout="autoHeight"
            suppressRowClickSelection
            suppressCellFocus
            headerHeight={44}
            rowHeight={48}
            onGridReady={() => setIsGridReady(true)}
            rowClass="border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer"
          />
        )}
      </div>
      <ConfirmModal
        isOpen={deleteUserId !== null}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={
          <>
            Are you sure you want to delete this user?
            {deleteUserId && (
              <div className="mt-2 text-base text-gray-500">{users.find(u => u.id === deleteUserId)?.name}</div>
            )}
          </>
        }
      />
    </>
  );
};

const UserDirectoryTable = React.memo(UserDirectoryTableComponent);

export default UserDirectoryTable; 