"use client";

import { BACKEND_SOCIAL_AUTH_URL } from "@/constants/constants";
import { Fragment, useState } from "react";

import { LoaderCircleIcon } from "lucide-react";
import { TelegramLoginModal } from "@/app/auth/form/socials/TelegramLoginModal";
import { socialsList, TSocials } from "@/app/auth/form/socials/social-list.data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const list = socialsList();

interface SocialMediaButtonsProps {
    className?: string;
}

export function SocialMediaButtons(props: SocialMediaButtonsProps) {
    const { className } = props;
    const [loadingId, setLoadingId] = useState<TSocials | null>(null);

    const [openedModalId, setOpenedModalId] = useState<TSocials | null>(null);

    const handleRedirect = (id: TSocials) => {
        setLoadingId(id);

        if (id === "sms" || id === "whatsapp" || id === "telegram") {
            setOpenedModalId(id);
        } else {
            window.location.href = `${BACKEND_SOCIAL_AUTH_URL}/${id}`;
        }
    };

    const reset = () => {
        setOpenedModalId(null);
        setLoadingId(null);
    };

    return (
        <>
            <div className={cn("grid grid-cols-4 gap-3", className)}>
                {list.map(({ id, icon }) => (
                    <Fragment key={id}>
                        {id === "telegram" ? (
                            <TelegramLoginModal isOpen={openedModalId === "telegram"} onClose={reset} icon={icon} onOpen={() => handleRedirect(id)} />
                        ) : (
                            <Button variant="outline" size="icon" onClick={() => handleRedirect(id)} disabled={loadingId === id}>
                                {loadingId === id ? <LoaderCircleIcon className="animate-spin" /> : icon}
                            </Button>
                        )}
                    </Fragment>
                ))}
            </div>

            {/* <PhoneAuthModal isOpen={openedModalId === "sms"} type="sms" onClose={reset} /> */}
            {/* <PhoneAuthModal isOpen={openedModalId === "whatsapp"} type="whatsapp" onClose={reset} /> */}
        </>
    );
}
