import React, { createContext, useState } from 'react';

export const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogs, setDialogs] = useState({});
    const [onDialogClose, setOnDialogClose] = useState(null);

    const openDialog = (dialogName, onCloseCallback) => {
        setIsDialogOpen(true);
        setDialogs((prevDialogs) => ({
            ...prevDialogs,
            [dialogName]: true,
        }));
        if (onCloseCallback) setOnDialogClose(() => onCloseCallback);
    };

    const closeDialog = (dialogName) => {
        setIsDialogOpen(false);
        setDialogs((prevDialogs) => ({
            ...prevDialogs,
            [dialogName]: false,
        }));
        if (onDialogClose) onDialogClose();
    };

    return (
        <DialogContext.Provider value={{ dialogs, openDialog, closeDialog, isDialogOpen }}>
            {children}
        </DialogContext.Provider>
    );
};
