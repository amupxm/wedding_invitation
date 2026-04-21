import {
  Building2,
  Check,
  Copy,
  ExternalLink,
  Heart,
  Loader2,
  Mail,
  MailX,
  MessageCircle,
  Salad,
  Sparkles,
  UtensilsCrossed,
  Volume2,
  Wine,
  X,
} from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvitation, submitRsvp } from '../api';
import { Guest, Invitation } from '../types';

import imgHotelDiscoveryAncol from '../190687847.jpg';
import imgHotelMercureSabang from '../790352520.jpg';
import imgDateCol2 from '../assets/2.png';
import imgHeroWedding from '../assets/DSC02492.JPG';
import imgQris from '../assets/qr.png';
import imgRatnaXs from '../assets/ratna-xs.png';
import imgHeroBottomRight from '../eucalyptus_bottom_right_desktop-BLxpHn0i.png';
import imgEucalyptusLocationLeft from '../eucalyptus_location_left_desktop-BBRRCOmD.png';
import imgHeroTopLeft from '../eucalyptus_top_left_desktop-UGz1lNF-.png';
import imgEucalyptusWeddingSchedulesBottom from '../eucalyptus_wedding_schedules_bottom_desktop-c7aSIZnP.png';
import inviteMusicUrl from '../music.mp3';
import imgDateCol1 from '../x1.png';
import imgDateCol3 from '../x2.png';

function HeroFloralAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 132 C18 108 12 88 22 68 C30 52 44 42 52 28"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M14 118 C28 102 36 82 48 64"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M52 28 C58 18 68 12 78 8 C72 22 62 32 52 38 C48 32 50 22 52 28Z"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      <path
        d="M22 68 C32 58 42 54 50 48 M30 78 C40 70 48 66 56 60"
        stroke="currentColor"
        strokeWidth="0.65"
        strokeLinecap="round"
      />
      <ellipse cx="38" cy="52" rx="10" ry="5" transform="rotate(-35 38 52)" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="62" cy="44" rx="9" ry="4.5" transform="rotate(25 62 44)" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="72" cy="72" rx="8" ry="4" transform="rotate(-15 72 72)" stroke="currentColor" strokeWidth="0.55" />
      <circle cx="78" cy="8" r="2.2" stroke="currentColor" strokeWidth="0.5" />
      <path d="M4 96 L12 88 M6 104 L16 96" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function FlourishDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-6 md:py-8 ${className}`} aria-hidden>
      <div className="h-px flex-1 max-w-[4rem] bg-gradient-to-r from-transparent to-wedding-gold/50" />
      <svg width="28" height="12" viewBox="0 0 28 12" className="text-wedding-gold shrink-0" fill="none">
        <path
          d="M14 1 L16 5 L14 9 L12 5 Z M6 4 L8 6 L6 8 L4 6 Z M22 4 L24 6 L22 8 L20 6 Z"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="currentColor"
          fillOpacity="0.35"
        />
      </svg>
      <div className="h-px flex-1 max-w-[4rem] bg-gradient-to-l from-transparent to-wedding-gold/50" />
    </div>
  );
}

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto px-2">
      {subtitle && (
        <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-wedding-gold mb-2 md:mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="font-menu text-2xl sm:text-3xl md:text-[2rem] font-medium italic text-wedding-ink leading-tight">
        {children}
      </h2>
      <div className="mt-4 flex justify-center">
        <div className="h-[2px] w-16 bg-wedding-gold/40 rounded-full" />
      </div>
    </div>
  );
}

const DRESS_CODE_PALETTE = [
  { name: 'Rust', hex: '#B7410E' },
  { name: 'Pale Gold', hex: '#C99B68' },
  { name: 'Harvester', hex: '#ECC18A' },
  { name: 'Apricot Ice', hex: '#FDC19C' },
  { name: 'Dried Eucalyptus', hex: '#66745B' },
] as const;

function DressCodeColorPalette() {
  return (
    <div className="mt-10 sm:mt-12 max-w-lg mx-auto md:max-w-xl" aria-label="Rustic boho palette">
      <div className="grid grid-cols-5 gap-x-1.5 gap-y-1 px-0.5 sm:gap-x-3 md:gap-x-5">
        {DRESS_CODE_PALETTE.map(({ name, hex }) => (
          <div key={hex} className="flex min-w-0 flex-col items-center gap-1 sm:gap-1.5">
            <div
              className="h-9 w-9 shrink-0 rounded-full border border-wedding-ink/10 shadow-[0_4px_14px_-6px_rgba(42,42,40,0.28)] sm:h-12 sm:w-12 md:h-[3.75rem] md:w-[3.75rem]"
              style={{ backgroundColor: hex }}
              aria-hidden
            />
            <p className="text-center font-sans text-[9px] font-medium leading-tight text-wedding-forest sm:text-[11px] sm:leading-snug md:text-xs">
              {name}
            </p>
            <p className="text-center font-mono text-[8px] tracking-wide text-wedding-moss/70 sm:text-[9px] md:text-[10px]">
              {hex}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-8 font-menu text-sm italic text-wedding-ink/90 sm:mt-10 sm:text-base">
        Ratna &amp; Hasin{' '}
        <span className="mx-1.5 font-sans text-[10px] not-italic font-normal tracking-[0.2em] text-wedding-gold/80 sm:text-xs">
          |
        </span>
        <span className="font-sans text-[11px] not-italic font-normal tracking-[0.14em] text-wedding-moss/75 sm:text-sm">
          May 23, 2026
        </span>
      </p>
    </div>
  );
}

const MARINA_BATAVIA_MAPS_LINK = 'https://maps.app.goo.gl/6LvHGMkySwHhKkGP7';
const MARINA_BATAVIA_EMBED_SRC =
  'https://maps.google.com/maps?q=-6.121726,106.813247&hl=en&z=16&output=embed';

/** Replace with your real transfer details (shown in the Gifts modal). */
const GIFT_BANKING_INFO = {
  bank: 'Bank Central Asia (BCA)',
  accountName: 'J Ratna Juita S',
  accountNumber: '1451422621',
} as const;

function giftBankingDetailsCopyText(): string {
  return GIFT_BANKING_INFO.accountNumber;
}

/** Works when Clipboard API is blocked (non-HTTPS, some embedded browsers). */
function copyTextWithExecCommand(text: string): boolean {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.top = '0';
  ta.style.left = '0';
  ta.style.width = '1px';
  ta.style.height = '1px';
  ta.style.opacity = '0';
  ta.style.pointerEvents = 'none';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  ta.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

async function copyBankingDetailsToClipboard(): Promise<boolean> {
  const text = giftBankingDetailsCopyText();
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy copy
  }
  return copyTextWithExecCommand(text);
}

function MarinaBataviaMapEmbed() {
  return (
    <div className="mx-4 sm:mx-8 lg:mx-12 overflow-hidden rounded-xl border border-wedding-gold/15 shadow-inner">
      <iframe
        title="Marina Batavia — Google Maps"
        src={MARINA_BATAVIA_EMBED_SRC}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[14rem] w-full border-0 sm:h-[17rem] lg:h-[19rem]"
      />
      <div className="border-t border-wedding-gold/15 bg-wedding-cream/95 px-4 py-3 text-center">
        <a
          href={MARINA_BATAVIA_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 text-xs font-sans font-medium text-wedding-forest underline decoration-wedding-gold/45 underline-offset-2 hover:text-wedding-mossDeep sm:text-sm"
        >
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-wedding-goldWarm" strokeWidth={2} aria-hidden />
          Open in Google Maps — Marina Batavia
        </a>
      </div>
    </div>
  );
}

export default function InvitePage() {
  const { token } = useParams<{ token: string }>();
  const inviteMusicRef = useRef<HTMLAudioElement | null>(null);
  const inviteMusicUnlockRef = useRef<(() => void) | null>(null);
  const inviteMusicRemoveGesturesRef = useRef<(() => void) | null>(null);
  const [inviteMusicNeedsTap, setInviteMusicNeedsTap] = useState(false);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [responses, setResponses] = useState<Guest[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bringingFurBaby, setBringingFurBaby] = useState<boolean | null>(null);
  const [qrisOpen, setQrisOpen] = useState(false);
  const [bankingOpen, setBankingOpen] = useState(false);
  const [bankingCopied, setBankingCopied] = useState(false);

  const giftModalOpen = qrisOpen || bankingOpen;

  useEffect(() => {
    if (!token) return;
    getInvitation(token)
      .then((inv) => {
        setInvitation(inv);
        setResponses(inv.guests.map((g) => ({ ...g })));
        if (inv.respondedAt) setSubmitted(true);
      })
      .catch(() => setNotFound(true));
  }, [token]);

  useEffect(() => {
    if (!invitation) return;
    setBringingFurBaby(invitation.bringingFurBaby ?? null);
  }, [invitation]);

  useEffect(() => {
    if (!giftModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQrisOpen(false);
        setBankingOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [giftModalOpen]);

  useLayoutEffect(() => {
    if (!invitation) return undefined;
    const audio = inviteMusicRef.current;
    if (!audio) return undefined;

    audio.loop = true;
    audio.volume = 0.35;
    audio.defaultMuted = false;

    const detachGestures = () => {
      inviteMusicRemoveGesturesRef.current?.();
      inviteMusicRemoveGesturesRef.current = null;
    };

    const unmuteAndPlay = () => {
      audio.muted = false;
      void audio.play().catch(() => { });
      setInviteMusicNeedsTap(false);
      detachGestures();
    };
    inviteMusicUnlockRef.current = unmuteAndPlay;

    const attachGestures = () => {
      detachGestures();
      const types = ['pointerdown', 'touchend', 'click'] as const;
      const fns = types.map((type) => {
        const fn = () => unmuteAndPlay();
        document.addEventListener(type, fn, { capture: true });
        return () => document.removeEventListener(type, fn, { capture: true });
      });
      inviteMusicRemoveGesturesRef.current = () => {
        fns.forEach((off) => off());
      };
    };

    let cancelled = false;
    const tryStart = () => {
      if (cancelled) return;
      audio.muted = false;
      void audio.play().then(
        () => {
          if (!cancelled) setInviteMusicNeedsTap(false);
        },
        () => {
          if (cancelled) return;
          audio.muted = true;
          void audio.play().then(
            () => {
              if (!cancelled) {
                setInviteMusicNeedsTap(true);
                attachGestures();
              }
            },
            () => {
              if (!cancelled) {
                setInviteMusicNeedsTap(true);
                attachGestures();
              }
            }
          );
        }
      );
    };

    let rafInner = 0;
    const rafOuter = requestAnimationFrame(() => {
      rafInner = requestAnimationFrame(tryStart);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafInner);
      inviteMusicUnlockRef.current = null;
      detachGestures();
      setInviteMusicNeedsTap(false);
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
    };
  }, [invitation]);

  async function copyGiftBankingDetails() {
    const ok = await copyBankingDetailsToClipboard();
    if (ok) {
      setBankingCopied(true);
      window.setTimeout(() => setBankingCopied(false), 2000);
    } else {
      alert('Could not copy to clipboard. Please copy the details manually.');
    }
  }

  function updateGuest(id: string, field: keyof Guest, value: boolean | string | null) {
    setResponses((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const updated = { ...g, [field]: value };
        if (field === 'attending' && value === false) {
          updated.diet = null;
        }
        return updated;
      })
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    const allAnswered = responses.every(
      (g) => g.attending !== null && (g.attending === false || g.diet !== null)
    );
    if (!allAnswered) {
      alert('Please answer every question for each guest.');
      return;
    }
    if (bringingFurBaby === null) {
      alert('Please let us know if you are bringing your fur baby (one per invitation).');
      return;
    }
    setSubmitting(true);
    try {
      const updated = await submitRsvp(token, { guests: responses, bringingFurBaby });
      setInvitation(updated);
      setResponses(updated.guests.map((g) => ({ ...g })));
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-paper bg-paper-grain px-5 sm:px-8">
        <div className="text-center space-y-5 max-w-md border border-double border-wedding-gold/30 bg-wedding-creamWarm/90 px-8 py-12 shadow-lg rounded-sm">
          <div className="flex justify-center text-wedding-wine">
            <MailX className="w-14 h-14" strokeWidth={1} />
          </div>
          <h1 className="font-menu text-2xl sm:text-3xl italic text-wedding-ink">Invitation not found</h1>
          <p className="text-sm text-wedding-moss/85 leading-relaxed font-light">
            This link may be invalid or has expired.
          </p>
        </div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-paper bg-paper-grain">
        <Loader2 className="w-9 h-9 animate-spin text-wedding-gold" strokeWidth={1.5} />
      </div>
    );
  }

  const allComing = responses.every((g) => g.attending);
  const noneComing = responses.every((g) => g.attending === false);

  const timelineItems = [
    {
      time: '10:00 AM',
      title: 'Holy Matrimony',
      place: 'Marina Batavia - 1th floor',
      detail:
        'Jl. Ancol Barat IV, RT.1/RW.3, Ancol, Pademangan, North Jakarta City, Jakarta 14430',
      side: 'left' as const,
      Icon: Building2,
    },
    {
      time: ' 17:00 PM',
      title: 'Wedding Party',
      place: 'Marina Batavia',
      detail: 'Dinner, toasts, and celebration — same venue.',
      side: 'right' as const,
      Icon: Wine,
    },
  ];

  const stayHotels = [
    {
      name: 'Mercure Jakarta Sabang',
      bookingUrl: 'https://www.booking.com/hotel/id/mercure-jakarta-sabang.html',
      image: imgHotelMercureSabang,
    },
    {
      name: 'Discovery Ancol',
      bookingUrl: 'https://www.booking.com/Share-A1IC04',
      image: imgHotelDiscoveryAncol,
    },
  ];

  const shellClass =
    'w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto min-h-screen shadow-[0_0_60px_-12px_rgba(42,42,40,0.12)] border-x border-wedding-frame/80';

  return (
    <div className="min-h-screen bg-wedding-frame/90">
      <audio
        ref={inviteMusicRef}
        src={inviteMusicUrl}
        preload="auto"
        playsInline
        className="hidden"
        aria-hidden
      />
      <div className={shellClass}>
        <div className="bg-wedding-paper bg-paper-grain min-h-screen">
          {/* Hero */}
          <section className="relative bg-gradient-to-b from-wedding-sage via-wedding-sage to-[#c9ccc4] px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 lg:pt-20 pb-16 sm:pb-20 overflow-hidden">
            <img
              src={imgHeroTopLeft}
              alt=""
              className="pointer-events-none select-none absolute top-0 left-0 z-0 h-36 w-auto max-w-[min(55%,220px)] sm:h-48 sm:max-w-[min(50%,280px)] object-contain object-left-top opacity-90"
              decoding="async"
            />
            <img
              src={imgHeroBottomRight}
              alt=""
              className="pointer-events-none select-none absolute bottom-0 right-0 z-0 h-40 w-auto max-w-[min(58%,240px)] sm:h-52 sm:max-w-[min(52%,300px)] object-contain object-right-bottom opacity-90"
              decoding="async"
            />
            <svg
              className="absolute -right-4 sm:-right-2 top-8 sm:top-12 w-32 sm:w-44 h-32 sm:h-44 text-wedding-gold/35 pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden
            >
              <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" stroke="currentColor" strokeWidth="0.8" />
              <polygon points="50,20 82,38 82,62 50,80 18,62 18,38" stroke="currentColor" strokeWidth="0.8" />
            </svg>
            <svg
              className="absolute -left-2 bottom-20 sm:bottom-28 w-28 sm:w-36 h-28 sm:h-36 text-wedding-gold/30 pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden
            >
              <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" stroke="currentColor" strokeWidth="0.8" />
            </svg>

            <div className="relative z-10 max-w-md lg:max-w-lg mx-auto overflow-hidden rounded-sm border-[3px] border-double border-wedding-gold/25 shadow-xl">
              {/* Top: image placeholder with soft fade into cream */}
              <div className="relative h-[min(52vh,320px)] sm:h-[min(56vh,380px)] bg-wedding-sage/90 overflow-hidden">
                <img
                  src={imgHeroWedding}
                  alt="Ratna and Hasin"
                  className="pointer-events-none select-none absolute inset-0 z-0 h-full w-full object-cover object-[center_-100px] grayscale"
                  decoding="async"
                />
                <img
                  src={imgHeroTopLeft}
                  alt=""
                  className="pointer-events-none select-none absolute -top-3 -left-2 z-10 h-32 sm:h-40 w-auto object-contain opacity-40"
                  decoding="async"
                />
                <img
                  src={imgHeroBottomRight}
                  alt=""
                  className="pointer-events-none select-none absolute -right-2 top-10 z-10 h-36 sm:h-44 w-auto object-contain opacity-35"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 z-[11] bg-[linear-gradient(to_bottom,transparent_0%,transparent_90%,theme(colors.wedding.cream)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 z-10 h-[48%] pointer-events-none">

                  <img
                    src={imgHeroBottomRight}
                    alt=""
                    className="absolute -bottom-8 right-0 h-36 sm:h-44 w-auto object-contain opacity-35"
                    decoding="async"
                  />
                </div>
                <HeroFloralAccent className="pointer-events-none absolute -bottom-1 left-0 z-20 h-36 w-24 sm:h-44 sm:w-28 text-wedding-forest/55 drop-shadow-sm" />
              </div>

              {/* Bottom: names + details */}
              <div className="relative z-10 bg-wedding-cream/95 px-6 sm:px-10 lg:px-12 pt-8 sm:pt-10 pb-12 sm:pb-16 lg:pb-20 text-center">
                <div
                  role="group"
                  aria-label="Ratna and Hasin"
                  className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 sm:gap-x-4"
                >
                  <span className="font-script text-[2.65rem] sm:text-[3.1rem] lg:text-[3.45rem] font-normal tracking-wide text-wedding-ink leading-none capitalize">
                    Ratna
                  </span>
                  <span className="font-script text-xl sm:text-2xl lg:text-[1.85rem] text-wedding-gold leading-none px-0.5">
                    &
                  </span>
                  <span className="font-script text-[2.65rem] sm:text-[3.1rem] lg:text-[3.45rem] font-normal tracking-wide text-wedding-ink leading-none capitalize">
                    Hasin
                  </span>
                </div>
                <p className="mt-7 sm:mt-9 font-sans text-sm sm:text-base font-light tracking-wide text-wedding-moss/90">
                  finally getting married
                </p>
                <p className="mt-6 sm:mt-8 text-[11px] sm:text-xs font-sans font-medium tracking-[0.25em] sm:tracking-widestxl text-wedding-greyGreen uppercase">
                  May 23, 2026
                </p>
              </div>
            </div>
          </section>

          {/* Ratna — playful house rules */}
          <section className="px-5 sm:px-8 lg:px-14 xl:px-16 py-12 sm:py-16 border-y border-wedding-gold/15 bg-wedding-paper/60">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-wide text-wedding-forest uppercase mb-5 sm:mb-6">
                We&apos;re getting married!
              </h2>
              <p className="text-sm sm:text-base font-sans font-light leading-[1.85] text-wedding-moss max-w-xl mx-auto">
                We&apos;ve handled the venue, the food, and the playlist. All you have to do is show up and drink!
              </p>
            </div>

            <div className="relative mt-10 sm:mt-14 max-w-3xl mx-auto overflow-hidden rounded-2xl border border-wedding-gold/20 bg-wedding-cream/80 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 shadow-sm">
              <img
                src={imgHeroBottomRight}
                alt=""
                className="pointer-events-none select-none absolute -right-4 -top-5 z-0 h-[8.5rem] w-auto max-w-[min(42%,12rem)] sm:h-[10rem] sm:max-w-[min(38%,13rem)] object-contain object-right-top opacity-80 rotate-[6deg]"
                decoding="async"
              />
              <img
                src={imgEucalyptusLocationLeft}
                alt=""
                className="pointer-events-none select-none absolute left-1 bottom-0 z-[2] h-[5.75rem] w-auto max-w-[min(34%,8.5rem)] translate-y-1.5 sm:left-2 sm:bottom-0 sm:h-[6.5rem] sm:max-w-[min(32%,9.25rem)] sm:translate-y-2 object-contain object-left-bottom opacity-80"
                decoding="async"
              />
              <div className="relative z-[1] grid grid-cols-3 gap-2 sm:gap-4 items-stretch">
                {(
                  [
                    { label: '23', colPadClass: 'pt-0', image: imgDateCol1, showDot: true },
                    { label: '05', colPadClass: 'pt-10 sm:pt-16 md:pt-20', image: imgDateCol2, showDot: true },
                    { label: "'26", colPadClass: 'pt-20 sm:pt-32 md:pt-40', image: imgDateCol3, showDot: false },
                  ] as const
                ).map(({ label, colPadClass, image, showDot }) => (
                  <div
                    key={label}
                    className={`text-center flex flex-col items-center h-full min-h-0 ${colPadClass}`}
                  >
                    <div className="relative inline-block">
                      <p className="font-display font-bold text-wedding-ink leading-none tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                        {label}
                      </p>
                      {showDot && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute left-full bottom-0 z-10 h-1.5 w-1.5 translate-x-1.5 rounded-full bg-wedding-ink sm:h-2 sm:w-2 sm:translate-x-2 md:h-2.5 md:w-2.5 md:translate-x-2.5 lg:h-3 lg:w-3 lg:translate-x-3"
                        />
                      )}
                    </div>
                    <div
                      className="relative mt-3 sm:mt-4 w-full h-[calc(10.5rem+50px)] sm:h-[calc(12.5rem+50px)] md:h-[calc(14rem+50px)] shrink-0 overflow-hidden border border-wedding-gold/25 bg-wedding-paper shadow-[0_8px_24px_-16px_rgba(42,42,40,0.45)]"
                    >
                      <img
                        src={image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center grayscale"
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wedding-cream/40" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-10 grid gap-10 sm:gap-12 md:grid-cols-2 max-w-3xl mx-auto">
              <div className="relative overflow-hidden text-left rounded-xl border border-wedding-gold/20 bg-white/50 px-5 py-6 sm:px-6 sm:py-7 shadow-sm">
                <img
                  src={imgHeroBottomRight}
                  alt=""
                  className="pointer-events-none select-none absolute -right-3 -top-4 z-0 h-[7.5rem] w-auto max-w-[min(52%,11rem)] sm:h-[8.5rem] sm:max-w-[min(48%,12rem)] object-contain object-right-top opacity-80 rotate-[8deg]"
                  decoding="async"
                />
                <div className="relative z-[1]">
                  <h3 className="font-menu text-lg sm:text-xl italic text-wedding-ink mb-4 sm:mb-5 text-center md:text-left">
                    What to bring
                  </h3>
                  <ul className="space-y-3.5 sm:space-y-4">
                    {[
                      'Your small fur babies 🐶',
                      'A liver ready for drinks!',
                      'An appetite for food!',
                      'Your RSVP (on time, please!). 💌',
                    ].map((line) => (
                      <li key={line} className="flex gap-3 text-sm sm:text-base font-sans font-light text-wedding-moss leading-snug">
                        <Check
                          className="mt-0.5 h-5 w-5 shrink-0 text-wedding-mossDeep"
                          strokeWidth={2}
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative overflow-hidden text-left rounded-xl border border-wedding-gold/20 bg-white/50 px-5 py-6 sm:px-6 sm:py-7 shadow-sm">
                <img
                  src={imgHeroTopLeft}
                  alt=""
                  className="pointer-events-none select-none absolute -right-2 -top-3 z-0 h-[7rem] w-auto max-w-[min(48%,10.5rem)] sm:h-[8rem] sm:max-w-[min(44%,11.5rem)] object-contain object-right-top opacity-80 scale-x-[-1] rotate-[6deg]"
                  decoding="async"
                />
                <div className="relative z-[1]">
                  <h3 className="font-menu text-lg sm:text-xl italic text-wedding-ink mb-4 sm:mb-5 text-center md:text-left">
                    What to leave at home
                  </h3>
                  <ul className="space-y-3.5 sm:space-y-4">
                    {[
                      'The kids  (👶🏻❌)',
                      'Your “plus-one” (unless their name is on this invitation 👫❌). ',
                      'Your “plus-two?” Don’t you dare to try! 😋',
                    ].map((line) => (
                      <li key={line} className="flex gap-3 text-sm sm:text-base font-sans font-light text-wedding-moss leading-snug">
                        <Check
                          className="mt-0.5 h-5 w-5 shrink-0 text-wedding-wine/90"
                          strokeWidth={2}
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <FlourishDivider />

          {/* Timeline — mobile cards */}
          <section className="relative pt-4 px-4 sm:px-8 lg:px-12 xl:px-14 pb-4 md:pb-0 bg-[#f3f0ea]/80">
            <img
              src={imgEucalyptusLocationLeft}
              alt=""
              className="pointer-events-none select-none absolute left-0 bottom-0 z-0 h-[6rem] w-auto max-w-[min(44%,11rem)] translate-y-2 sm:left-1 sm:h-[7.25rem] sm:max-w-[min(40%,12rem)] sm:translate-y-3 object-contain object-left-bottom opacity-80"
              decoding="async"
            />
            <div className="relative z-[1]">
              <SectionTitle subtitle="The Day">Order of the day</SectionTitle>
              {/* Timeline — mobile: vertical spine + cards */}
              <div className="relative md:hidden pb-12 max-w-xl mx-auto">
                <div
                  className="pointer-events-none absolute left-6 top-8 bottom-8 w-[2px] -translate-x-1/2 rounded-full z-0"
                  style={{ background: 'linear-gradient(180deg, rgba(197,199,192,0.3) 0%, rgba(139,145,130,0.85) 8%, rgba(139,145,130,0.85) 92%, rgba(197,199,192,0.3) 100%)' }}
                  aria-hidden
                />
                <ul className="relative z-[1] space-y-4 sm:space-y-5">
                  {timelineItems.map((item, i) => {
                    const Icon = item.Icon;
                    return (
                      <li key={i} className="relative flex gap-3 sm:gap-4">
                        <div className="relative z-[2] flex shrink-0 w-12 sm:w-14 justify-center">
                          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-wedding-gold/40 bg-[#f3f0ea] shadow-sm flex items-center justify-center text-wedding-moss ring-[6px] ring-[#f3f0ea]">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.15} />
                          </div>
                        </div>
                        <article className="min-w-0 flex-1 rounded-2xl border border-wedding-gold/20 bg-white/70 backdrop-blur-sm p-4 sm:p-5 shadow-[0_8px_30px_-12px_rgba(42,42,40,0.15)]">
                          <p className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em] text-wedding-gold mb-1">
                            {item.time}
                          </p>
                          <h3 className="font-display text-lg sm:text-xl text-wedding-forest font-semibold tracking-wide">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-wedding-moss/75 mt-1">{item.place}</p>
                          <p className="text-xs sm:text-sm text-wedding-moss/85 leading-relaxed mt-2">{item.detail}</p>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Timeline — desktop alternating + continuous center line */}
              <div className="hidden md:block relative max-w-3xl mx-auto px-2 lg:px-4 pb-16 lg:pb-20">
                <div
                  className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(197,199,192,0.35) 0%, rgba(139,145,130,0.92) 4%, rgba(139,145,130,0.92) 96%, rgba(197,199,192,0.35) 100%)',
                  }}
                  aria-hidden
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-0 z-[2] flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f0ea] ring-[6px] ring-[#f3f0ea]">
                  <Heart className="h-4 w-4 fill-wedding-moss/15 text-wedding-moss" strokeWidth={1.5} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-[2] flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f0ea] ring-[6px] ring-[#f3f0ea]">
                  <Heart className="h-4 w-4 fill-wedding-moss/15 text-wedding-moss" strokeWidth={1.5} />
                </div>

                <ul className="relative z-[1] space-y-14 lg:space-y-16 pt-10 pb-12">
                  {timelineItems.map((item, i) => {
                    const Icon = item.Icon;
                    const isLeft = item.side === 'left';
                    return (
                      <li
                        key={i}
                        className="grid grid-cols-[1fr_auto_1fr] gap-x-4 lg:gap-x-8 gap-y-2 items-start"
                      >
                        <div className="text-right min-h-[1px]">
                          {isLeft && (
                            <div className="space-y-1 pr-1">
                              <p className="text-sm font-sans uppercase tracking-wider text-wedding-gold">{item.time}</p>
                              <p className="font-display text-lg lg:text-xl font-semibold text-wedding-forest">{item.title}</p>
                              <p className="text-xs lg:text-sm text-wedding-moss/70">{item.place}</p>
                              <p className="text-xs lg:text-sm text-wedding-moss/80 leading-relaxed mt-2 max-w-[14rem] ml-auto">
                                {item.detail}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="relative z-[2] flex flex-col items-center justify-start pt-0.5">
                          <div className="flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full border-2 border-wedding-gold/40 bg-[#f3f0ea] shadow-sm ring-[6px] ring-[#f3f0ea] text-wedding-moss">
                            <Icon className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.15} />
                          </div>
                        </div>
                        <div className="text-left min-h-[1px]">
                          {!isLeft && (
                            <div className="space-y-1 pl-1">
                              <p className="text-sm font-sans uppercase tracking-wider text-wedding-gold">{item.time}</p>
                              <p className="font-display text-lg lg:text-xl font-semibold text-wedding-forest">{item.title}</p>
                              <p className="text-xs lg:text-sm text-wedding-moss/70">{item.place}</p>
                              <p className="text-xs lg:text-sm text-wedding-moss/80 leading-relaxed mt-2 max-w-[14rem]">
                                {item.detail}
                              </p>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

          </section>

          <FlourishDivider className="bg-wedding-paper" />

          {/* Dress code */}
          <section className="relative px-5 sm:px-8 lg:px-14 py-12 sm:py-16 lg:py-20 text-center bg-wedding-paper">
            <div className="relative mb-8 sm:mb-10 h-44 sm:h-52 w-screen max-w-none left-1/2 -translate-x-1/2 overflow-hidden">
              <img
                src={imgRatnaXs}
                alt="Rustic boho dress code mood"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover grayscale sepia-[0.42] contrast-[1.08] brightness-[1] mix-blend-multiply"
                decoding="async"
              />
              <img
                src={imgEucalyptusWeddingSchedulesBottom}
                alt=""
                className="pointer-events-none select-none absolute -right-1 top-0 z-[1] h-auto max-h-[7.7rem] w-auto max-w-[min(52%,9.85rem)] object-contain object-right-top opacity-90 sm:-right-0.5 sm:max-h-[8.75rem] sm:max-w-[min(48%,11.2rem)]"
                decoding="async"
              />
            </div>
            <div className="relative z-[1]">
              <SectionTitle subtitle="Attire">Dress code</SectionTitle>
              <p className="text-sm sm:text-base font-sans font-light leading-[1.85] text-wedding-moss max-w-xl mx-auto">
                Our dress code is <span className="font-medium text-wedding-forest">Rustic Boho</span> — earthy tones, natural fabrics, and relaxed, effortless elegance.
              </p>
              <DressCodeColorPalette />
            </div>
          </section>

          <FlourishDivider />

          {/* Gifts */}
          <section className="relative overflow-hidden px-5 sm:px-8 lg:px-14 py-12 sm:py-16 lg:py-20 text-center">
            <img
              src={imgEucalyptusWeddingSchedulesBottom}
              alt=""
              className="pointer-events-none select-none absolute -right-1 top-0 z-0 h-auto max-h-[8.25rem] w-auto max-w-[min(52%,10.25rem)] object-contain object-right-top opacity-85 sm:max-h-[9rem] sm:max-w-[min(45%,11.5rem)]"
              decoding="async"
            />
            <SectionTitle subtitle="With gratitude">Gifts</SectionTitle>
            <p className="text-sm sm:text-base font-sans font-light leading-[1.85] text-wedding-moss max-w-xl mx-auto">
              Your presence is our greatest gift. Should you wish to give something more, a contribution toward our
              honeymoon would be deeply appreciated.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setQrisOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-wedding-gold/40 bg-wedding-cream/90 px-6 py-2.5 text-sm font-sans font-medium tracking-wide text-wedding-forest shadow-sm transition hover:border-wedding-gold/60 hover:bg-wedding-creamWarm/95"
              >
                Show QRIS
              </button>
              <button
                type="button"
                onClick={() => {
                  setBankingCopied(false);
                  setBankingOpen(true);
                }}
                className="inline-flex items-center justify-center rounded-full border border-wedding-gold/40 bg-wedding-cream/90 px-6 py-2.5 text-sm font-sans font-medium tracking-wide text-wedding-forest shadow-sm transition hover:border-wedding-gold/60 hover:bg-wedding-creamWarm/95"
              >
                Show banking info
              </button>
            </div>
          </section>

          <FlourishDivider />

          {/* Stay */}
          <section className="px-5 sm:px-8 lg:px-14 py-12 sm:py-16 lg:py-20 text-center bg-wedding-paper/50">
            <SectionTitle subtitle="Travel">Where to stay</SectionTitle>
            <p className="text-sm sm:text-base font-sans font-light leading-[1.85] text-wedding-moss max-w-xl mx-auto">
              We&apos;re pleased to share at least two hotel options below. If we secure room blocks, we&apos;ll send
              codes in a separate message.
            </p>
            <div className="mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 max-w-2xl mx-auto text-left">
              {stayHotels.map((hotel) => (
                <article
                  key={hotel.name}
                  className="overflow-hidden rounded-xl border border-wedding-gold/25 bg-white/85 shadow-sm"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-32 w-full object-cover sm:h-36"
                    decoding="async"
                  />
                  <div className="p-4 sm:p-5">
                    <h3 className="font-display text-lg font-semibold tracking-wide text-wedding-forest">{hotel.name}</h3>
                    <a
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-sans font-medium text-wedding-forest underline decoration-wedding-gold/45 underline-offset-[3px] hover:text-wedding-mossDeep"
                    >
                      <ExternalLink className="h-4 w-4 shrink-0 text-wedding-goldWarm" strokeWidth={2} aria-hidden />
                      View on Booking.com
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 text-xs sm:text-sm font-sans font-light text-wedding-moss/80 max-w-md mx-auto">
              Looking for something else?{' '}
              <a
                href="https://www.booking.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-wedding-forest underline decoration-wedding-gold/40 underline-offset-2 hover:text-wedding-mossDeep"
              >
                Search all hotels on Booking.com
              </a>
            </p>
          </section>

          {/* Directions */}
          <section className="px-5 sm:px-8 lg:px-14 pt-12 sm:pt-16 lg:pt-20 pb-8 text-center">
            <SectionTitle subtitle="Find us">Directions</SectionTitle>
            <div className="flex justify-center text-wedding-gold/70 mb-6">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.25} />
            </div>
            <h3 className="text-xs sm:text-sm font-sans font-medium tracking-widestxl text-wedding-moss uppercase mb-3">
              Ceremony
            </h3>
            <p className="text-sm sm:text-base font-sans font-light text-wedding-moss mb-4">
              Marina Batavia, Jl. Ancol Barat IV, RT.1/RW.3, Ancol, Pademangan, North Jakarta City, Jakarta 14430
            </p>
            <p className="text-xs sm:text-sm font-sans font-light leading-relaxed text-wedding-moss/85 max-w-xl mx-auto">
              Located in Ancol. Parking and ride-hailing drop-off are available in the venue.
            </p>
          </section>

          <div className="pb-8 pt-2 sm:pb-10 sm:pt-4">
            <MarinaBataviaMapEmbed />
          </div>

          <div className="px-6 sm:px-10 py-10 sm:py-12 mb-12 sm:mb-16 lg:mb-20">
            <div className="h-px bg-gradient-to-r from-transparent via-wedding-line to-transparent w-full max-w-md mx-auto" />
          </div>

          {/* RSVP */}
          <section className="px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24 lg:pb-28 relative">
            <img
              src={imgHeroTopLeft}
              alt=""
              className="pointer-events-none select-none absolute top-0 left-0 z-0 h-28 w-auto max-w-[min(42%,160px)] opacity-75 sm:h-40 sm:max-w-[min(38%,200px)] object-contain object-left-top"
              decoding="async"
            />
            <img
              src={imgHeroBottomRight}
              alt=""
              className="pointer-events-none select-none absolute bottom-0 right-0 z-0 h-32 w-auto max-w-[min(45%,170px)] opacity-75 sm:h-44 sm:max-w-[min(40%,210px)] object-contain object-right-bottom"
              decoding="async"
            />

            <div className="relative max-w-xl lg:max-w-2xl mx-auto">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                <svg className="w-full max-w-[min(100%,320px)] h-auto text-wedding-gold" viewBox="0 0 200 200" fill="none">
                  <polygon points="100,10 180,55 180,145 100,190 20,145 20,55" stroke="currentColor" strokeWidth="1.2" />
                  <polygon points="100,35 160,70 160,130 100,165 40,130 40,70" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              <div className="relative border-[3px] border-double border-wedding-gold/35 rounded-sm px-5 sm:px-10 lg:px-14 py-12 sm:py-14 lg:py-16 bg-wedding-creamWarm/90 backdrop-blur-[2px] shadow-[0_20px_50px_-20px_rgba(42,42,40,0.25)]">
                <SectionTitle subtitle="Kindly reply">RSVP</SectionTitle>
                <p className="text-center text-xs sm:text-sm font-sans font-light leading-relaxed text-wedding-moss mb-8 sm:mb-10 max-w-md mx-auto">
                  To help us plan, please let us know if you can join by{' '}
                  <span className="whitespace-nowrap font-medium text-wedding-ink">May 23, 2026</span>.
                </p>

                {submitted ? (
                  <div className="text-center space-y-6 sm:space-y-8">
                    <div className="flex justify-center text-wedding-mossDeep">
                      {allComing ? (
                        <Sparkles className="w-12 h-12 sm:w-14 sm:h-14" strokeWidth={1.15} />
                      ) : noneComing ? (
                        <MessageCircle className="w-12 h-12 sm:w-14 sm:h-14" strokeWidth={1.15} />
                      ) : (
                        <Mail className="w-12 h-12 sm:w-14 sm:h-14" strokeWidth={1.15} />
                      )}
                    </div>
                    <h3 className="font-menu text-xl sm:text-2xl italic text-wedding-ink">
                      {allComing
                        ? 'We cannot wait to celebrate with you.'
                        : noneComing
                          ? 'You will be missed.'
                          : 'Thank you for your reply.'}
                    </h3>
                    <p className="text-xs sm:text-sm text-wedding-moss/80">Your response has been saved.</p>

                    <div className="mt-6 space-y-4 text-left border-t border-wedding-gold/20 pt-8 max-w-md mx-auto">
                      {invitation.guests.map((g) => (
                        <div
                          key={g.id}
                          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 border-b border-wedding-line/50 pb-4 last:border-0 last:pb-0"
                        >
                          <span className="font-display font-semibold text-base text-wedding-forest">{g.name}</span>
                          <div className="text-left sm:text-right text-xs sm:text-sm text-wedding-moss/85 space-y-1.5">
                            <div>
                              {g.attending ? (
                                <span className="text-wedding-mossDeep font-medium">Attending</span>
                              ) : (
                                <span className="text-wedding-moss">Not attending</span>
                              )}
                            </div>
                            {g.attending && (
                              <div className="flex items-center gap-1.5 sm:justify-end">
                                {g.diet === 'vegetarian' ? (
                                  <>
                                    <Salad className="w-4 h-4 shrink-0" />
                                    <span>Vegetarian</span>
                                  </>
                                ) : (
                                  <>
                                    <UtensilsCrossed className="w-4 h-4 shrink-0" />
                                    <span>Non-vegetarian</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="mt-6 pt-6 border-t border-wedding-gold/20 text-left max-w-md mx-auto space-y-1">
                        <p className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em] text-wedding-greyGreen">
                          Fur baby
                        </p>
                        <p className="text-sm sm:text-base font-sans text-wedding-moss">
                          {invitation.bringingFurBaby === true && (
                            <span>
                              Bringing a fur baby <span aria-hidden>🐶</span>
                            </span>
                          )}
                          {invitation.bringingFurBaby === false && <span>Not bringing a fur baby</span>}
                          {(invitation.bringingFurBaby !== true && invitation.bringingFurBaby !== false) && (
                            <span className="text-wedding-moss/70">—</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                    {responses.map((guest) => (
                      <div
                        key={guest.id}
                        className="border border-wedding-gold/25 rounded-xl p-5 sm:p-6 lg:p-7 space-y-5 bg-white/60 shadow-sm"
                      >
                        <h3 className="font-display text-xl sm:text-2xl text-wedding-forest text-center tracking-wide">
                          {guest.name}
                        </h3>

                        <div className="space-y-3">
                          <p className="text-[11px] sm:text-xs text-wedding-moss/75 font-medium uppercase tracking-[0.2em] text-center">
                            Will you attend?
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-stretch sm:items-center">
                            <label className="flex items-center justify-center gap-2.5 cursor-pointer rounded-full border border-transparent hover:border-wedding-gold/30 px-3 py-2 transition-colors">
                              <input
                                type="radio"
                                name={`attending-${guest.id}`}
                                checked={guest.attending === true}
                                onChange={() => updateGuest(guest.id, 'attending', true)}
                                className="accent-wedding-mossDeep w-4 h-4 shrink-0"
                              />
                              <span className="text-sm text-wedding-moss">Yes, gladly</span>
                            </label>
                            <label className="flex items-center justify-center gap-2.5 cursor-pointer rounded-full border border-transparent hover:border-wedding-gold/30 px-3 py-2 transition-colors">
                              <input
                                type="radio"
                                name={`attending-${guest.id}`}
                                checked={guest.attending === false}
                                onChange={() => updateGuest(guest.id, 'attending', false)}
                                className="accent-wedding-mossDeep w-4 h-4 shrink-0"
                              />
                              <span className="text-sm text-wedding-moss">Regretfully no</span>
                            </label>
                          </div>
                        </div>

                        {guest.attending === true && (
                          <div className="space-y-3 pt-2 border-t border-wedding-line/40">
                            <p className="text-[11px] sm:text-xs text-wedding-moss/75 font-medium uppercase tracking-[0.2em] text-center">
                              Meal preference
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
                              <label className="flex items-center justify-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`diet-${guest.id}`}
                                  checked={guest.diet === 'vegetarian'}
                                  onChange={() => updateGuest(guest.id, 'diet', 'vegetarian')}
                                  className="accent-wedding-mossDeep w-4 h-4"
                                />
                                <Salad className="w-4 h-4 text-wedding-moss" />
                                <span className="text-sm text-wedding-moss">Vegetarian</span>
                              </label>
                              <label className="flex items-center justify-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`diet-${guest.id}`}
                                  checked={guest.diet === 'non-vegetarian'}
                                  onChange={() => updateGuest(guest.id, 'diet', 'non-vegetarian')}
                                  className="accent-wedding-mossDeep w-4 h-4"
                                />
                                <UtensilsCrossed className="w-4 h-4 text-wedding-moss" />
                                <span className="text-sm text-wedding-moss">Non-vegetarian</span>
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="border border-wedding-gold/25 rounded-xl p-5 sm:p-6 lg:p-7 space-y-4 bg-white/60 shadow-sm max-w-md mx-auto">
                      <p className="text-center font-display text-lg sm:text-xl text-wedding-forest tracking-wide">
                        Are you bringing your Fur Baby? <span aria-hidden>🐶</span>
                      </p>
                      <p className="text-center text-xs sm:text-sm font-sans font-light text-wedding-moss/90 leading-relaxed">
                        One pet per invitation, please.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-stretch sm:items-center pt-1">
                        <label className="flex items-center justify-center gap-2.5 cursor-pointer rounded-full border border-transparent hover:border-wedding-gold/30 px-3 py-2 transition-colors">
                          <input
                            type="radio"
                            name="bringing-fur-baby"
                            checked={bringingFurBaby === true}
                            onChange={() => setBringingFurBaby(true)}
                            className="accent-wedding-mossDeep w-4 h-4 shrink-0"
                          />
                          <span className="text-sm text-wedding-moss">Yes</span>
                        </label>
                        <label className="flex items-center justify-center gap-2.5 cursor-pointer rounded-full border border-transparent hover:border-wedding-gold/30 px-3 py-2 transition-colors">
                          <input
                            type="radio"
                            name="bringing-fur-baby"
                            checked={bringingFurBaby === false}
                            onChange={() => setBringingFurBaby(false)}
                            className="accent-wedding-mossDeep w-4 h-4 shrink-0"
                          />
                          <span className="text-sm text-wedding-moss">No</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full max-w-md mx-auto block rounded-full bg-wedding-mossDeep text-white py-4 text-sm sm:text-base font-sans font-medium tracking-[0.12em] uppercase hover:brightness-105 transition disabled:opacity-50 shadow-md"
                    >
                      {submitting ? 'Sending…' : 'Send RSVP'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

          <footer className="pb-10 sm:pb-12 text-center text-[10px] sm:text-xs text-wedding-moss/45 font-sans tracking-[0.25em] uppercase">
            Ratna Wedding
          </footer>
        </div>
      </div>

      {qrisOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qris-dialog-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-wedding-ink/55 backdrop-blur-[2px]"
            aria-label="Close QRIS"
            onClick={() => setQrisOpen(false)}
          />
          <div className="relative z-10 w-full max-w-[min(100%,20rem)] rounded-xl border border-wedding-gold/35 bg-wedding-cream/98 px-4 pb-4 pt-11 shadow-2xl sm:max-w-sm sm:px-5 sm:pb-5 sm:pt-12">
            <button
              type="button"
              onClick={() => setQrisOpen(false)}
              className="absolute right-2 top-2 rounded-full p-2 text-wedding-moss transition hover:bg-wedding-line/50 sm:right-3 sm:top-3"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <h3
              id="qris-dialog-title"
              className="mb-3 text-center font-menu text-lg italic text-wedding-ink sm:text-xl"
            >
              QRIS
            </h3>
            <img
              src={imgQris}
              alt="QRIS code for gift contribution"
              className="w-full rounded-lg border border-wedding-gold/20 bg-white"
              decoding="async"
            />
          </div>
        </div>
      )}

      {bankingOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="banking-dialog-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-wedding-ink/55 backdrop-blur-[2px]"
            aria-label="Close banking details"
            onClick={() => {
              setBankingOpen(false);
              setBankingCopied(false);
            }}
          />
          <div className="relative z-10 w-full max-w-md rounded-xl border border-wedding-gold/35 bg-gradient-to-b from-wedding-paper via-wedding-creamWarm to-wedding-sage/35 px-5 pb-5 pt-11 shadow-2xl ring-1 ring-wedding-gold/20 sm:px-6 sm:pb-6 sm:pt-12">
            <button
              type="button"
              onClick={() => {
                setBankingOpen(false);
                setBankingCopied(false);
              }}
              className="absolute right-2 top-2 rounded-full p-2 text-wedding-moss transition hover:bg-wedding-line/50 sm:right-3 sm:top-3"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <h3
              id="banking-dialog-title"
              className="mb-5 text-center font-menu text-lg italic text-wedding-ink sm:text-xl"
            >
              Banking details
            </h3>
            <dl className="space-y-4 text-left text-sm sm:text-base">
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-wedding-greyGreen">Bank</dt>
                <dd className="mt-1 font-sans font-medium text-wedding-forest">{GIFT_BANKING_INFO.bank}</dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-wedding-greyGreen">
                  Account name
                </dt>
                <dd className="mt-1 font-sans font-medium text-wedding-forest">{GIFT_BANKING_INFO.accountName}</dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-wedding-greyGreen">
                  Account number
                </dt>
                <dd className="mt-1 font-sans font-medium tracking-wide text-wedding-ink">{GIFT_BANKING_INFO.accountNumber}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => void copyGiftBankingDetails()}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-wedding-gold/45 bg-wedding-paper/90 py-3 text-sm font-sans font-medium text-wedding-forest transition hover:border-wedding-gold/65 hover:bg-white"
            >
              {bankingCopied ? (
                <>
                  <Check className="h-4 w-4 shrink-0 text-wedding-mossDeep" strokeWidth={2} aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 shrink-0 text-wedding-goldWarm" strokeWidth={2} aria-hidden />
                  Copy account number
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {inviteMusicNeedsTap && (
        <button
          type="button"
          onClick={() => inviteMusicUnlockRef.current?.()}
          className="fixed bottom-5 right-5 z-[220] inline-flex items-center gap-2 rounded-full border border-wedding-gold/50 bg-wedding-creamWarm/95 px-4 py-2.5 text-xs font-sans font-medium text-wedding-forest shadow-lg backdrop-blur-sm transition hover:bg-wedding-cream/98 sm:bottom-6 sm:right-6 sm:px-5 sm:text-sm"
          aria-label="Play background music"
        >
          <Volume2 className="h-4 w-4 shrink-0 text-wedding-mossDeep" strokeWidth={2} aria-hidden />
          Tap for music
        </button>
      )}
    </div>
  );
}
