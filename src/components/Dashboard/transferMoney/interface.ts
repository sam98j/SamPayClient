// state of component
export interface compState {
    receiverPhone: string
}
// props of component
export interface compProps {
    GetReceiver?: (phone: string) => void
}