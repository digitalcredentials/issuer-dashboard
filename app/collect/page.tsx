import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <h1 style={{margin: "1em"}}>Choose which credential you would like to collect: </h1>

      <ul style={{listStyleType:'circle'}}>
      <li> * All credentials that are available for the student, including different formats for each, so:</li>
      * Select the format for your credential (which shows whatever options are available for the credential, e.g, for a degree might be ISO, LER, OBv3)
      * Select a delivery option, which could be a DID that has a credential inbox service endpoint, email, Credential-API wallet selection, copy/paste, download, PDF with QR
     
     * The DID option could provide an additional option to permanently register the DID to allow for notifications of:
      * other credentials
      * updates the credentials, e.g., new versions
</ul>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Collect', href: '/collect' },
          {
            label: 'Collect Your Credential',
            href: '/dashboard/credentials/create',
            active: true,
          },
        ]}
      />
     
    </main>
  );
}