export function peek<T>(array: Array<T>): T {
    return array.slice(-1)[0];
}
