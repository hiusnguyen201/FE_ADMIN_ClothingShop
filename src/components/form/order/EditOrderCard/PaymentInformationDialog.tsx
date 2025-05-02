"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/order";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { Image } from "@/components/Image";

interface OrderSuccessDialogProps {
  order: Order;
  onOpenChange?: (value: boolean) => void;
  open?: boolean;
}

export function PaymentInformationDialog({ order, open, onOpenChange }: OrderSuccessDialogProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(order.payment.paymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Payment Information</DialogTitle>
          <DialogDescription className="text-center capitalize">
            Order #{order.code} - {order.orderStatusHistory[0].status}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="border rounded-md p-4 space-y-4">
            <h3 className="font-medium">MoMo Payment QR Code</h3>
            {order.payment.paymentUrl && (
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                <TruncatedTextWithTooltip className="text-sm max-w-[350px]">
                  {order.payment.paymentUrl}
                </TruncatedTextWithTooltip>
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 px-2">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            )}
            <div className="flex flex-col items-center">
              <Image className="!w-64 !h-64 border-0" src={order.payment.qrCodeUrl} alt="QR Code" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            {order.payment.paymentUrl && (
              <Button className="flex-1" onClick={copyToClipboard}>
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            )}
            {/* <Button className="flex-1" variant={"outline"}>
              <Mail className="mr-2 h-4 w-4" />
              Send via Email
            </Button> */}
            <Button onClick={() => onOpenChange?.(false)} variant="outline" className="flex-1">
              Go Back
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
