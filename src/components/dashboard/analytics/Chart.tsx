import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Title from './Title';

const groupTimeAndPriceOrder = (orders: any) => {
  const hash = Object.create(null);
  const grouped: any = [];

  orders.forEach((order: any) => {
    const key = order.node.createdOn.slice(11, 13);
    if (!hash[key]) {
      hash[key] = { time: key + ':00', price: 0.0 };
      grouped.push(hash[key]);
    }
    hash[key].price += order.node.totalPrice;
  });

  grouped.sort((a: any, b: any) => {
    return a.time.localeCompare(b.time);
  });

  return grouped;
};

export const Chart: React.FC<any> = (props: any) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={groupTimeAndPriceOrder(props.orders ?? [])}
          margin={{
            top: 16,
            right: 16,
            bottom: 16,
            left: 16,
          }}
        >
          <XAxis
            dataKey='time'
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              offset={0}
              position='bottom'
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
              value={'Time'}
            />
          </XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <Line
            type='monotone'
            dataKey='price'
            stroke={theme.palette.primary.main}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};