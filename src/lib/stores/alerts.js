

import { writable } from "svelte/store";
import { counterStore } from "./counter";

const alertStore = () => {
  /** @type {import('svelte/store').Writable<IAlert[]>} */
  const alerts = writable([]);
  const counter = counterStore();

  /**
   * Add a new alert to the store
   * @param {string} text 
   * @param {keyof typeof EAlertType} type
   */
  const newAlert = (text, type, ttl = 8000) => {
    /** @type {IAlert} */
    let createdAlert = {
      id: counter.getValue(),
      message: text,
      type: type,
      removecallback: setTimeout(() => {
        removeAlert(createdAlert.id)
      }, ttl)
    }

    // createdAlert.removecallback = setTimeout(() => {
    //   removeAlert(createdAlert.id)
    // }, ttl)
    alerts.update((alerts) => [...alerts, createdAlert]);
  }

  /**
   * Remove an alert from the store
   * @param {number} id 
   */
  const removeAlert = (id) => {
    alerts.update((state) => {
      state.map((a) => {
        if (a.id === id) {
          clearTimeout(a.removecallback)
        }
      })
      let newState = state.filter((a) => a.id !== id)
      return newState
    })
  }


  return {
    subscribe: alerts.subscribe,
    set: alerts.set,
    update: alerts.update,
    newAlert,
    removeAlert
  };
}

export const alerts = alertStore();