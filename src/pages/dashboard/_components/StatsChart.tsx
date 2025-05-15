"use client";

import { SALE_VALUES, SaleReport } from "@/types/report";
import moment from "moment-timezone";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

export function StatsChart({ type, sales }: { type: SALE_VALUES; sales: SaleReport[] }) {
  let unit = "hours";
  let format = "DD/MM/YYYY H A";
  switch (type) {
    case SALE_VALUES.LAST_24_HOURS:
      unit = "hours";
      format = "DD/MM/YYYY H A";
      break;
    case SALE_VALUES.LAST_WEEK:
      unit = "days";
      format = "DD/MM/YYYY";
      break;
    case SALE_VALUES.LAST_MONTH:
      unit = "weeks";
      format = "DD/MM/YYYY";
      break;
    case SALE_VALUES.LAST_6_MONTH:
      unit = "months";
      format = "DD/MM/YYYY";
      break;
    case SALE_VALUES.YEAR:
      unit = "months";
      format = "DD/MM/YYYY";
      break;
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sales.map((item) => ({ value: item.sales, date: item.startDate }))}>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Sales</span>
                        <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground capitalize">{unit}</span>
                        <span className="font-bold">
                          {moment(payload[0].payload.date).tz("Asia/Ho_Chi_Minh").format(format)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line type="monotone" dataKey="value" stroke="#ff6b00" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
