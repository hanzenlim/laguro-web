// eslint-disable-next-line
export const APPOINTMENT_SCHEDULING_FEE = 2000;

export const addCentsToEquipment = equipment => {
    return equipment.map(equip => {
        return { ...equip, price: equip.price * 100 };
    });
};

export const removeCentsFromEquipment = equipment => {
    return equipment.map(equip => {
        return { ...equip, price: equip.price / 100 };
    });
};

export const renderPrice = price => {
    return `$${(Number(price) / 100).toFixed(2)}`;
};
