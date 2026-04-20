import { Invitation, Guest } from './types';

const BASE = '/api';

// Admin
export async function adminLogin(password: string): Promise<void> {
  const res = await fetch(`${BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error('Invalid password');
}

export async function getInvitations(password: string): Promise<Invitation[]> {
  const res = await fetch(`${BASE}/admin/invitations`, {
    headers: { 'x-admin-password': password },
  });
  if (!res.ok) throw new Error('Failed to fetch invitations');
  return res.json();
}

export async function createInvitation(
  guestNames: string[],
  password: string
): Promise<Invitation> {
  const res = await fetch(`${BASE}/admin/invitations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': password,
    },
    body: JSON.stringify({ guestNames }),
  });
  if (!res.ok) throw new Error('Failed to create invitation');
  return res.json();
}

export async function deleteInvitation(token: string, password: string): Promise<void> {
  const res = await fetch(`${BASE}/admin/invitations/${token}`, {
    method: 'DELETE',
    headers: { 'x-admin-password': password },
  });
  if (!res.ok) throw new Error('Failed to delete invitation');
}

// Guest
export async function getInvitation(token: string): Promise<Invitation> {
  const res = await fetch(`${BASE}/invitations/${token}`);
  if (!res.ok) throw new Error('Invitation not found');
  return res.json();
}

export async function submitRsvp(token: string, guests: Guest[]): Promise<Invitation> {
  const res = await fetch(`${BASE}/invitations/${token}/rsvp`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guests }),
  });
  if (!res.ok) throw new Error('Failed to submit RSVP');
  return res.json();
}
