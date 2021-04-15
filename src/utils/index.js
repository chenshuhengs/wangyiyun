export function playCount(count) {
    if (String(count).length > 4) {
        return `${String(count).slice(0, String(count.playCount).length - 4)}万`
    } else {
        return count
    }
}
