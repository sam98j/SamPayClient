import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getReceiver } from "../../apis/transactions";
import { SingleReceiverProps } from "./interface";
import styles from "./singlereceiver.module.scss";

const SingleReceiver: React.FC<SingleReceiverProps> = (props) => {
  const { date: oldDate, name, phoneNo, img, email } = props.element;
  // client avatar alternatve
  const [clientAvatarAlt, setClientAvatarAlt] = useState<string>();
  const dispatch = useDispatch();
  // state
  const [newDate, setNewDate] = useState<{ date: string }>({
    date: moment(oldDate!).format("YYYY-MMM-DD"),
  });
  // send money
  const sendMoney = () => {
    // validate the receiver Contact
    if (!phoneNo && !email) {
      return new Error("no receiver contact");
    }
    // detect the receiver contact
    const receiverContact = phoneNo ? phoneNo : email;
    console.log(receiverContact);
    // get the receiver
    dispatch(getReceiver(receiverContact as string));
  };
  // when component did mount
  useEffect(() => {
    setClientAvatarAlt(name[0].toUpperCase());
  }, []);
  return (
    <div className={styles.singleReceiver}>
      {/* receiver img */}
      <span className={styles.img}>
        {Boolean(img) ? (
          <img src={img} alt="" onClick={sendMoney} />
        ) : (
          <p>{clientAvatarAlt}</p>
        )}
      </span>
    </div>
  );
};

export default SingleReceiver;
