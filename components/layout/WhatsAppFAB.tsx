export default function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/919673709322?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Shiv%20Shakti%20Health%20Clinic."
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-3 pr-3 sm:pr-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:brightness-105 active:scale-95 transition-all duration-200 group"
    >
      {/* Official WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6 shrink-0 fill-white"
        aria-hidden="true"
      >
        <path d="M16.002 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.364.638 4.673 1.85 6.693L2.667 29.333l6.823-1.79A13.284 13.284 0 0 0 16.002 29.333C23.365 29.333 29.333 23.363 29.333 16S23.365 2.667 16.002 2.667Zm0 2.4c5.865 0 10.932 5.069 10.932 10.933 0 5.866-5.067 10.933-10.932 10.933a10.89 10.89 0 0 1-5.545-1.516l-.397-.238-4.05 1.063 1.08-3.945-.26-.413A10.89 10.89 0 0 1 5.069 16c0-5.864 5.069-10.933 10.933-10.933Zm-3.37 5.2c-.22-.001-.46.006-.685.52l-.852 2.07c-.2.487-.757 1.474-.054 2.867.703 1.393 2.183 3.572 4.744 4.826 2.562 1.253 3.14.994 3.698.926.557-.068 1.8-.735 2.054-1.44.254-.706.254-1.31.178-1.435-.076-.127-.28-.203-.586-.355-.306-.152-1.8-.888-2.08-.99-.28-.1-.484-.152-.686.152-.202.306-.782.99-.959 1.192-.177.203-.355.228-.66.076-.307-.152-1.295-.477-2.467-1.523-.912-.814-1.527-1.818-1.705-2.124-.178-.305-.019-.47.133-.62.137-.134.305-.352.457-.528.152-.178.203-.305.305-.508.1-.203.05-.38-.026-.533-.076-.152-.669-1.656-.93-2.262-.244-.585-.497-.523-.684-.53Z" />
      </svg>

      {/* Label — hidden on mobile, visible on sm+ */}
      <span className="hidden sm:block font-semibold text-sm leading-none whitespace-nowrap">
        WhatsApp Us
      </span>
    </a>
  );
}
