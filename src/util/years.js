const now = new Date();
const currentYear = now.getFullYear();

const list = [];
const getYears = () => {
    for (let start=2022; start <= currentYear; start++) {
        list.push(start);
    }
    return list;
};

export default getYears;