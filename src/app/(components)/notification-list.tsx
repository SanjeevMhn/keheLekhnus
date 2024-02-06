import { useDispatch, useSelector } from "react-redux";
import { NotificationType, removeNotification } from "../lib/notifications/notificationSlice";
import { useEffect } from "react";

const NotificationList = () => {
    const notifications:Array<NotificationType> = useSelector((state: any) => state.notifications);
    const dispatch = useDispatch();

    useEffect(() => {
        const timeoutIds:any = [];

        notifications.map((notification) => {
            const timeoutId = setTimeout(() => {
                dispatch(removeNotification(notification))
            },3000);
            timeoutIds.push(timeoutId)
        });

        return () => {
            timeoutIds.map((timeoutId:any) => clearTimeout(timeoutId) )
        }
    },[notifications,dispatch])


    return (
        <div className={`notification-list ${notifications.length > 0 ? 'p-[20px]' : ''}`}>
            {
                notifications.map((notification:NotificationType) => {
                    return (
                        <div key={notification.id} className={`notification ${notification.type}`}>{notification.message}</div>
                    )
                })
            }
        </div>
    )
}

export default NotificationList;