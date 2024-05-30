import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useItemAddDialogController } from "./ItemAddDialog.controller";
import { ItemAddForm } from "@presentation/components/forms/Item/ItemAddForm";
import { useIntl } from "react-intl";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const ItemAddDialog = () => {
  const { open, close, isOpen } = useItemAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addItem" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addItem" })}
      </DialogTitle>
      <DialogContent>
        <ItemAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};