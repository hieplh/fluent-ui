export function GetCurrentDay(props?: {locale?: string, options?: Intl.DateTimeFormatOptions}): string {
  return GetDate({day: 0, locale: props?.locale, options: props?.options});
}

export function GetFirstDayInCurrentMonth(props?: {locale?: string, options?: Intl.DateTimeFormatOptions}): string {
  return GetDate({day: (- (new Date().getDate() - 1)), locale: props?.locale, options: props?.options});
}

export function GetLastDayInCurrentMonth(props?: {locale?: string, options?: Intl.DateTimeFormatOptions}): string {
  return GetDate({day: (- new Date().getDate()), month: 1, locale: props?.locale, options: props?.options});
}

export function GetDate(props?: {day?: number, month?: number, year?: number, locale?: string, options?: Intl.DateTimeFormatOptions}): string {
  const date = new Date();
  return new Date(date.getFullYear() + (props?.year ?? 0), date.getMonth() + (props?.month ?? 0), date.getDate() + (props?.day ?? 0))
    .toLocaleDateString(props?.locale ?? 'sv', props?.options ?? { year: 'numeric', month: 'long', day: 'numeric' });
}

export function GetPreviousDayFromCurrentDay(props: {previousDay: number, locale?: string, options?: Intl.DateTimeFormatOptions}): string {
  const date = new Date();
  date.setDate(date.getDate() - props.previousDay);
  return date.toLocaleDateString(props?.locale ?? 'sv', props?.options ?? { year: 'numeric', month: 'long', day: 'numeric' });
}