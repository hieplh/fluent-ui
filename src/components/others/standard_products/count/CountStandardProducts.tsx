import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useAuth } from 'mystique/hooks/useAuth';
import { useEnv } from 'mystique/hooks/useEnv';
import { useEffect, useState } from 'react';

const standardProductQuery = `
query getMasterProducts (
  $catalogue: String!
  $status: [String]
  $cursor: String
) {
  standardProducts (
      catalogue: {
          ref: $catalogue
      }
      status: $status
      first: 500
      after: $cursor
  ) {
      edges {
          node {
              id
          }
          cursor
      }
      pageInfo {
          hasNextPage
      }
  }
}
`;

const productCatalogueQuery = `
query (
  $cursor: String
) {
  productCatalogues (
    first: 500
    after: $cursor
  ) {
      edges {
          node {
              name
              ref
              status
              retailerRefs
          }
      }
      pageInfo {
        hasNextPage
      }
  }
}
`;

const fetchProductCatalogues = async (
  url: string,
  token: string,
  cursor: string | null,
  setProductCatalogues: { (value: React.SetStateAction<[]>): void; (arg0: (value: any) => any): void; },
) => {
  await fetch(
    url,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        query: productCatalogueQuery,
        variables: {cursor: cursor},
      }),
    },
  )
    .then(res => res.json())
    .then(data => {
      if (Object.keys(data).length !== 0) {
        const productCatalogues = data.data.productCatalogues.edges;
        const pageInfo = data.data.productCatalogues.pageInfo;
        setProductCatalogues(value => value.concat(productCatalogues.map((edge: any) => ({name: edge.node.name, ref: edge.node.ref}))));
    
        if (pageInfo.hasNextPage) {
          fetchProductCatalogues(url, token, data.slice(-1)[0].cursor, setProductCatalogues);
        }
      }
    })
    .catch(error => console.log('Fetch StandardProduct | Error | ', error));
};

const countProduct = async (
  url: string,
  token: string,
  count: number,
  payload: {catalogue: string, status: string, cursor: string | null},
  callback: { (value: React.SetStateAction<number>): void; (arg0: (value: any) => any): void; },
) => {
  await fetch(
    url,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        query: standardProductQuery,
        variables: payload,
      }),
    },
  )
    .then(res => res.json())
    .then(data => {
      if (Object.keys(data).length !== 0) {
        const product = data.data.standardProducts.edges;
        const pageInfo = data.data.standardProducts.pageInfo;
        count += product.length;
    
        if (pageInfo.hasNextPage) {
          payload.cursor = data.slice(-1)[0].cursor;
          countProduct(url, token, count, payload, callback);
        } else {
          callback(count);
        }
      }
    })
    .catch(error => console.log('Fetch StandardProduct | Error | ', error));
};

export const CountStandardProduct: React.FC<any> = (props: any) => {
  const auth = useAuth();
  const contextId = auth.context.current.contextId;
  const api = useEnv().api + '/graphql';
  const authToken = JSON.parse(
    localStorage.getItem('mystique.auth.token') ?? '{}',
  );

  const token = authToken.type + ' ' + authToken.value;
  const [countCreatedStandardProduct, setCountCreatedStandardProduct] = useState(0);
  const [countActiveStandardProduct, setCountActiveStandardProduct] = useState(0);
  const [countInactiveStandardProduct, setCountInactiveStandardProduct] = useState(0);
  const [curValueSelect, setCurValueSelect] = useState('');
  const [catalogues, setCatalogues] = useState([] as any);

  useEffect(() => {
    fetchProductCatalogues(api, token, null, setCatalogues);
  }, []);

  useEffect(() => {
    if (catalogues.length !== 0) {
      const catalogue = catalogues.find((e: any) => e.ref.endsWith(contextId)) ?? catalogues[0];
      setCurValueSelect(catalogue.ref);
    }
  }, [catalogues]);

  useEffect(() => {
    countProduct(api, token, 0, {catalogue: curValueSelect, status: 'CREATED', cursor: null}, setCountCreatedStandardProduct);
    countProduct(api, token, 0, {catalogue: curValueSelect, status: 'ACTIVE', cursor: null}, setCountActiveStandardProduct);
    countProduct(api, token, 0, {catalogue: curValueSelect, status: 'INACTIVE', cursor: null}, setCountInactiveStandardProduct);
  }, [curValueSelect]);

  return (
    <Grid width={'49%'} m={1}>
      <Card>
        <CardHeader
          title={
            <div style={{ textTransform: 'none' }}>
              Count Standard Product
              <FormControl sx={{ ml: 3, minWidth: 150 }} size='small'>
                <InputLabel id='standard-product-select'>Catalogue</InputLabel>
                <Select
                  labelId='standard-product-select'
                  label='Catalogue'
                  value={curValueSelect}
                  autoWidth
                  onChange={(v) => setCurValueSelect(v.target.value)}
                >
                  {catalogues.map((e: any) => (
                    <MenuItem key={e.ref} value={e.ref}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          }
        />
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item md={3} borderRight={`1px solid #909294`}>
                  <Typography variant='h6'>Created</Typography>
                  <Typography variant='body1'>
                    {countCreatedStandardProduct}
                  </Typography>
                </Grid>
                <Grid item md={3} borderRight={`1px solid #909294`}>
                  <Typography variant='h6'>Active</Typography>
                  <Typography variant='body1'>
                    {countActiveStandardProduct}
                  </Typography>
                </Grid>
                <Grid item md={3} borderRight={`1px solid #909294`}>
                  <Typography variant='h6'>InActive</Typography>
                  <Typography variant='body1'>
                    {countInactiveStandardProduct}
                  </Typography>
                </Grid>
                <Grid item md={3} paddingTop={0}>
                  <Typography variant='h6'>Total</Typography>
                  <Typography variant='body1'>
                    {countCreatedStandardProduct +
                      countActiveStandardProduct +
                      countInactiveStandardProduct}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'right' }}>
          <Button
            variant='contained'
            onClick={() => {
              countProduct(api, token, 0, { catalogue: curValueSelect, status: 'CREATED', cursor: null }, setCountCreatedStandardProduct);
              countProduct(api, token, 0, { catalogue: curValueSelect, status: 'ACTIVE', cursor: null }, setCountActiveStandardProduct);
              countProduct(api, token, 0, { catalogue: curValueSelect, status: 'INACTIVE', cursor: null }, setCountInactiveStandardProduct);
            }}
          >
            Count
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};