import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useItemUpdateDialogController } from "./ItemUpdateDialog.controller";
import { ItemUpdateForm } from "@presentation/components/forms/Item/ItemUpdateForm";
import { useIntl } from "react-intl";
import EditIcon from '@mui/icons-material/Edit';

/**
 * This component wraps the user add form into a modal dialog.
 */
export const ItemUpdateDialog = (props:{pid:String,uid:String}) => {
  const { open, close, isOpen } = useItemUpdateDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      <EditIcon fontSize='small' />
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.updateItem" })}
      </DialogTitle>
      <DialogContent>
        <ItemUpdateForm onSubmit={close} pid={props.pid} uid={props.uid}/>
      </DialogContent>
    </Dialog>
  </div>
};