import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getReceiver } from "../../apis/transactions";
import { SingleReceiverProps } from "./interface";
import styles from "./singlereceiver.module.scss";

const SingleReceiver: React.FC<SingleReceiverProps> = (props) => {
  const { date: oldDate, name, phoneNo, img } = props.element;
  // client avatar alternatve
  const [clientAvatarAlt, setClientAvatarAlt] = useState<string>();
  const dispatch = useDispatch();
  // state
  const [newDate, setNewDate] = useState<{ date: string }>({
    date: moment(oldDate!).format("YYYY-MMM-DD"),
  });
  // send money
  const sendMoney = () => {
    dispatch(getReceiver(phoneNo as unknown as string));
  };
  // when component did mount
  useEffect(() => {
    setClientAvatarAlt(name[0].toUpperCase());
  }, []);
  return (
    <div className={styles.singleReceiver}>
      {/* receiver img */}
      <span className={styles.img}>
        {Boolean(img) ? <img src={img} alt="" /> : <p>{clientAvatarAlt}</p>}
      </span>
      {/* receiver name and date*/}
      <span className={styles.details}>
        <p className={styles.name}>{name}</p>
        <p className={styles.date}>last paid on {newDate.date}</p>
      </span>
      {/* send again button */}
      <button className={styles.sendBtn} onClick={sendMoney}>
        send
      </button>
    </div>
  );
};

export default SingleReceiver;
