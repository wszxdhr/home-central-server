declare module 'solarlunar' {
  const content: {
    solar2lunar: (
      year: number,
      month: number,
      date: number
    ) => {
      lYear: number;
      lMonth: number;
      lDay: number;
      animal: string;
      monthCn: string;
      dayCn: string;
      cYear: number;
      cMonth: number;
      cDay: number;
      gzYear: string;
      gzMonth: string;
      gzDay: string;
      isToday: boolean;
      isLeap: boolean;
      nWeek: number;
      ncWeek: string;
      isTerm: boolean;
      term: string;
    };
  };
  export = content;
}
