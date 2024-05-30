import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAddrUpdateDialogController } from "./AddrUpdateDialog.controller";
import { AddrUpdateForm } from "@presentation/components/forms/OwnAddr/AddrUpdateForm";
import { useIntl } from "react-intl";
import EditIcon from '@mui/icons-material/Edit';

/**
 * This component wraps the user add form into a modal dialog.
 */
export const AddrUpdateDialog = (props:{pid:String}) => {
  const { open, close, isOpen } = useAddrUpdateDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      <EditIcon fontSize='small' />
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.updateaddr" })}
      </DialogTitle>
      <DialogContent>
        <AddrUpdateForm onSubmit={close} pid={props.pid}/>
      </DialogContent>
    </Dialog>
  </div>
};