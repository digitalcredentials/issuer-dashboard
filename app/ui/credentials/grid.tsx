'use client';

import { useMemo } from 'react';

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
import { AccountCircle, MailOutline, Send } from '@mui/icons-material';

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
            accessorKey: 'template_name', //hey a simple column for once
            header: 'Template',
            filterVariant: 'select',
            size: 200,
          },
          {
            accessorKey: 'tenant_issuer_name', //hey a simple column for once
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
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
           <Link
      href={`/dashboard/credentials/${row.original.id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />  
    </Link>
         {/*  <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton> */}
        </Tooltip>
        <Tooltip title="Notify">
          <IconButton  onClick={() => notify(row.original.id) }>
            <MailOutline />
          </IconButton>
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
        Notify via Email
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

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.getValue('name'));
        });
      };

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
              <FormDialog 
                disabled={!table.getIsSomeRowsSelected()}
                selectedRows={table.getSelectedRowModel().flatRows as any}
                tenants={tenants}
                templates={templates}
                tags={tags}
              />

              <Button
                
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="outlined"
              >
                Notify Selected
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormDialog from './edit-selected-modal';
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';
import { notify } from '@/app/lib/email/notify';

const CredentialGrid = ({data, tenants, templates, tags}:{data:any, templates: Template[], tenants: Tenant[], tags: Tag[]}) => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Grid data={data} tenants={tenants} templates={templates} tags={tags}/>
  </LocalizationProvider>
);

export default CredentialGrid;