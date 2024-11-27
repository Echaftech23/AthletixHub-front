import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { trafficData } from '@/data/traffic-data';

export function TrafficChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
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