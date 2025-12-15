import type { ReactElement } from "react";
import type { IconType } from "react-icons";
import { FaGithub, FaGoogle, FaTelegram, FaTwitch, FaWhatsapp, FaYandex } from "react-icons/fa";
import { MdSms } from "react-icons/md";

export type TSocials = "google" | "github" | "twitch" | "yandex" | "telegram" | "sms" | "whatsapp";

export type SocialItem = {
    id: TSocials;
    icon: ReactElement<IconType>;
    name: string;
};

export const socialsList = (iconSize = 22): SocialItem[] => [
    { id: "google", icon: <FaGoogle size={iconSize} />, name: "Google" },
    { id: "github", icon: <FaGithub size={iconSize} />, name: "GitHub" },
    // { id: "twitch", icon: <FaTwitch size={iconSize} />, name: "Twitch" },
    { id: "yandex", icon: <FaYandex size={iconSize} />, name: "Yandex" },
    { id: "telegram", icon: <FaTelegram size={iconSize} />, name: "Telegram" },
    // { id: "sms", icon: <MdSms size={iconSize} />, name: "SMS" },
    // { id: "whatsapp", icon: <FaWhatsapp size={iconSize} />, name: "WhatsApp" },
    // { id: 'apple', icon: <FaApple size={iconSize}  />, name: 'Apple' },
];
