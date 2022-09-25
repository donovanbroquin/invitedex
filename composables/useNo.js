import padstart from "lodash.padstart";
import {useStore} from "~/stores";

export default (guest = null) => {
    const store = useStore()

    return computed(() => padstart(guest ? guest.id : store.currentGuest?.id, 3, 0))
}
