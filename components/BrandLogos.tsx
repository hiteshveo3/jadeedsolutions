type LogoProps = { className?: string };

export function GoogleLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A11.9 11.9 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

export function TrustpilotLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#00B67A" d="M12 1.5 14.6 9.4H23l-6.8 4.9 2.6 8L12 17.4l-6.8 4.9 2.6-8L1 9.4h8.4z" />
      <path fill="#005128" d="m16.2 14.3-.6-1.9L12 15.1z" />
    </svg>
  );
}

export function ClutchLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M18.4 17.2A8 8 0 1 1 18.4 6.8" fill="none" stroke="#17313B" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="12.4" cy="12" r="2.7" fill="#EF4335" />
    </svg>
  );
}

export function FacebookLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#0866FF" />
      <path fill="#fff" d="m16.7 15.5.5-3.5h-3.3V9.7c0-.9.5-1.8 2-1.8h1.5V4.9s-1.4-.2-2.7-.2c-2.7 0-4.5 1.7-4.5 4.7V12H7.1v3.5h3.1V24a12 12 0 0 0 3.7 0v-8.5z" />
    </svg>
  );
}
