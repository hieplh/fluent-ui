import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Edge } from 'components/order_management/orders/v2/OrdersDTO';
import { useEnv } from 'mystique/hooks/useEnv';
import * as React from 'react';
import { GetCurrentDay, GetFirstDayInCurrentMonth, GetPreviousDayFromCurrentDay } from '../../../utils/DateTimeUtils';
import { OrderContent } from '../../order_management/orders/v2/OrdersLayout';
import { Chart } from './Chart';
import { Deposits } from './Deposits';
import Title from './Title';

const defaultTheme = createTheme();

const ordersQuery = `
  query (
    $startDate: DateTime
    $after: String
  ) {
    orders(createdOn: { from: $startDate }, first: 100, after: $after) {
      edges {
        node {
          id
          ref
          type
          status
          totalPrice
          createdOn
          customer {
            firstName
            lastName
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const Analytic: React.FC<any> = (props: any) => {
  const [ordersToday, setOrdersToday] = React.useState([] as Edge[]);
  const [ordersWeek, setOrdersWeek] = React.useState([] as Edge[]);
  const [ordersMonth, setOrdersMonth] = React.useState([] as Edge[]);
  const api = useEnv().api;

  const authToken = JSON.parse(
    localStorage.getItem('mystique.auth.token') ?? '{}',
  );
  const query = async (date: string, after: string | null, setOrders: { (value: React.SetStateAction<Edge[]>): void; (arg0: (value: any) => any): void; }) => {
    await fetch(
      api + '/graphql',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: authToken.type + ' ' + authToken.value,
        },
        body: JSON.stringify({
          query: ordersQuery,
          variables: {startDate: date, after: after},
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        const pageInfo = data.data.orders.pageInfo;
        const responseOrders = data.data.orders.edges;
        setOrders((value: any) => value.concat(responseOrders));
        if (pageInfo.hasNextPage) {  
          query(date, responseOrders.slice(-1)[0].cursor, setOrders);
        }
      })
      .catch((error) => console.error('Error', error));
  };

  React.useEffect(() => {
    query(GetCurrentDay({options: {}}), null, setOrdersToday);                                  // today
    query(GetPreviousDayFromCurrentDay({previousDay: 13, options: {}}), null, setOrdersWeek);   // 14 days - include current day
    query(GetFirstDayInCurrentMonth({options: {}}), null, setOrdersMonth);                      // 1 month - start from first day of month
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box width={'100%'} sx={{ display: 'flex' }}>
        <Box
          // component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
          }}
        >
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart - Orders Today */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 260,
                  }}
                >
                  <Chart orders={ordersToday} />
                </Paper>
              </Grid>
              {/* Recent Deposits - Orders Month */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 260,
                  }}
                >
                  <Deposits orders={ordersMonth ?? []} />
                </Paper>
              </Grid>
              {/* Recent Orders - Orders Week */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Title>{GetPreviousDayFromCurrentDay({previousDay: 13})} - {GetCurrentDay()}</Title>
                  <OrderContent orders={{edges: ordersWeek} ?? {}} hideFooter={false} />
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};