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

export const LogoIcon = ({ className }) => (
  <svg {...stroke} strokeWidth="2" className={className}>
    <path d="M12 20.5S3.75 15.3 3.75 9A4.75 4.75 0 0 1 12 5.8 4.75 4.75 0 0 1 20.25 9c0 6.3-8.25 11.5-8.25 11.5Z" />
    <path d="M6.5 11h2.5l1.4-2.6 2.6 5 1.3-2.4h2.7" />
  </svg>
)

export const GridIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="3" y="3" width="8" height="8" rx="2.4" />
    <rect x="13" y="3" width="8" height="8" rx="2.4" opacity="0.45" />
    <rect x="3" y="13" width="8" height="8" rx="2.4" opacity="0.45" />
    <rect x="13" y="13" width="8" height="8" rx="2.4" />
  </svg>
)

export const CalendarIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <rect x="3" y="4.5" width="18" height="16" rx="3" />
    <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
  </svg>
)

export const PlusIcon = ({ className }) => (
  <svg {...stroke} strokeWidth="2" className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const StethoscopeIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M6 3v5a4 4 0 0 0 8 0V3" />
    <path d="M10 16a5 5 0 0 0 9 0v-2" />
    <circle cx="19" cy="11" r="2.5" />
  </svg>
)

export const UsersIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <circle cx="9" cy="8" r="3.25" />
    <path d="M3 19c0-3.1 2.7-5 6-5s6 1.9 6 5" />
    <path d="M16 4.9a3.25 3.25 0 0 1 0 6.2M21 19c0-2.9-1.9-4.6-4.4-5" />
  </svg>
)

export const ClipboardIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <rect x="5" y="4" width="14" height="17" rx="3" />
    <path d="M9 4.5v-1A1.5 1.5 0 0 1 10.5 2h3A1.5 1.5 0 0 1 15 3.5v1M9 11h6M9 15h4" />
  </svg>
)

export const LogoutIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M15 4.5h2.5A2 2 0 0 1 19.5 6.5v11a2 2 0 0 1-2 2H15" />
    <path d="M10 12h9M16 8.5 19.5 12 16 15.5" />
  </svg>
)

export const CheckIcon = ({ className }) => (
  <svg {...stroke} strokeWidth="2.4" className={className}>
    <path d="M5 12.5 10 17.5 19 7" />
  </svg>
)

export const CloseIcon = ({ className }) => (
  <svg {...stroke} strokeWidth="2.4" className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const EditIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z" />
    <path d="M13.5 8.5l3 3" />
  </svg>
)

export const TrashIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M4 7h16M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7" />
    <path d="M6.5 7 7.5 19a2 2 0 0 0 2 1.9h5a2 2 0 0 0 2-1.9L17.5 7M10 11v6M14 11v6" />
  </svg>
)

export const UploadIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <path d="M12 15.5V4M7.5 8.5 12 4l4.5 4.5" />
    <path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15" />
  </svg>
)

export const WalletIcon = ({ className }) => (
  <svg {...stroke} className={className}>
    <rect x="3" y="6" width="18" height="13" rx="3" />
    <path d="M3 10.5h18" />
    <circle cx="16.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)
