//MUI
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
//icons
import CloseIcon from '@mui/icons-material/Close';


export default function MUIModal({ open, handleClose, children, maxWidth = "sm", ...props }) {
    return (
        <Dialog
            {...props}
            open={open}
            onClose={handleClose}
            maxWidth={maxWidth}
            fullWidth
        >
            <DialogContent className="relative">
                {children}
                <CloseIcon onClick={handleClose} className="modal-close-btn pointer" />
            </DialogContent>
        </Dialog>
    )
}