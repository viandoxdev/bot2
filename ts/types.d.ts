interface Conf {
    prefix: string,
    token: string,
    banMessage: string
}
interface AccountObject {
    [propname: string]: ToastAccount

}
interface ToastAccount {
    config: userConfigInterface,
    messages: number,
    coins: number,
    rank: number
}
interface userConfigInterface {
    bannedCommand: string[]
}