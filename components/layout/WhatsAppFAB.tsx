export default function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/919673709322?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Shiv%20Shakti%20Health%20Clinic."
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-sm bg-whatsapp text-white px-md py-sm rounded-full shadow-lg hover:shadow-xl hover:opacity-90 active:scale-95 transition-all duration-200 group"
    >
      <span
        className="material-symbols-outlined text-[22px]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        chat
      </span>
      <span className="font-button text-button hidden sm:block">WhatsApp Us</span>
    </a>
  );
}
