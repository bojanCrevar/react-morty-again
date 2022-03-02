import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../model/storeModel";
import { notificationActions } from "../store/notification-slice";

export default function BootstrapToast() {
  const notification = useSelector((state: RootState) => state.notification);

  const dispatch = useDispatch();

  return (
    <>
      <ToastContainer position={"bottom-end"} className="-mt-4 p-5">
        <Toast
          onClose={() => dispatch(notificationActions.hideNotification())}
          show={notification.isShown}
          bg={notification.bgColor}
          delay={6000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">{notification.header}</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
