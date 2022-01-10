import { ReceiversHistoryEle } from "../types/interfaces/system_api";

// add receivers Histroy to localstorage
export const addReceiverToLocalStorage = (receiver: ReceiversHistoryEle) => {
    // receiver history
    const receiversHis = localStorage.getItem("receiverHis");
    // i wanna to replace new existen receiver with old one
    // check if true
    if(receiversHis) {
      // update receivers His
      // const updatedReceiversHis = [receiver, ...JSON.parse(receiversHis) as []];
      const oldReceiversHis = JSON.parse(receiversHis) as ReceiversHistoryEle[];
      // is new Receiver exist in oldReceiverHis
      const isReceiverAlreadyExist = Boolean(oldReceiversHis.filter(ele => ele._id === receiver._id).length);
      // check if the receiver exsit
      if(isReceiverAlreadyExist) {
        const updatedReceiversHis = [receiver, ...oldReceiversHis.filter(ele => ele._id !== receiver._id)];
        localStorage.setItem("receiverHis", JSON.stringify(updatedReceiversHis));
        return updatedReceiversHis
      }
      // receiver is not exist in receiversHis so add it to there
      const updatedReceiversHis = [receiver, ...oldReceiversHis];
      localStorage.setItem("receiverHis", JSON.stringify(updatedReceiversHis));
      return updatedReceiversHis
    }
    // if receiver His is empty
    const updatedReceiversHis = JSON.stringify([receiver]);
    localStorage.setItem("receiverHis", updatedReceiversHis);
    return updatedReceiversHis
}