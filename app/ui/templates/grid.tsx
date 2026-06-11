'use client';

import { useMemo } from 'react';

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';

import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
  lighten,
} from '@mui/material';


import { Template } from '@/app/lib/definitions';

import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';

const Grid = ({data}:{data:Template[]}) => {
 console.log("the template data: ", data)
  const columns = useMemo<MRT_ColumnDef<Template>[]>(
    () => [
      
          {
            accessorKey: 'description', 
            header: 'Description',
            size: 200,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'name', //hey a simple column for once
            header: 'Name',
            size: 200,
          },
          {
            accessorKey: 'id', 
            header: 'ID',
            size: 50,
          }
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: false,
    enableColumnOrdering: false,
    enableGrouping: false,
    
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableColumnPinning: false,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: false,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiTableContainerProps: { sx: { maxHeight: '600px' } },
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [20, 30, 100],
      shape: 'rounded',
      variant: 'outlined',
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          left: '30px',
          maxWidth: '1000px',
          position: 'sticky',
          width: '100%',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Show details like full description of template, maybe the template itself too, in a scrollable pane. </Typography>
          <Box
            sx={{
              maxHeight: '300px',
              overflowY: 'auto',
              textAlign: 'left',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              p: 1,
            }}
          >
            <Typography component="pre" variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {JSON.stringify(row.original.template_json, null, 2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    ),
    
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
           <Link
              href={`/dashboard/tags/${row.original.id}/edit`}
              className="rounded-md border p-2 hover:bg-gray-100"
            >
      <PencilIcon className="w-5" />  
    </Link>
        </Tooltip>
      </Box>
    ),
    muiTablePaperProps: {
      elevation: 0, //remove the mui box shadow
      //customize paper styles to get rid of border
      sx: {
        borderRadius: '0',
        border: '0px',
      },
    } 
  });

  return <MaterialReactTable table={table} />;
};

const TemplateGrid = ({data}:{data:Template[]}) => (
  //App.tsx or AppProviders file
    <Grid data={data}/>
);

export default TemplateGrid;