import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAddrAddDialogController } from "./AddrAddDialog.controller";
import { AddrAddForm } from "@presentation/components/forms/OwnAddr/AddrAddForm";
import { useIntl } from "react-intl";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const AddrAddDialog = () => {
  const { open, close, isOpen } = useAddrAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addaddr" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addaddr" })}
      </DialogTitle>
      <DialogContent>
        <AddrAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};