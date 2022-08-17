export const colors = {
  infoBlue: '#304D63',
};

export const newChar = {
  group_id: 1,
  level: 8,
  health: 185,
  healthmax: 185,
  experience: 4200,
  maglevel: 2,
  mana: 60,
  manamax: 60,
  soul: 100,
  town_id: 1,
  conditions: Buffer.from(''),
  cap: 410,
};

export const expTable = [
  {
    minLevel: 1,
    maxLevel: 100,
    multiplier: 300,
  },
  {
    minLevel: 101,
    maxLevel: 200,
    multiplier: 250,
  },
  {
    minLevel: 201,
    maxLevel: 300,
    multiplier: 200,
  },
  {
    minLevel: 301,
    maxLevel: 400,
    multiplier: 150,
  },
  {
    minLevel: 401,
    maxLevel: 500,
    multiplier: 100,
  },
  {
    minLevel: 501,
    maxLevel: 600,
    multiplier: 75,
  },
  {
    minLevel: 601,
    maxLevel: 700,
    multiplier: 50,
  },
  {
    minLevel: 701,
    maxLevel: 800,
    multiplier: 25,
  },
  {
    minLevel: 801,
    maxLevel: 900,
    multiplier: 15,
  },
  {
    minLevel: 901,
    maxLevel: 1000,
    multiplier: 10,
  },
  {
    minLevel: 1001,
    maxLevel: 1250,
    multiplier: 5,
  },
  {
    minLevel: 1251,
    maxLevel: 1500,
    multiplier: 3,
  },
  {
    minLevel: 1501,
    multiplier: 2,
  },
];

export const skillsStages = [
  {
    minLevel: 10,
    maxLevel: 70,
    multiplier: 30,
  },
  {
    minLevel: 71,
    maxLevel: 90,
    multiplier: 15,
  },
  {
    minLevel: 91,
    maxLevel: 100,
    multiplier: 10,
  },
  {
    minLevel: 101,
    maxLevel: 110,
    multiplier: 6,
  },
  {
    minLevel: 111,
    multiplier: 3,
  },
];

export const magicLevelStages = [
  {
    minLevel: 10,
    maxLevel: 70,
    multiplier: 30,
  },
  {
    minLevel: 71,
    maxLevel: 90,
    multiplier: 15,
  },
  {
    minLevel: 91,
    maxLevel: 100,
    multiplier: 10,
  },
  {
    minLevel: 101,
    maxLevel: 110,
    multiplier: 6,
  },
  {
    minLevel: 111,
    multiplier: 3,
  },
];
