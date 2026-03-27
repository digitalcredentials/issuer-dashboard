import * as React from 'react';
import { updateCredentials, State } from '@/app/lib/credentials/bulkActions';
import { useActionState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Tag, Template, Tenant } from '@/app/lib/definitions';

import {
  CheckIcon,
  TagIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

export default function EditSelectedModal({selectedRows, disabled, tenants, templates, tags}:{selectedRows:any, disabled: boolean, templates: Template[], tenants: Tenant[], tags: Tag[]}) {

    const [open, setOpen] = React.useState(false);
  const initialState: State = { message: null, errors: {}, formData: {tenantId: 'select', templateId: 'select', tagId: 'select', status: undefined}   };
  const updateCredentialsWithIds = updateCredentials.bind(null, selectedRows.map((row:any)=>row.original.id).join());
  const [state, formAction] = useActionState(updateCredentialsWithIds, initialState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button disabled={disabled} variant="outlined" onClick={handleClickOpen}>
        Edit Selected
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Selected Credentials</DialogTitle>
        <DialogContent>
          <DialogContentText>
            IMPORTANT: ALL of the credentials you selected will be set to these new values.
          </DialogContentText>
          <form action={formAction} id="bulk-form">
           <div className="rounded-md bg-gray-50 p-4 md:p-6 md:mt-4 mt-2">

        {/* Credential template */}
        <div className="mb-4">
          <label htmlFor="template-id" className="mb-2 block text-sm font-medium">
            Choose a template
          </label>
          <div className="relative">
            <select
              id="template-id"
              name="templateId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.formData?.templateId}
              key={state.formData?.templateId}
              aria-describedby="template-id-error"
            >
              <option value="select" >
                Select a template
              </option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="template-id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.templateId &&
              state.errors.templateId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Tenant */}
        <div className="mb-4">
          <label htmlFor="tenant-id" className="mb-2 block text-sm font-medium">
            Choose an issuer (who signs this credential)
          </label>
          <div className="relative">
            <select
              id="tenant-id"
              name="tenantId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.formData?.tenantId}
              key={state.formData?.tenantId}
              aria-describedby="tenant-id-error"
            >
              <option value="select">
                Select an issuer
              </option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="tenant-id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tenantId &&
              state.errors.tenantId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

 {/* tag */}
        <div className="mb-4">
          <label htmlFor="tag-id" className="mb-2 block text-sm font-medium">
            Choose a tag (to group with other credentials)
          </label>
          <div className="relative">
            <select
              id="tag-id"
              name="tagId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.formData?.tagId}
              key={state.formData?.tagId}
              aria-describedby="tag-id-error"
            >
              <option value="select">
                Select a tag
              </option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="tag-id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tagId &&
              state.errors.tagId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
{/*  Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the status (whether the holder can see and collect the credential)
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="hidden"
                  name="status"
                  type="radio"
                  value="hidden"
                  defaultChecked={state.formData?.status === 'hidden'}
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2 peer"
                />
                <label
                  htmlFor="hidden"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 peer-checked:bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Hidden <EyeSlashIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="collectable"
                  name="status"
                  type="radio"
                  value="collectable"
                  defaultChecked={state.formData?.status === 'collectable'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 peer"
                />
                <label
                  htmlFor="collectable"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 peer-checked:bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Collectable <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

</div>

          
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="bulk-form">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
