import { useContext } from "react";
import { DialogContext } from "./context";
import "./Dialog.css";

export function Dialog(props) {
  const { onClose = () => {}, children, staticBackdrop = false } = props;

  return (
    <DialogContext.Provider value={{ inside: true }}>
      <div>
        {props.active ? (
          <div
            className="dialog-scrim"
            onClick={staticBackdrop ? undefined : onClose}
          ></div>
        ) : undefined}
        {props.active ? (
          <div className="dialog-container items-center" role="dialog">
            {children}
          </div>
        ) : undefined}
      </div>
    </DialogContext.Provider>
  );
}

function DialogTitle(props) {
  const contextValue = useContext(DialogContext);
  if (!contextValue.inside)
    throw new Error(
      "<Dialog.Title> should only be used inside <Dialog> component"
    );

  return (
    <h1
      className={`text-2xl font-normal mb-4 ${
        props.centerTitle ? "text-center" : ""
      }`}
    >
      {props.children}
    </h1>
  );
}

function DialogSubtitle(props) {
  const contextValue = useContext(DialogContext);
  if (!contextValue.inside) {
    throw new Error(
      "<Dialog.Body> should only be used inside <Dialog> component"
    );
  }

  // eslint-disable-next-line react/prop-types
  return <p className="font-normal text-[14px] mb-6">{props.children}</p>;
}
function DialogBody(props) {
  const context = useContext(DialogContext);
  if (!context || !context.inside) {
    throw new Error("<Dialog.Body> can only be used inside <Dialog>");
  }
  return <>{props.children}</>;
}

function DialogActions(props) {
  const contextValue = useContext(DialogContext);
  if (!contextValue.inside) {
    throw new Error(
      "<Dialog.Body> should only be used inside <Dialog> component"
    );
  }

  return <div className="w-fit ml-auto space-x-2 flex">{props.children}</div>;
}

Dialog.Title = DialogTitle;
Dialog.SupportingText = DialogSubtitle;
Dialog.Actions = DialogActions;
Dialog.Body = DialogBody;
