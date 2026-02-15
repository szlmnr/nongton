// utils/eventHelper.js
export const getActiveEvent = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  // NYEPI (19 Maret 2026)
  if (month === 3 && date >= 18 && date <= 20) {
    return 'NYEPI';
  }

  // IMLEK (17 Feb 2026) - sebelum Ramadan
  if (month === 2 && date >= 10 && date <= 17) {
    return 'IMLEK';
  }

  // RAMADAN (18 Feb - 20 Mar 2026)
  if ((month === 2 && date >= 18) || (month === 3 && date <= 20)) {
    return 'RAMADAN';
  }

  // NATAL (20-31 Des)
  if (month === 12 && date >= 20) {
    return 'NATAL';
  }

  return null;
};