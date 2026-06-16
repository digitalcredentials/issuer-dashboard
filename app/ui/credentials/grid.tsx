'use client';

import { useMemo } from 'react';

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EditSelectedModal from './edit-selected-modal';
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';
import { notify } from '@/app/lib/email/notify';
import NotifySelectedModal from './notify-selected-modal';

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';

//Material UI Imports
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

//Icons Imports
import { AccountCircle, MailOutline, MailOutlined, MailOutlineOutlined, Send } from '@mui/icons-material';

import { Credential, Tag, Template, Tenant } from '@/app/lib/definitions';

const Grid = ({data, tenants, templates, tags}:{data:Credential[], templates: Template[], tenants: Tenant[], tags: Tag[]}) => {

  const columns = useMemo<MRT_ColumnDef<Credential>[]>(
    () => [
      
          {
       //     accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
            accessorKey: 'cred_name', //id is still required when using accessorFn instead of accessorKey
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
            accessorKey: 'holder_name', //hey a simple column for once
            header: 'Holder',
            size: 200,
          },
          {
            accessorKey: 'tag_name', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: 'select',
            header: 'Tag',
            size: 100,
          },  
          {
            accessorKey: 'status', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: 'select',
            header: 'Status',
            size: 50,
          },  
          {
            accessorKey: 'template_name', 
            header: 'Template',
            filterVariant: 'select',
            size: 200,
          },
          {
            accessorKey: 'tenant_issuer_name', 
            header: 'Tenant',
            filterVariant: 'select',
            size: 300,
          },
          {
            accessorKey: 'holder_email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Email',
            size: 150,
          },   
          {
            accessorFn: (row) => new Date(row.valid_from as string), //convert to Date for sorting and filtering
            id: 'valid_from',
            header: 'Valid From',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
          }, 
          {
            accessorFn: (row) => new Date(row.date_added as string), //convert to Date for sorting and filtering
            id: 'valid_until',
            header: 'Valid Until',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
          },
          {
            accessorFn: (row) => new Date(row.date_added as string), //convert to Date for sorting and filtering
            id: 'date_added',
            header: 'Date Added',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
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
          <Typography variant="h6">Show details like number of times notified, number of times collected, revoked, etc. or even a rendered version of the VC itself.:</Typography>
          <Typography variant="h5">
            Issued by: &quot;{row.original.tenant_issuer_name}&quot;
          </Typography>
        </Box>
      </Box>
    ),
    
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem',  alignItems: 'center' }}>
        <Tooltip title="Edit">
          <Link
            href={`/dashboard/credentials/${row.original.id}/edit`}
            className="rounded-md border p-2 w-10 h-10 hover:bg-gray-100"
          >
            <PencilIcon className="w-5 h-5" />  
          </Link>
        </Tooltip>
        <Tooltip title="Notify">
          <div  className="rounded-md border w-10 h-10 p-2 hover:bg-gray-100" onClick={() => notify(row.original.id) }>
            <MailOutlined />
          </div>
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
        Edit
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Notify
      </MenuItem>,
    ],
    muiTablePaperProps: {
      elevation: 0, //remove the mui box shadow
      //customize paper styles to get rid of border
      sx: {
        borderRadius: '0',
        border: '0px',
      },
  },
    renderTopToolbar: ({ table }) => {

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '8px',
            justifyContent: 'space-between',
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <EditSelectedModal 
                disabled={!table.getIsSomeRowsSelected()}
                selectedRows={table.getSelectedRowModel().flatRows as any}
                tenants={tenants}
                templates={templates}
                tags={tags}
              />

              <NotifySelectedModal 
                disabled={!table.getIsSomeRowsSelected()}
                selectedRows={table.getSelectedRowModel().flatRows as any}
              />

            </Box>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};


const CredentialGrid = ({data, tenants, templates, tags}:{data:any, templates: Template[], tenants: Tenant[], tags: Tag[]}) => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Grid data={data} tenants={tenants} templates={templates} tags={tags}/>
  </LocalizationProvider>
);

export default CredentialGrid;