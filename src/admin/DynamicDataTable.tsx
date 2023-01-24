import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useState } from 'react';

type PropsType = {
    columns: GridColDef[],
    rows: object[],
    cellHandler: GridEventListener<"cellClick"> | undefined
}

export default function DynamicDataTable({ columns, rows, cellHandler }: PropsType) {
    const [pageSize, setPageSize] = useState(10)
    return (
        <DataGrid 
            columns={columns} 
            rows={rows}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onCellClick={cellHandler}
            style={{ cursor: 'pointer', border: '0px solid' }}
            pagination
            autoHeight       
        />
    )
}