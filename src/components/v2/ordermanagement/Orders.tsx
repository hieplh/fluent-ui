import { useData } from 'mystique/hooks/useData';
import { Orders as OrdersDTO } from './OrdersDTO';
import { OrderLayout } from './OrdersLayout';

export interface Props {
  orders?: OrdersDTO;
}

export const Orders: React.FC<Props> = (props: Props) => {
  const variables = useData().variables;
  const context = useData().context;
  const loadingState = useData().loadingState;

  const page = variables.current.page ?? 0;
  const rowsPerPage = variables.current.orders_first ?? variables.current.orders_last ?? 10;
  const orders = context.data?.orders as OrdersDTO;

  const isDisablePreviousButton = page !== 0 ? false : true;
  let isDisableNextButton;
  if (orders.pageInfo.hasNextPage) {
    isDisableNextButton = false;
  } else {
    if (page === 0) {
      if (variables.current.orders_first) {
        isDisableNextButton = true;
      } else {
        isDisableNextButton = false;
      }
    } else {
      if (variables.current.orders_first) {
        isDisableNextButton = true;
      } else {
        isDisableNextButton = false;
      }
    }
  }

  const updateOrder = async () => {
    const authToken = JSON.parse(
      localStorage.getItem('mystique.auth.token') ?? '{}',
    );
    const response = await fetch(
      'https://MERKLE.sandbox.api.fluentretail.com/graphql',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: authToken.type + ' ' + authToken.value,
        },
        body: JSON.stringify({
          query:
            'mutation { updateOrder(input: {id: 6001421 totalPrice: 123456789.0 }) { id ref totalPrice } }',
        }),
      },
    )
      .then((res) => res.json())
      .catch((error) => console.error('Error', error));

    console.log('response', response);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    if (page < newPage) {
      // next page
      const cursor = orders.edges.slice(-1)[0].cursor;
      variables.setVariables({
        page: newPage,
        orders_first: rowsPerPage,
        orders_after: cursor,
        orders_before: null,
        orders_last: null,
      });
    } else {
      // previous page
      const cursor = orders.edges[0].cursor;
      variables.setVariables({
        page: newPage,
        orders_first: null,
        orders_after: null,
        orders_before: cursor,
        orders_last: rowsPerPage,
      });
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    variables.setVariables({
      page: 0,
      orders_first: event.target.value,
      orders_last: null,
      orders_before: null,
      orders_after: null,
    });
  };

  const submitFilter = (props: any) => {
    variables.setVariables({
      page: 0,
      orders_first: rowsPerPage,
      orders_last: null,
      orders_before: null,
      orders_after: null,
      orders_ref:
        props.filterRefs.length !== 0 ? props.filterRefs.split(/[\s]/) : null,
      orders_status:
        props.filterStatus !== undefined
          ? props.filterStatus.length !== 0
            ? props.filterStatus
            : null
          : null,
      orders_type:
        props.filterType !== undefined
          ? props.filterType.length !== 0
            ? props.filterType
            : null
          : null,
    });
  };

  const resetFilter = () => {
    variables.setVariables({
      page: 0,
      orders_first: rowsPerPage,
      orders_last: null,
      orders_before: null,
      orders_after: null,
      orders_ref: null,
      orders_status: null,
      orders_type: null,
    });
  };

  return (
    <OrderLayout
      edges={orders.edges}
      pageInfo={orders.pageInfo}
      page={page}
      rowsPerPage={rowsPerPage}
      disableNextButton={isDisableNextButton}
      disablePreviousButton={isDisablePreviousButton}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      filterRefs={variables.current.filterRefs}
      filterStatus={variables.current.filterStatus}
      filterType={variables.current.filterType}
      resetFilter={resetFilter}
      submitFilter={submitFilter}
      updateOrder={updateOrder}
    />
  );
};
