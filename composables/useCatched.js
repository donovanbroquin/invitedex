import {useStore} from "~/stores";

export default (hash = null) => {
    const store = useStore()
    const hashToSearch = hash ?? store.currentGuest.hash

    return computed(() => {
        const found = store.catches.find(catched => catched.hash === hashToSearch)

        if (!found) return

        return {
            ...found,
            date: new Intl.DateTimeFormat('fr-FR', {
                day: "numeric",
                month: "numeric",
                hour: "numeric",
                minute: 'numeric'
            }).format(found.date)
        }
    })
}
