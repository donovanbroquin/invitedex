import {defineStore} from 'pinia'
import Dexie from "dexie";
import axios from "axios";
import {useChunkedGuests} from "~/composables/useGuestList";

export const useStore = defineStore('invitedex', {
    state: () => ({
        // Dexie client
        db: null,

        // Guests from API / IndexedDB
        guests: [],

        // Selected guest to show
        currentGuest: null,

        // Guests list current position
        position: {
            page: 0,
            guest: 0,
        },

        // Guests ids only
        catches: [],

        // Does Invitédex initialised
        isInitialized: false,

        // Registred guest hash
        whoiam: '',

        // Last button input
        input: '',

        // Last 10 button inputs for Konami code
        inputs: []
    }), actions: {
        async init() {
            const config = useRuntimeConfig()

            // Init database
            this.db = new Dexie('invitedex');

            try {
                this.db.version(1).stores({
                    guests: 'id, name, relation, sprite, coordinates, description, hash',
                });
                this.db.version(1).stores({
                    catches: 'hash, date',
                });
            } catch (e) {
                console.log(e)
            }

            // Use stored guests if present only of wedding day
            try {

                this.guests = await this.db?.guests?.toArray()
                this.catches = await this.db?.catches?.toArray()

                if (!this.guests) this.guests = []
                if (!this.catches) this.catches = []
            } catch (e) {
                console.log(e)
            }

            // Re-init user if guest hash stored
            const hash = localStorage.getItem('whoiam')

            if (hash && hash !== '') {
                this.isInitialized = true
                this.whoiam = hash
            }

            if (this.guests.length > 0 && new Date >= new Date(config.eventStartAt)) return

            // If not in event OR no guests stored, fetch and store guests
            await this.db.guests.clear()
            try {

                const guests = await axios.get('/api/guests')

                if (guests.data) {
                    try {
                        await this.db.guests.bulkAdd(guests.data)
                        this.guests = guests.data
                    } catch (e) {
                        console.log(e)
                    }
                }
            } catch (e) {
                throw new Error(e)
            }
        },
        onButtonPress(button) {
            this.input = button

            // Store only last 10 inputs for easter egg
            if (this.inputs.length === 10) {
                this.inputs.shift()
            }
            this.inputs.push(button)
        },
        onEndInit({hash}) {
            this.isInitialized = true
            this.whoiam = hash

            localStorage.setItem('whoiam', hash);
        },
        async onReset() {
            // Reset store
            this.isInitialized = false
            this.currentGuest = null
            this.input = ''
            this.inputs = []
            this.guests = []
            this.catches = []
            this.position = {
                page: 0,
                guest: 0,
            }

            // Clean indexedDB
            await this.db.guests.clear()
            await this.db.catches.clear()

            // Remove S3 file

            // Delete localStorage hash
            localStorage.clear()
            this.whoiam = ''
        },
        onSetCurrentGuest(guest = null) {
            this.currentGuest = guest
        },
        onUpdatePosition(position) {
            this.position = position
        },
        async onCatchGuest(hash) {
            if (!this.catches.map(catched => catched.hash).includes(hash)) {
                const item = {hash, date: new Date}

                // Store in Pinia store
                this.catches.push(item)

                // Store in IndexedDB
                this.db.catches.add(item)

                // Store in S3 JSON file
                await axios.post('/api/catches', {
                    hash: this.whoiam,
                    catches: this.catches,
                    id: this.guests.find(guest => guest.hash === this.whoiam).id
                })
            }

            // Set currentGuest to hash owner
            useChunkedGuests().forEach((page, pageIdx) => {
                page.forEach((guest, guestIdx) => {
                    if (guest.hash === hash) {
                        this.onUpdatePosition({page: pageIdx, guest: guestIdx})
                        this.onSetCurrentGuest(guest)
                    }
                })
            })
        },
        async contest() {
            try {
                const res = (await axios.get('/api/contest')).data

                return {...res, ...this.guests.find(guest => guest.hash === res.hash)}
            } catch (e) {
                await Promise.reject(e)
                throw new Error(e)
            }
        }
    },
})
