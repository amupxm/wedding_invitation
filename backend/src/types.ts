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
  bringingFurBaby?: boolean | null;
}
