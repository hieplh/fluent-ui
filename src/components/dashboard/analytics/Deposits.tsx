import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as LocaleCurrency from 'locale-currency';
import { useI18n } from 'mystique/hooks/useI18n';
import * as React from 'react';
import { currencyFormat } from '../../../utils/NumberUtils';
import Title from './Title';
import { GetFirstDayInCurrentMonth, GetLastDayInCurrentMonth } from '../../../utils/DateTimeUtils';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const sumUpPriceOfMonth = (orders: any, locale = 'en-US') => {
  let obj = Object.create({});

  orders.forEach((order: any) => {
    if (Object.keys(obj).length === 0) {
      obj = {
        from: GetFirstDayInCurrentMonth({locale: locale}),
        to: GetLastDayInCurrentMonth({locale: locale}),
        totalPrice: 0.0,
      };
    }

    obj.totalPrice += order.node?.totalPrice ?? 0.0;
  });

  return obj;
};

export const Deposits: React.FC<any> = (props: any) => {
  const locale = useI18n().language.current ?? 'en-US';
  const currency = LocaleCurrency.getCurrency(locale);
  const data = sumUpPriceOfMonth(props.orders, locale);
  
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component='p' variant='h4'>
        {currencyFormat(data.totalPrice, locale, currency)}
      </Typography>
      <Typography color='text.secondary' sx={{ flex: 1 }}>
        from {data.from}
        <br/>
        to &nbsp; &nbsp; {data.to}
      </Typography>
      <div>
        <Link color='primary' href='#' onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
};
