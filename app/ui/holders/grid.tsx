'use client';

import { useMemo } from 'react';

import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

//Material UI Imports
import {
  Box,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material';

//Icons Imports
import { AccountCircle} from '@mui/icons-material';
import { Holder } from '@/app/lib/definitions';


const Grid = ({data}:{data:Holder[]}) => {

  const columns = useMemo<MRT_ColumnDef<Holder>[]>(
    () => [
          {
            accessorKey: 'name', //hey a simple column for once
            header: 'Holder',
            size: 200,
          },
          {
            accessorKey: 'org_id', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Org ID',
            size: 100,
          },  
          {
            accessorKey: 'did', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'DID',
            size: 50,
          },
          {
            accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Email',
            size: 150,
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
    enableRowSelection: true,
    initialState: {
      showColumnFilters: false,
      pagination: {
        pageIndex: 0,
        pageSize: 25, 
      },
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
      rowsPerPageOptions: [25, 50, 100],
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
          <Typography variant="h6">Show details like credentials issued to holder maybe</Typography>
          <Typography variant="h5">
            Issued by: &quot;{row.original.name}&quot;
          </Typography>
        </Box>
      </Box>
    ),
    
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem',  alignItems: 'center' }}>
        <Tooltip title="Edit">
          <Link
            href={`/dashboard/holders/${row.original.id}/edit`}
            className="rounded-md border p-2 w-10 h-10 hover:bg-gray-100"
          >
            <PencilIcon className="w-5 h-5" />  
          </Link>
        </Tooltip>
      </Box>
    ),
    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Editttttt
      </MenuItem>
    ],
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


const HolderGrid = ({data}:{data:any}) => (
    <Grid data={data}/>
);

export default HolderGrid;