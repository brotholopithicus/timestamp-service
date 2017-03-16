module.exports = function TimestampService() {
    this.parse = function(str) {
        let date = this.formatDate(str);
        if (this.validDate(date)) return this.dateObj(date);
        return { message: 'Invalid Date Format' };
    };
    this.dateObj = (date) => {
        return { unix: date, natural: (new Date(date)).toString() };
    };
    this.validDate = (date) => typeof date === 'number' ? date >= 0 : Date.parse(date) >= 0;
    this.formatDate = (str) => (/^[0-9]*$/).test(str) ? Number(str) : Date.parse(str);
}
