export interface Guest {
  id: string;
  name: string;
  attending: boolean | null;
  diet: 'vegetarian' | 'non-vegetarian' | null;
}

export interface Invitation {
  id: string;
  token: string;
  guests: Guest[];
  createdAt: string;
  respondedAt: string | null;
  /** One answer per invitation (not per guest). Omitted on older records until first RSVP after deploy. */
  bringingFurBaby?: boolean | null;
}
