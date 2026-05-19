// Lightweight inline SVG icons. Each uses currentColor so it inherits the
// surrounding text color, and accepts a className for sizing.

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
}

export const SearchIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const CalendarIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <rect x="3" y="4.5" width="18" height="16" rx="3" />
    <path d="M3 9.5h18M8 2.5v4M16 2.5v4M8.5 14l2 2 4-4" />
  </svg>
)

export const HeartPulseIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M12 20.5S3.75 15.3 3.75 9A4.75 4.75 0 0 1 12 5.8 4.75 4.75 0 0 1 20.25 9c0 6.3-8.25 11.5-8.25 11.5Z" />
    <path d="M6.5 11h2.5l1.4-2.6 2.6 5 1.3-2.4h2.7" />
  </svg>
)

export const ShieldIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M12 3 5 5.5v6c0 4.6 3 7.8 7 9.5 4-1.7 7-4.9 7-9.5v-6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const ClockIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3.5 2" />
  </svg>
)

export const UsersIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <circle cx="9" cy="8" r="3.25" />
    <path d="M3 19c0-3.1 2.7-5 6-5s6 1.9 6 5" />
    <path d="M16 4.9a3.25 3.25 0 0 1 0 6.2M21 19c0-2.9-1.9-4.6-4.4-5" />
  </svg>
)

export const StethoscopeIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M6 3v5a4 4 0 0 0 8 0V3" />
    <path d="M10 16a5 5 0 0 0 9 0v-2" />
    <circle cx="19" cy="11" r="2.5" />
  </svg>
)

export const ArrowRightIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M5 12h14M13 5.5 19.5 12 13 18.5" />
  </svg>
)

export const PhoneIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5V19a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 5 4Z" />
  </svg>
)

export const MailIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const MapPinIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const MenuIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = ({ className }) => (
  <svg {...stroke} strokeWidth="2.2" className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const ChevronDownIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const CheckIcon = ({ className }) => (
  <svg {...stroke} strokeWidth="2.4" className={className}>
    <path d="M5 12.5 10 17.5 19 7" />
  </svg>
)

export const VerifiedIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="m12 1.8 2.4 1.9 3 .2.9 2.9 2.3 2-1 2.9 1 2.9-2.3 2-.9 2.9-3 .2L12 22.2l-2.4-1.9-3-.2-.9-2.9-2.3-2 1-2.9-1-2.9 2.3-2 .9-2.9 3-.2L12 1.8Z" />
    <path
      d="m8.5 12 2.3 2.3 4.7-4.6"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const StarIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5Z" />
  </svg>
)

export const QuoteIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9.5 6C6.5 7 4.5 9.8 4.5 13.2V18h6v-6H7.8c0-2 1.2-3.4 3.2-4L9.5 6Zm10 0c-3 1-5 3.8-5 7.2V18h6v-6h-2.7c0-2 1.2-3.4 3.2-4L19.5 6Z" />
  </svg>
)
