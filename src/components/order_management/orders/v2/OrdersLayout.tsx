import { Button } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import {
  Autocomplete,
  Box,
  Collapse,
  Fab,
  Stack,
  TablePagination,
  TextField,
} from '@mui/material';
import { darken, lighten, styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { currencyFormat } from '../../../../utils/NumberUtils';
import * as LocaleCurrency from 'locale-currency';
import moment from 'moment';
import { useI18n } from 'mystique/hooks/useI18n';
import * as React from 'react';

const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

const columns = (props?: any): GridColDef[] => {
  return [
    {
      field: 'Id',
      hideable: false,
      flex: 1,
      valueGetter: (params) => params.row.node?.id ?? '',
    },
    {
      field: 'ref',
      headerName: 'Ref',
      flex: 1,
      valueGetter: (params) => params.row.node?.ref ?? '',
    },
    {
      field: 'Customer',
      headerName: 'Customer',
      flex: 1,
      valueGetter: (params) =>
        params.row.node
          ? params.row.node.customer.firstName +
            ' ' +
            params.row.node.customer.lastName
          : '',
    },
    {
      field: 'type',
      headerName: 'Type',
      headerClassName: 'align: center',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.node?.type ?? '',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.node?.status ?? '',
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      flex: 1,
      type: 'number',
      valueGetter: (params) => {
        const locale = props?.locale ?? 'sv';
        const currency = props?.currency ?? 'USD';
        return currencyFormat(params.row.node?.totalPrice ?? -1, locale, currency);
      },
    },
    {
      field: 'createdOn',
      headerName: 'Created On',
      flex: 2,
      valueGetter: (params) =>
        params.row.node
          ? Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(new Date(params.row.node.createdOn)) +
            ' (' +
            moment(params.row.node.createdOn).fromNow() +
            ')'
          : '',
    },
  ];
};

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width='240'
        height='200'
        viewBox='0 0 184 152'
        aria-hidden
        focusable='false'
      >
        <g fill='none' fillRule='evenodd'>
          <g transform='translate(24 31.67)'>
            <ellipse
              className='ant-empty-img-5'
              cx='67.797'
              cy='106.89'
              rx='67.797'
              ry='12.668'
            />
            <path
              className='ant-empty-img-1'
              d='M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z'
            />
            <path
              className='ant-empty-img-2'
              d='M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'
            />
            <path
              className='ant-empty-img-3'
              d='M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z'
            />
          </g>
          <path
            className='ant-empty-img-3'
            d='M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z'
          />
          <g className='ant-empty-img-4' transform='translate(149.65 15.383)'>
            <ellipse cx='20.654' cy='3.167' rx='2.849' ry='2.815' />
            <path d='M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z' />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No records available</Box>
    </StyledGridOverlay>
  );
};

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .super-app-theme--CREATED': {
    backgroundColor: getBackgroundColor(
      theme.palette.info.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--RECEIVED': {
    backgroundColor: getBackgroundColor(
      theme.palette.success.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.success.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--BOOKED': {
    backgroundColor: getBackgroundColor(
      theme.palette.warning.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--COMPLETE': {
    backgroundColor: getBackgroundColor(
      theme.palette.error.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode,
        ),
      },
    },
  },
}));

export const Pagination: React.FC<{
  page: number;
  rowsPerPage: number;
  disableNextButton: boolean;
  disablePreviousButton: boolean;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  page,
  rowsPerPage = 10,
  disableNextButton = false,
  disablePreviousButton = true,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 50, 100]}
      component='div'
      count={-1}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      slotProps={{
        actions: {
          nextButton: { disabled: disableNextButton },
          previousButton: { disabled: disablePreviousButton },
        },
      }}
      sx={{ marginBlock: 'auto' }}
    />
  );
};

export const Filter: React.FC<{
  filterRefs: string;
  filterStatus: string[];
  filterType: string[];
  submitFilter: (props: any) => void;
  resetFilter: () => void;
}> = ({
  filterRefs = '',
  filterStatus = [],
  filterType = [],
  submitFilter,
  resetFilter,
}) => {
  const [filter, setFilter] = React.useState(false);
  const refs = React.useRef(filterRefs);
  const [status, setStatus] = React.useState(filterStatus);
  const [type, setType] = React.useState(filterType);
  return (
    <Stack spacing={1} marginBlock={'1em'} marginLeft={'1em'}>
      <Fab
        variant='extended'
        size='small'
        style={{
          fontSize: 'smaller',
          marginBlock: 'auto',
          paddingLeft: '0.5em',
          paddingRight: '1em',
          color: '#00A9E0',
          width: 'fit-content',
          borderRadius: '1.5em',
          boxShadow: 'none',
          textTransform: 'none',
          zIndex: 'auto',
        }}
        onClick={() => setFilter(!filter)}
      >
        <AddIcon />
        Add a filter
      </Fab>
      <Collapse in={filter}>
        <Stack bgcolor={'inherit'} spacing={1}>
          <TextField
            label='Filter Refs'
            placeholder='Ref'
            helperText='Refs can be separated by whitespace or newline'
            variant='filled'
            size='small'
            multiline
            maxRows={5}
            inputRef={refs}
          />
          <Autocomplete
            multiple
            blurOnSelect
            filterSelectedOptions
            id='tags-status'
            size='small'
            options={['CREATED', 'RECEIVED', 'BOOKED', 'COMPLETE']}
            defaultValue={status}
            value={status}
            getOptionLabel={(option) => option}
            onChange={(_, v) => setStatus(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Filter Status'
                placeholder='Status'
                variant='filled'
                size='small'
              />
            )}
          />
          <Autocomplete
            multiple
            blurOnSelect
            filterSelectedOptions
            id='tags-type'
            size='small'
            options={['CC', 'HD']}
            defaultValue={type}
            value={type}
            getOptionLabel={(option) => option}
            onChange={(_, v) => setType(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Filter Type'
                placeholder='Type'
                variant='filled'
                size='small'
              />
            )}
          />
          <Stack direction={'row'} justifyContent='end' spacing={1}>
            <Button
              variant='contained'
              onClick={() => {
                refs.current.value = '';
                setStatus([]);
                setType([]);
                resetFilter();
              }}
            >
              Reset
            </Button>
            <Button
              variant='contained'
              onClick={() =>
                submitFilter({
                  filterRefs: refs.current.value,
                  filterStatus: status,
                  filterType: type,
                })
              }
            >
              Apply
            </Button>
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
};

export const OrderContent: React.FC<any> = (props: any) => {
  const locale = useI18n().language.current ?? 'sv';
  const currency = LocaleCurrency.getCurrency(locale);
  return (
    <StyledDataGrid
      getRowId={(row) => row.node?.id ?? Math.random() * 1000}
      rows={props.orders.edges ?? []}
      columns={columns({locale, currency})}
      slots={{
        toolbar: GridToolbar,
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay,
      }}
      autoHeight
      rowSelection={false}
      hideFooter={props.hideFooter ?? true}
      ignoreDiacritics
      sx={{ '--DataGrid-overlayHeight': '300px' }}
      getRowClassName={(params) =>
        `super-app-theme--${params.row.node?.status ?? ''}`
      }
    />
  );
};
