import chunk from "lodash.chunk";
import {useStore} from "~/stores";

export function useChunkedGuests() {
    const store = useStore()

    return chunk(store.guests, 6)
}

export function useOnListDown() {
    const store = useStore()
    const guests = useChunkedGuests()

    if (store.position.page !== guests.length - 1 && store.position.guest === 5) {
        store.position.page++
        store.position.guest = 0
    } else if (store.position.guest < guests[store.position.page].length - 1) {
        store.position.guest++;
    } else if (store.position.page === guests.length - 1 && store.position.guest === guests[store.position.page].length - 1) {
        store.position.page = 0
        store.position.guest = 0
    }

    return store.position
}

export function useOnListUp() {
    const store = useStore()
    const guests = useChunkedGuests()

    if (store.position.page > 0 && store.position.guest === 0) {
        store.position.page--
        store.position.guest = 5
    } else if (store.position.guest > 0) {
        store.position.guest--
    } else if (store.position.page === 0 && store.position.guest === 0) {
        store.position.page = guests.length - 1
        store.position.guest = guests[guests.length - 1].length - 1
    }

    return store.position
}

export function useSelectGuest() {
    const store = useStore()
    const guests = useChunkedGuests()

    store.onSetCurrentGuest(guests[store.position.page][store.position.guest])
}
