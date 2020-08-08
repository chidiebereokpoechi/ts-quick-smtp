export class Mail {
  public from: string
  public recipients: string[]
  public date: Date
  public content: string
  public raw_content: string

  constructor() {
    this.from = ''
    this.recipients = []
    this.date = new Date()
    this.content = ''
    this.raw_content = ''
  }
}
