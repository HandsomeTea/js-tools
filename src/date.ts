export type TimeDurationUnit = 'd' | 'h' | 'm' | 's';


const getTimeByUnit = (timesDuration: number, unit: TimeDurationUnit) => {
    const second = Math.abs(timesDuration) / 1000;

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

/**
 *
 *
 * @param {string} time 如： 22:22:22 , 22:22:22.2 , 22:22:22.22 , 22:22:22.222 , 2022-02-02 , 2022/02/02或2022-02-02 22:22:22 , 2022/02/02 22:22:22 , 最小可精确到毫秒:2022-02-02 22:22:22.222或2022/02/02 22:22:22.222
 * @param {string} [start] 类型同time
 * @param {TimeDurationUnit} [unit]
 * @returns
 */
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


import { fixedNumString } from './number';

/**
 * 生成 yyyy-MM-ddTHH:mm:ss.SSSXXX 格式的UTC时间
 */
export const getUTCTime = (): string => {
    const now = new Date();
    const { year, month, day, hour, minute, seconds, milliseconds } = {
        year: now.getUTCFullYear(),
        month: fixedNumString(now.getUTCMonth() + 1),
        day: fixedNumString(now.getUTCDate()),
        hour: fixedNumString(now.getUTCHours()),
        minute: fixedNumString(now.getUTCMinutes()),
        seconds: fixedNumString(now.getUTCSeconds()),
        milliseconds: fixedNumString(now.getUTCMilliseconds(), 3)
    };

    return `${year}-${month}-${day}T${hour}:${minute}:${seconds}.${milliseconds}Z`;
};

/**
 * when date is undefined, deal with today
 *
 * @param {Date} [date]
 * @returns {{ year: number, month: number, day: number, week: number }}
 */
export const getDateInfo = (date?: Date): { year: number, month: number, day: number, week: number, hour: number, minute: number, second: number, millisecond: number } => {
    if (!date) {
        date = new Date();
    }

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        week: date.getDay() || 7,
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds()
    };
};

/**
 * when date is undefined, deal with today
 *
 * @param {{ year?: number, month?: number, day?: number }} [date]
 * @returns {Date}
 */
export const getDateStart = (date?: { year?: number, month?: number, day?: number }): Date => {
    let { year, month, day } = date || {};
    const now = new Date();

    if (!year) {
        year = now.getFullYear();
    }

    if (!month) {
        month = now.getMonth() + 1;
    }

    if (!day) {
        day = now.getDate();
    }

    return new Date(`${year}/${month}/${day} 00:00:00`);
};

/**
 * 格式化时长
 *
 * @param {(number | { start: number, end: number })} data
 * @returns {string}
 */
export const formatTimeLong = (data: number | { start: number, end: number }): string => {
    if (typeof data !== 'number') {
        const { end, start } = data;

        data = Math.abs(end - start);
    }

    const fixTime = (num: number) => {
        if (num < 1) {
            return '00';
        } else if (num < 10) {
            return `0${num}`;
        } else {
            return `${num}`;
        }
    };
    let second = Math.floor(data / 1000);

    const hour = fixTime(Math.floor(second / 60 / 60));

    second = second - parseInt(hour) * 60 * 60;
    const minute = fixTime(Math.floor(second / 60));
    const _second = fixTime(second - parseInt(minute) * 60);

    return `${hour}:${minute}:${_second}`;
};
