export const timestampToDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const secondsToTime = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return `${
    0 < days ? days + ' day, ' : ''
  }${hours}h, ${minutes}m and ${seconds}s`;
};

export const vocationIdToName = [
  'None', // 0
  'Sorcerer',
  'Druid',
  'Paladin',
  'Knight',
  'Master Sorcerer',
  'Elder Druid',
  'Royal Paladin',
  'Elite Knight',
];

export const groupToName = [
  'None', // 0
  'Player', // 1
  'Tutor',
  'Senior Tutor',
  'Gamemaster',
  'Community Manager',
  'God',
];

export const rankToName = ['Unranked', 'Leader', 'Vice Leader', 'Member'];
