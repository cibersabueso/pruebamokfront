const listeners = [];

export const dispatch = (action) => {
    listeners.forEach(listener => listener(action));
}

export const registerStore = (store) => {
    listeners.push(store);
}

export const unregisterStore = (store) => {
    const idx = listeners.indexOf(store);

    if (idx > -1) listeners.splice(idx, 1);
}