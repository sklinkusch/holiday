class IsDateHoliday {
  constructor(date) {
    this.year = date.getFullYear()
    this.month = date.getMonth() + 1
    this.day = date.getDate()
    this.weekday = date.getDay()
    this.sunday = this.isSunday()
    this.fixed = this.isFixed()
    this.flexible = this.isVariable()
    this.holiday = this.sunday || this.fixed || this.flexible 
    return this.holiday
  }
  isSunday() {
    if(this.weekday === 0) {
      return true
    }
    return false
  }
  isLeap() {
    if (this.year % 400 === 0) {
      return true
    } else if (this.year % 4 === 0 && this.year % 100 !== 0) {
      return true
    }
    return false
  }
  whole(number) {
    if(number < 0){
      return Math.ceil(number)
    }
    return Math.floor(number)
  }
  gauss(number) {
    return Math.floor(number)
  }
  isFixed() {
    const NewYear = { day: 1, month: 1 }
    const FirstMay = { day: 1, month: 5 }
    const Reunification = { day: 3, month: 10 }
    const FirstXmasDay = { day: 25, month: 12 }
    const SecondXmasDay = { day: 26, month: 12 }
    const fixedHolidays = [NewYear, FirstMay, Reunification, FirstXmasDay, SecondXmasDay]
    for(let i = 0; i < fixedHolidays.length; i++) {
      if(fixedHolidays[i].day === this.day && fixedHolidays[i].month === this.month) {
        return true
      }
    }
    return false
  }
  isVariable() {
    // calculus for EasterSunday
    const g = this.year % 19
    const century = this.gauss(this.year/100)
    const a = this.gauss(century/4)
    const d = this.gauss((8*century+13)/25)
    const h = (century - a - d + (19*g) + 15) % 30
    const f = this.gauss(h/20)
    const k = this.gauss(29/(h+1))
    const m = this.gauss((21-g)/11)
    const n = this.gauss(this.year/4)
    const i = h - (f*(1 - (k*m)))
    const j = (this.year + n + i + 2 - century + a) % 7
    const l = i - j
    const EasterSunday = {
      day: l <= 3 ? l + 28 : l - 3,
      month: l <= 3 ? 3 : 4,
    }
    const GoodFriday = {
      day: EasterSunday.day < 3 && EasterSunday.month === 4 ? EasterSunday.day + 29 : EasterSunday.day - 2,
      month: EasterSunday.day < 3 && EasterSunday.month === 4 ? 3 : EasterSunday.month,
    }
    const EasterMonday = {
      day: EasterSunday.day === 31 && EasterSunday.month === 3 ? 1 : EasterSunday.day + 1,
      month: EasterSunday.day === 31 && EasterSunday.month === 3 ? 4 : EasterSunday.month,
    }
    const Ascension = {
      day: EasterSunday.month === 3
        ? EasterSunday.day < 23
          ? EasterSunday.day + 8
          : EasterSunday.day - 22
        : EasterSunday.day > 22
          ? EasterSunday.day - 22
          : EasterSunday.day + 9,
      month: EasterSunday.day < 23 && EasterSunday.month === 3
        ? 4
        : EasterSunday.day > 22 && EasterSunday.month === 4
          ? 6
          : 5,
    }
    const PentecostSunday = {
      day: Ascension.month === 4
        ? Ascension.day - 20
        : Ascension.month === 5
          ? Ascension.day < 22 ? Ascension.day + 10 : Ascension.day - 21
          : Ascension.day + 10,
      month: Ascension.month === 4 
        ? 5 
        : Ascension.month === 5 && Ascension.day < 22
          ? 5
          : 6, 
    }
    const PentecostMonday = {
      day: PentecostSunday.day === 1 ? 31 : PentecostSunday.day + 1,
      month: PentecostSunday.day === 1 ? 5 : PentecostSunday.month,
    }
    const flexibleHolidays = [GoodFriday, EasterMonday, Ascension, PentecostMonday]
    for(let i = 0; i < flexibleHolidays.length; i++){
      if(flexibleHolidays[i].day === this.day && flexibleHolidays[i].month === this.month) {
        return true
      }
    }
    return false
  }
}

const myDate = new Date()
const holiday = new IsDateHoliday(myDate)
console.log(holiday.holiday)
