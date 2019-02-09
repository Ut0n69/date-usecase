const nationalHolidaysIn2019 = {
  '1/1': '元日',
  '1/14': '成人の日',
  '2/11': '建国記念の日',
  '3/21': '春分の日',
  '4/29': '昭和の日',
  '4/30': '祝日',
  '5/1': '即位の礼',
  '5/2': '祝日',
  '5/3': '憲法記念日',
  '5/4': 'みどりの日',
  '5/5': 'こどもの日',
  '5/6': 'こどもの日 振替休日',
  '7/15': '海の日',
  '8/11': '山の日',
  '8/12': '山の日 振替休日',
  '9/16': '敬老の日',
  '9/23': '秋分の日',
  '10/14': '体育の日',
  '10/22': '儀式式',
  '11/3': '文化の日',
  '11/4': '文化の日 振替休日',
  '11/23': '勤労感謝の日'
}

export class DateUseCase {
  static shared = new DateUseCase()

  private nationalHolidays = nationalHolidaysIn2019
  private currentDate = new Date()
  private nextWorkingDate: Date = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    this.currentDate.getDate()
  )

  public getCurrentDate(): string {
    return this.dateFormatting(this.currentDate)
  }

  public getNextWorkingDate(): string {
    this.skipHolidays()
    this.skipNationalHolidays()
    return this.dateFormatting(this.nextWorkingDate)
  }

  private skipHolidays(): void {
    switch (this.currentDate.getDay()) {
      case 5:
        this.skipDate(3)
        break
      case 6:
        this.skipDate(2)
        break
      default:
        this.skipDate(1)
        break
    }
  }

  private skipNationalHolidays(): void {
    const formatData = this.dateFormatting(this.nextWorkingDate)
    const isHoliday = Object.keys(this.nationalHolidays).some(holiday => holiday === formatData)
    if (isHoliday) {
      this.skipDate(1)
      this.skipNationalHolidays()
    }
  }

  private skipDate(skipCount: number): void {
    this.nextWorkingDate = new Date(this.nextWorkingDate.setDate(this.nextWorkingDate.getDate() + skipCount))
  }

  private dateFormatting(date: Date): string {
    return `${date.getMonth() + 1}/${date.getDate()}`
  }
}
