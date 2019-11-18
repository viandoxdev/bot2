interface Conf {
    prefix: string,
    token: string
}
interface AccountObject {
    [propname: string]: ToastAccount

}
interface ToastAccount {
    config: userConfigInterface,
    messages: number,
    coins: number
}
interface userConfigInterface {

}