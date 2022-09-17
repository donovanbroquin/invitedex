import {defineStore} from 'pinia'
import Dexie from "dexie";
import axios from "axios";

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
        catched: [],

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
            // Init database
            this.db = new Dexie('invitedex');

            this.db.version(1).stores({
                guests: 'id, name, relation, sprite, coordinates, description, hash',
            });

            // Use stored guests if present only of wedding day
            this.guests = await this.db.guests.toArray()
            if (this.guests.length > 0 && new Date >= new Date('2022-10-01')) return

            // Else, fetch and store guests
            await this.db.guests.clear()
            const guests = await axios.get('/api/guests')

            if (guests.data) {
                try {
                    await this.db.guests.bulkAdd(guests.data)
                    this.guests = guests.data
                } catch (e) {
                    console.log(e)
                }
            }

            // Re-init user if guest hash stored
            const hash = localStorage.getItem('whoiam')

            if (hash) {
                this.isInitialized = true
                this.whoiam = hash
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
        onEndInit(guest) {
            this.isInitialized = true
            this.whoiam = guest

            localStorage.setItem('whoiam', guest.hash);
        },
        async onReset() {
            this.isInitialized = false
            this.currentGuest = null
            this.input = ''
            this.inputs = []

            // Clean indexedDB
            await this.db.guests.clear()
            this.guests = []
            this.catched = []

            // Delete localStorage hash
            localStorage.clear()
            this.whoiam = ''
        },
        onSetCurrentGuest(guest = null) {
            this.currentGuest = guest
        },
        onUpdatePosition(position) {
            this.position = position
        }
    },
})
