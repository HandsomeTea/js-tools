import * as date from '../src/date';

describe('date', () => {
    test('getTimeDuration', () => {
        expect(date.getTimeDuration('00:13:32')).toEqual(812);
        expect(date.getTimeDuration('00:13:32', { unit: 'm' })).toEqual(13.53);
        expect(date.getTimeDuration('00:13:32', { unit: 'm', start: '00:10:47' })).toEqual(2.75);
        expect(date.getTimeDuration('07:13:32', { unit: 'h' })).toEqual(7.23);
        expect(date.getTimeDuration('12:13:32', { unit: 'd' })).toEqual(0.51);
    });

    test('getUTCTime', () => {
        const data = new Date();

        expect(date.getUTCTime(data)).toEqual(data.toISOString());
    });

    test('getDateInfo', () => {
        const data = new Date();
        const dateInfo = date.getDateInfo(data);

        expect(dateInfo.year).toEqual(data.getFullYear());
        expect(dateInfo.month).toEqual(data.getMonth() + 1);
        expect(dateInfo.day).toEqual(data.getDate());
        expect(dateInfo.hour).toEqual(data.getHours());
        expect(dateInfo.minute).toEqual(data.getMinutes());
        expect(dateInfo.second).toEqual(data.getSeconds());
        expect(dateInfo.millisecond).toEqual(data.getMilliseconds());
        expect(dateInfo.week).toEqual(data.getDay() || 7);
    });

    test('getDateStart', () => {
        expect(date.getDateStart()).toEqual(new Date(`${new Date().toLocaleDateString()} 00:00:00`));
        const year = 2022;

        expect(date.getDateStart({ year })).toEqual(new Date(`${year}/${new Date().toLocaleDateString().substring(5)} 00:00:00`));
        const month = 8;

        expect(date.getDateStart({ year, month })).toEqual(new Date(`${year}/08/${new Date().toLocaleDateString().substring(8)} 00:00:00`));
        const day = 17;

        expect(date.getDateStart({ year, month, day })).toEqual(new Date(`${year}/08/17 00:00:00`));
    });

    test('formatTimeLong', () => {
        expect(date.formatTimeLong(812000)).toBe('00:13:32');
    });
});
