import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', visits: 15000, uniqueVisitors: 12000, bounceRate: 8000 },
  { month: 'Feb', visits: 30000, uniqueVisitors: 25000, bounceRate: 15000 },
  { month: 'Mar', visits: 25000, uniqueVisitors: 20000, bounceRate: 12000 },
  { month: 'Apr', visits: 20000, uniqueVisitors: 15000, bounceRate: 10000 },
  { month: 'May', visits: 28000, uniqueVisitors: 22000, bounceRate: 14000 },
  { month: 'Jun', visits: 22000, uniqueVisitors: 18000, bounceRate: 11000 },
];

export function TrafficChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="visits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="uniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="bounceRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#visits)"
              />
              <Area
                type="monotone"
                dataKey="uniqueVisitors"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#uniqueVisitors)"
              />
              <Area
                type="monotone"
                dataKey="bounceRate"
                stroke="#ffc658"
                fillOpacity={1}
                fill="url(#bounceRate)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}