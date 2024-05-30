import { useIntl } from "react-intl";
import { add, create, isUndefined, remove } from "lodash";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,Box,Button } from "@mui/material";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { useProdTableController,useCartController} from "./ProductsTable.controller";
import { ItemDTO } from "@infrastructure/apis/client";
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemAddDialog } from "../../Dialogs/ItemAddDialog";
import { useAppSelector } from "@application/store";
import { ItemUpdateDialog } from "../../Dialogs/ItemUpdateDialog";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from 'react-router-dom';
import { AppRoute } from 'routes';
import { format } from "date-fns";
/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof ItemDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "price", name: formatMessage({ id: "globals.price" }) },
        { key: "quantity", name: formatMessage({ id: "globals.quantity" }) },
    ]
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: ItemDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return { key, value } })
            }
        });

/**
 * Creates the user table.
 */
export const ProductsTable = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove,userData,combinedData } = useProdTableController(); // Use the controller hook.
    
    const rowValues = getRowValues(pagedData?.data, orderMap); // Get the row values.
    
    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        <ItemAddDialog /> {/* Add the button to open the user add modal. */}
        {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
            <TablePagination // Use the table pagination to add the navigation between the table pages.
                component="div"
                count={pagedData.totalCount} // Set the entry count returned from the backend.
                page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0} // Set the current page you are on.
                onPageChange={handleChangePage} // Set the callback to change the current page.
                rowsPerPage={pagedData.pageSize} // Set the current page size.
                onRowsPerPageChange={handleChangePageSize} // Set the callback to change the current page size. 
                labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                labelDisplayedRows={labelDisplay}
                showFirstButton
                showLastButton
            />}

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>) // Add the table header.
                        }
                        <TableCell>{formatMessage({ id: "globals.producer" })}</TableCell>
                        <TableCell>{formatMessage({ id: "labels.actions" })}</TableCell> {/* Add additional header columns if needed. */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rowValues?.map(({ data, entry }, rowIndex) => <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{keyValue.value}</TableCell>)} {/* Add the row values. */}
                            <TableCell> {/* Add other cells like action buttons. */}
                                {combinedData?.find(x=>x.id == entry.id)?.producerName}
                            </TableCell>
                            <TableCell> {/* Add other cells like action buttons. */}
                                <ItemUpdateDialog pid={String(entry.id)} uid={String(entry.userId)}/>
                            </TableCell>
                            <TableCell> {/* Add other cells like action buttons. */}
                                <IconButton color="error" onClick={() => remove(entry.id || '')}>
                                    <DeleteIcon color="error" fontSize='small' />
                                </IconButton>
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer >
}

export const ProductsTable2 = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove,userData,combinedData } = useProdTableController(); // Use the controller hook.
    
    const rowValues = getRowValues(pagedData?.data, orderMap); // Get the row values.
    
    const {pagedData:data2,Add} = useCartController();

    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        <>Cart: {formatMessage({ id: "labels.numberItems" })}: {data2?.count}, Total RON: {data2?.price}</>
        {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
            <TablePagination // Use the table pagination to add the navigation between the table pages.
                component="div"
                count={pagedData.totalCount} // Set the entry count returned from the backend.
                page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0} // Set the current page you are on.
                onPageChange={handleChangePage} // Set the callback to change the current page.
                rowsPerPage={pagedData.pageSize} // Set the current page size.
                onRowsPerPageChange={handleChangePageSize} // Set the callback to change the current page size. 
                labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                labelDisplayedRows={labelDisplay}
                showFirstButton
                showLastButton
            />}

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>) // Add the table header.
                        }
                        <TableCell>{formatMessage({ id: "globals.producer" })}</TableCell>
                        <TableCell>{formatMessage({ id: "labels.actions" })}</TableCell> {/* Add additional header columns if needed. */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rowValues?.map(({ data, entry }, rowIndex) => <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{keyValue.value}</TableCell>)} {/* Add the row values. */}
                            <TableCell> {/* Add other cells like action buttons. */}
                                {combinedData?.find(x=>x.id == entry.id)?.producerName}
                            </TableCell>
                            <TableCell> {/* Add other cells like action buttons. */}
                                <IconButton color="info" onClick={() => Add(entry)}>
                                    <AddShoppingCartIcon fontSize='medium' />
                                </IconButton>
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer >
}

export const ProductsTable3 = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const { handleChangePage, handleChangePageSize, pagedData:data2, isError, isLoading, tryReload, labelDisplay, Remove,combinedData,Add,ItemsData } = useCartController(); // Use the controller hook.
    
    const rowValues = getRowValues(ItemsData?.data, orderMap); // Get the row values.
    
    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        <>Cart: {formatMessage({ id: "labels.numberItems" })}: {data2?.count}, Total RON: {data2?.price}</>
        {!isUndefined(ItemsData) && !isUndefined(ItemsData?.totalCount) && !isUndefined(ItemsData?.page) && !isUndefined(ItemsData?.pageSize) &&
            <TablePagination // Use the table pagination to add the navigation between the table pages.
                component="div"
                count={ItemsData.totalCount} // Set the entry count returned from the backend.
                page={ItemsData.totalCount !== 0 ? ItemsData.page - 1 : 0} // Set the current page you are on.
                onPageChange={handleChangePage} // Set the callback to change the current page.
                rowsPerPage={ItemsData.pageSize} // Set the current page size.
                onRowsPerPageChange={handleChangePageSize} // Set the callback to change the current page size. 
                labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                labelDisplayedRows={labelDisplay}
                showFirstButton
                showLastButton
            />}

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>) // Add the table header.
                        }
                        <TableCell>{formatMessage({ id: "globals.producer" })}</TableCell>
                        <TableCell>{formatMessage({ id: "labels.actions" })}</TableCell> {/* Add additional header columns if needed. */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rowValues?.map(({ data, entry }, rowIndex) => <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{keyValue.value}</TableCell>)} {/* Add the row values. */}
                            <TableCell> {/* Add other cells like action buttons. */}
                                {combinedData?.find(x=>x.id == entry.id)?.producerName}
                            </TableCell>
                            <TableCell> {/* Add other cells like action buttons. */}
                                <IconButton color="info" onClick={() => Add(entry)}>
                                    <AddShoppingCartIcon fontSize='medium' />
                                </IconButton>
                            </TableCell>
                            <TableCell> {/* Add other cells like action buttons. */}
                                <IconButton color="error" onClick={() => Remove(entry)}>
                                    <RemoveShoppingCartIcon fontSize='medium' />
                                </IconButton>
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <Button color="inherit">  {/* If the user is not logged in show a button that redirects to the login page. */}
                    <Link style={{ color: 'white',backgroundColor:'Blue' }} to={AppRoute.Addreses}>
                        {formatMessage({ id: "globals.Checkout" })}
                    </Link>
                </Button>
            </Box>
    </DataLoadingContainer >
}