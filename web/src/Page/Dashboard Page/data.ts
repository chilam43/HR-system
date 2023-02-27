const today = new Date(),
    currentDate = today.getDate(),
    currentYear = today.getFullYear(),
    currentMonth = today.getMonth();

export const dateArr = [
    {
        label: 'Google AdWords Strategy',
        dateStart: new Date(currentYear, currentMonth, currentDate - 10, 9, 0),
        dateEnd: new Date(currentYear, currentMonth, currentDate - 11, 10, 30),
        allDay: true,
        backgroundColor: '#616161'
    },
    {
        label: 'Google AdWords Strategy',
        dateStart: new Date(currentYear, currentMonth, currentDate - 10, 9, 0),
        dateEnd: new Date(currentYear, currentMonth, currentDate - 11, 10, 30),
        allDay: true,
        backgroundColor: '#616161'
    },
];
