export function getTotalItems(array) {
    const totalItems = array.reduce((pv, item) => {
        return pv + item.quantity;
    }, 0);
    return totalItems;
}

