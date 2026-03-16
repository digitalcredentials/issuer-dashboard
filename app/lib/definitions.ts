
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Template = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Credential = {
  id: string;
  holder_id: string;
  date: string;
  status: 'pending' | 'collected' | 'pending' | 'notified' | 'deactivated';
};

export type CredsByMonth = {
  month: string;
  count: number;
};

export type LatestBatch = {
  id: string;
  name: string;
  image_url: string;
};

export type CredentialsTable = {
  id: string;
  holder_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  status: 'pending' | 'collected' | 'pending' | 'notified' | 'deactivated';
};

export type TemplatesTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_credentials: number;
  total_pending: number;
  total_collected: number;
  total_notified: number;
};

export type FormattedTemplatesTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Tenant = {
  id: string;
  name: string;
  description: string;
  email: string;
  issuer_name: string;
  issuer_url: string;
  issuer_image_url: string;
  env_name: string;
}

export type Tag = {
  id: string;
  name: string;
  description: string;
}

export type CredentialForm = {
  id: string;
  cred_template_id: string;
  cred_name: string;
  holder_name: string;
  holder_email: string;
  status: 'pending' | 'collected' | 'pending' | 'notified' | 'deactivated';
};

export type Holder = {
  id?: string;
  org_id: string;
  name: string;
  email: string;
  did: string;
};
