// WhatsApp əlaqə linkləri — hər yerdə eyni nömrə və standart mesaj işlənsin deyə mərkəzləşdirilib.

export const WHATSAPP_PHONE = "994702721555";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Salam, mən Ad Günü Dekor saytından dekorlarınıza baxdım, məlumat almaq istəyirəm.";

// Standart (default) mesajla WhatsApp linki
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  DEFAULT_WHATSAPP_MESSAGE
)}`;

// Fərqli bir mesajla (məsələn konkret paket adı ilə) link qurmaq üçün
export function buildWhatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
