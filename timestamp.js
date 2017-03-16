module.exports = function TimestampService() {
    this.parse = function(str) {
        let result;
        let date = this.formatDate(str);
        if (this.validDate(date)) {
            result = {
                unix: date,
                natural: (new Date(date)).toString()
            }
        } else {
            result = {
                message: 'Invalid Date Format'
            }
        }
        console.log(result);
        return result;
    }
    this.validDate = function(date) {
        if (typeof date === 'number') return date >= 0;
        return Date.parse(date) >= 0;
    }
    this.formatDate = function(str) {
        if (/^[0-9]*$/.test(str)) return Number(str);
        return Date.parse(str);
    }
}
