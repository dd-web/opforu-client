

import { writable } from "svelte/store";
import { counterStore } from "./counter";

const alertStore = () => {
  /** @type {import('svelte/store').Writable<Alert[]>} */
  const alerts = writable([]);
  const counter = counterStore();

  /**
   * Add a new alert to the store
   * @param {string} text 
   * @param {AlertType} type
   */
  const newAlert = (text, type) => {
    let createdAlert = {
      id: counter.getValue(),
      message: text,
      type: type
    }
    alerts.update((alerts) => [...alerts, createdAlert]);
  }

  /**
   * Remove an alert from the store
   * @param {number} id 
   */
  const removeAlert = (id) => {
    alerts.update((alerts) => alerts.filter((alert) => alert.id !== id));
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