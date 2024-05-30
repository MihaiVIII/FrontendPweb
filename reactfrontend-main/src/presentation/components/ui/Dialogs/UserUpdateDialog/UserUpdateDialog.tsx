import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useUserUpdateDialogController } from "./UserUpdateDialog.controller";
import { UserUpdateForm } from "@presentation/components/forms/User/UserUpdateForm";
import { useIntl } from "react-intl";
import EditIcon from '@mui/icons-material/Edit';
/**
 * This component wraps the user add form into a modal dialog.
 */

export const UserUpdateDialog = (props:{Id:String}) => {
  const { open, close, isOpen } = useUserUpdateDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      <EditIcon fontSize='small' />
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.updateUser" })}
      </DialogTitle>
      <DialogContent>
        <UserUpdateForm onSubmit={close} uid={props.Id}/>
      </DialogContent>
    </Dialog>
  </div>
};