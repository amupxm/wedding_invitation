import { useState, useEffect, useCallback } from 'react';
import { adminLogin, getInvitations, createInvitation, deleteInvitation } from '../api';
import { Guest, Invitation } from '../types';

function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function attendingLabel(att: boolean | null): string {
  if (att === null) return 'pending';
  return att ? 'yes' : 'no';
}

function dietLabel(d: Guest['diet']): string {
  if (!d) return '';
  return d === 'vegetarian' ? 'vegetarian' : 'non-vegetarian';
}

function invitationsToCsv(invitations: Invitation[]): string {
  const headers = [
    'invitation_id',
    'invitation_token',
    'invitation_created_at',
    'invitation_responded_at',
    'guest_id',
    'guest_name',
    'attending',
    'diet',
  ];
  const lines = [headers.map(escapeCsvCell).join(',')];
  for (const inv of invitations) {
    for (const g of inv.guests) {
      lines.push(
        [
          inv.id,
          inv.token,
          inv.createdAt,
          inv.respondedAt ?? '',
          g.id,
          g.name,
          attendingLabel(g.attending),
          dietLabel(g.diet),
        ]
          .map(escapeCsvCell)
          .join(','),
      );
    }
  }
  return lines.join('\r\n');
}

function downloadInvitationsCsv(invitations: Invitation[]) {
  const csv = invitationsToCsv(invitations);
  const blob = new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wedding-guests-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [guestNames, setGuestNames] = useState<string[]>(['']);
  const [creating, setCreating] = useState(false);
  const [newInvite, setNewInvite] = useState<Invitation | null>(null);
  const [copied, setCopied] = useState('');

  const storedPassword = authed ? password : '';

  const loadInvitations = useCallback(async () => {
    try {
      const data = await getInvitations(storedPassword);
      setInvitations(data);
    } catch {
      // ignore
    }
  }, [storedPassword]);

  useEffect(() => {
    if (authed) loadInvitations();
  }, [authed, loadInvitations]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    try {
      await adminLogin(password);
      setAuthed(true);
    } catch {
      setLoginError('Wrong password. Try again.');
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const names = guestNames.map((n) => n.trim()).filter(Boolean);
    if (names.length === 0) return;
    setCreating(true);
    try {
      const inv = await createInvitation(names, password);
      setNewInvite(inv);
      setGuestNames(['']);
      await loadInvitations();
    } catch {
      alert('Failed to create invitation');
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(token: string) {
    if (!confirm('Delete this invitation?')) return;
    try {
      await deleteInvitation(token, password);
      await loadInvitations();
      if (newInvite?.token === token) setNewInvite(null);
    } catch {
      alert('Failed to delete');
    }
  }

  function inviteUrl(token: string) {
    return `${window.location.origin}/invite/${token}`;
  }

  function copyUrl(token: string) {
    navigator.clipboard.writeText(inviteUrl(token));
    setCopied(token);
    setTimeout(() => setCopied(''), 2000);
  }

  function rsvpStatus(inv: Invitation) {
    if (!inv.respondedAt) return { label: 'Pending', cls: 'bg-yellow-100 text-yellow-800' };
    const coming = inv.guests.filter((g) => g.attending).length;
    return {
      label: `Responded (${coming}/${inv.guests.length} coming)`,
      cls: 'bg-green-100 text-green-800',
    };
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm space-y-5"
        >
          <h1 className="text-2xl font-semibold text-center text-rose-700">Admin Panel</h1>
          <p className="text-center text-gray-500 text-sm">Enter admin password to continue</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
            autoFocus
          />
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50">
      <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-rose-700">Wedding Admin Panel</h1>
        <button
          onClick={() => setAuthed(false)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Logout
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Create Invitation */}
        <section className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">New Invitation</h2>
          <form onSubmit={handleCreate} className="space-y-3">
            {guestNames.map((name, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    const next = [...guestNames];
                    next[i] = e.target.value;
                    setGuestNames(next);
                  }}
                  placeholder={`Guest ${i + 1} name`}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                {guestNames.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setGuestNames(guestNames.filter((_, j) => j !== i))}
                    className="text-red-400 hover:text-red-600 px-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setGuestNames([...guestNames, ''])}
                className="text-sm text-rose-600 hover:underline"
              >
                + Add another guest
              </button>
              <button
                type="submit"
                disabled={creating}
                className="ml-auto bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition disabled:opacity-50"
              >
                {creating ? 'Creating…' : 'Create Invitation'}
              </button>
            </div>
          </form>

          {newInvite && (
            <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-xl">
              <p className="text-sm font-medium text-gray-700 mb-1">Invitation created!</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-white border border-gray-200 px-3 py-2 rounded-lg break-all">
                  {inviteUrl(newInvite.token)}
                </code>
                <button
                  onClick={() => copyUrl(newInvite.token)}
                  className="text-sm bg-rose-600 text-white px-3 py-2 rounded-lg hover:bg-rose-700 transition whitespace-nowrap"
                >
                  {copied === newInvite.token ? 'Copied!' : 'Copy URL'}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Invitations Table */}
        <section className="bg-white rounded-2xl shadow p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-800">
              All Invitations ({invitations.length})
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => downloadInvitationsCsv(invitations)}
                className="text-sm bg-white border border-rose-300 text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition"
              >
                Download as CSV
              </button>
              <button
                type="button"
                onClick={loadInvitations}
                className="text-sm text-rose-600 hover:underline"
              >
                Refresh
              </button>
            </div>
          </div>

          {invitations.length === 0 ? (
            <p className="text-gray-400 text-sm">No invitations yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2 pr-4 font-medium">Guests</th>
                    <th className="pb-2 pr-4 font-medium">Status</th>
                    <th className="pb-2 pr-4 font-medium">Diets</th>
                    <th className="pb-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invitations.map((inv) => {
                    const status = rsvpStatus(inv);
                    return (
                      <tr key={inv.id} className="border-b last:border-0 align-top">
                        <td className="py-3 pr-4">
                          {inv.guests.map((g) => (
                            <div key={g.id} className="text-gray-800">
                              {g.name}
                              {g.attending !== null && (
                                <span
                                  className={`ml-1 text-xs ${g.attending ? 'text-green-600' : 'text-red-500'}`}
                                >
                                  {g.attending ? '✓' : '✗'}
                                </span>
                              )}
                            </div>
                          ))}
                        </td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.cls}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-gray-500">
                          {inv.guests.map((g) => (
                            <div key={g.id}>
                              {g.diet ? (g.diet === 'vegetarian' ? '🥗 Veg' : '🍖 Non-veg') : '—'}
                            </div>
                          ))}
                        </td>
                        <td className="py-3">
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => copyUrl(inv.token)}
                              className="text-xs text-rose-600 hover:underline text-left"
                            >
                              {copied === inv.token ? 'Copied!' : 'Copy URL'}
                            </button>
                            <button
                              onClick={() => handleDelete(inv.token)}
                              className="text-xs text-red-500 hover:underline text-left"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
