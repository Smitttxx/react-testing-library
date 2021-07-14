export interface CreatePartnerFields {
  contactEmail: string;
  registeredBusinessName: string;
  businessDisplayName: string;
}

export interface CreatePartnerFormProps {
  onSubmit: (data: CreatePartnerFields) => void;
}
