"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TG_AUTH_REDIRECT_URL } from "@/constants/constants";
import { LoginButton } from "@telegram-auth/react";
import { ReactElement } from "react";

interface TelegramLoginModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    icon: ReactElement;
}

export function TelegramLoginModal({ isOpen, onOpen, onClose, icon }: TelegramLoginModalProps) {
    return (
        <>
            <Button variant="outline" size="icon" onClick={onOpen}>
                {icon}
            </Button>

            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Войти через Telegram</DialogTitle>
                    </DialogHeader>

                    <LoginButton botUsername="FunkoShopProjectBot" authCallbackUrl={TG_AUTH_REDIRECT_URL} buttonSize="large" cornerRadius={5} lang="ru" />
                </DialogContent>
            </Dialog>
        </>
    );
}
