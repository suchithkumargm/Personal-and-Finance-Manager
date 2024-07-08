import './Dialog.css';

const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="dialog-overlay">
            <div className="dialog bg-gradient">
                <button className="dialog-close" onClick={onClose}>✖</button>
                <div className="dialog-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dialog;
