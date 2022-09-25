import {useStore} from "~/stores";

export default (hash = null) => {
    const store = useStore()

    return computed(() => {
        const hashToSearch = hash ?? store.currentGuest?.hash
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
