class DateTransformer {
  transformDate = (utcString: string): [string, string, string] => {
    const LOCALE = 'de-CH';

    const date = new Date(Date.parse(utcString));
    const longDate = date.toLocaleString(LOCALE, {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const shortDate = date.toLocaleString(LOCALE, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const time = date.toLocaleString(LOCALE, {
      hour: '2-digit',
      minute: '2-digit'
    })

    return [longDate, shortDate, time];
  }
}



export default new DateTransformer();