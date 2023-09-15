export type TimeDurationUnit = 'd' | 'h' | 'm' | 's';


const getTimeByUnit = (timestamp: number, unit: TimeDurationUnit) => {
    const second = Math.abs(timestamp) / 1000;

    if (unit === 's') {
        return second;
    }
    const minute = second / 60;

    if (unit === 'm') {
        return minute;
    }
    const hour = minute / 60;

    if (unit === 'h') {
        return hour;
    }
    const day = hour / 24;

    if (unit === 'd') {
        return day;
    }
    return 0;
};

export const getTimeDuration = (time: string, start?: string, unit?: TimeDurationUnit) => {
    const _unit = unit || 's';

    /** 如: 22:22:22 , 22:22:22.2 , 22:22:22.22 , 22:22:22.222 */
    const regx1 = /^\d{2}:\d{2}:\d{2}(\.\d{1,3})?$/;

    if (regx1.test(time)) {
        if (start && !regx1.test(start)) {
            throw new Error(`invalid start argument: ${start}`);
        }

        if (start) {
            const timestamp = new Date(`1970-01-01 ${time} GMT`).getTime() - new Date(`1970-01-01 ${start} GMT`).getTime();

            return getTimeByUnit(timestamp, _unit);
        }
        const timestamp = new Date(`1970-01-01 ${time} GMT`).getTime() - new Date('1970-01-01 00:00:00 GMT').getTime();

        return getTimeByUnit(timestamp, _unit);
    }

    /** 如: 2022-02-02 , 2022/02/02或2022-02-02 22:22:22 , 2022/02/02 22:22:22 , 最小可精确到毫秒:2022-02-02 22:22:22.222或2022/02/02 22:22:22.222  */
    const regx2 = /^\d{4}(-|\/)\d{1,2}\1\d{1,2}(\s{1}\d{2}:\d{2}:\d{2}(\.\d{1,3})?)?$/;

    if (!(regx2.test(time) && regx2.test(start))) {
        throw new Error(`invalid argument: time[${time}], start:[${start}]`);
    }
    const timestamp = new Date(`${time} GMT`).getTime() - new Date(`${start} GMT`).getTime();

    return getTimeByUnit(timestamp, _unit);
};
