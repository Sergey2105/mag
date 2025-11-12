"use client";

import { parseAsBoolean, useQueryState } from "nuqs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IDialogURL } from "@/types/dialog.interface";

export default function DialogURL(props: IDialogURL) {
    const { url, btn, title, children } = props;
    const [open, setOpen] = useQueryState(url, parseAsBoolean.withDefault(false));

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{btn}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
