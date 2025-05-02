"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/order";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { Image } from "@/components/Image";
import { Link } from "react-router-dom";

interface OrderSuccessDialogProps {
  order: Order;
  onOpenChange?: (value: boolean) => void;
  open?: boolean;
}

export function OrderSuccessDialog({ order, open, onOpenChange }: OrderSuccessDialogProps) {
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
              <span className="font-medium text-amber-600 capitalize">{order.orderStatusHistory[0].status}</span>
            </div>
          </div>

          <div className="border rounded-md p-4 space-y-4">
            <h3 className="font-medium">MoMo Payment Link</h3>
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

            <div className="flex justify-center flex-col items-center">
              <Image src={order.payment.qrCodeUrl} alt="QR CODE" className="border-0" size={256} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1" onClick={copyToClipboard}>
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            {/* <Button variant="outline" className="flex-1">
              <Mail className="mr-2 h-4 w-4" />
              Send via Email
            </Button> */}
            <Link to={"/orders/" + order.code}>
              <Button variant="outline" className="flex-1">
                Goto details
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
