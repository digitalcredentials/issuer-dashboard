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
  Checkbox,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
  lighten,
} from '@mui/material';

import { AccountCircle } from '@mui/icons-material';

import { Tenant } from '@/app/lib/definitions';

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Link from 'next/link';
import { PencilIcon, CheckIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const Grid = ({data}:{data:Tenant[]}) => {
 console.log("the tenant data: ", data)
  const columns = useMemo<MRT_ColumnDef<Tenant>[]>(
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
          accessorKey: 'is_active',
          header: 'Is Active',
          Cell: ({ cell }) => (
            cell.getValue() ?
            <CheckIcon
              className="h-5 w-5"
              aria-label="is active checkbox" // Important for accessibility
            /> :
            ''
          ),
        },
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
          <Typography variant="h6">Show details like number of credentials tagged, collection numbers of those credentials, etc. </Typography>
          <Typography variant="h5">
            Data would go here, this is the id from the record: &quot;{row.original.id}&quot;
          </Typography>
        </Box>
      </Box>
    ),
    
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
           <Link
              href={`/dashboard/tenants/${row.original.id}/edit`}
              className="rounded-md  p-2 hover:bg-gray-100"
            >
      <PencilSquareIcon className="w-5" />  
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

const TenantGrid = ({data}:{data:Tenant[]}) => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Grid data={data}/>
  </LocalizationProvider>
);

export default TenantGrid;