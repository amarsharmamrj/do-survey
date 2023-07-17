import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './DataGrid.css'

export default function NewDataGrid(props: any) {
  return (
    <>
      {props.autoHeight ? (
        <DataGrid
          autoHeight
          getRowId={(row: any) => row._id}
          rows={props.rows}
          columns={props.columns}
          components={{ Toolbar: GridToolbar }}
        />
      ) : (
        <div style={{ height: '800px' }}>
          <DataGrid
            getRowId={(row: any) => row._id}
            rows={props.rows}
            columns={props.columns}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      )}
    </>
  );
}
