export interface getReceiverRes {
    _id : string, 
    name: string, 
    avatar: string, 
    phone: string
}

export interface submitTransferSuccess {
    error: false;
    data: {newBalance: string | number}
}