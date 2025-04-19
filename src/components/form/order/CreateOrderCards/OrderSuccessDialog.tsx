"use client";

import { useState } from "react";
import { Check, Copy, Mail, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/order";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";

interface OrderSuccessDialogProps {
  order: Order;
  onOpenChange?: (value: boolean) => void;
  goTo?: () => void;
  open?: boolean;
}

export function OrderSuccessDialog({ order, open, onOpenChange, goTo }: OrderSuccessDialogProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(order.payment.paymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Order Created Successfully!</DialogTitle>
          <DialogDescription className="text-center">
            The order has been created and is waiting for payment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Order Code:</span>
              <span className="font-medium">{order.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="font-medium text-amber-600 capitalize">
                {order.orderStatusHistory[order.orderStatusHistory.length - 1].status}
              </span>
            </div>
          </div>

          <div className="border rounded-md p-4 space-y-4">
            <h3 className="font-medium">MoMo Payment Link</h3>
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
              <TruncatedTextWithTooltip className="text-sm max-w-[350px]">
                {order.payment.paymentUrl}
              </TruncatedTextWithTooltip>
              <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 px-2">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex justify-center">
              <div className="border p-4 rounded-md bg-white">
                <QRCodeSVG className="h-32 w-32" value={order.payment.qrCodeUrl} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1" onClick={copyToClipboard}>
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="mr-2 h-4 w-4" />
              Send via Email
            </Button>
            <Button variant="outline" className="flex-1" onClick={goTo}>
              Goto details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
