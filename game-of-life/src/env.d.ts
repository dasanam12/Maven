declare type Life = 0 | 1;

declare type LifeData = {
  title: string;
  life: Life[][];
};

declare module '*.json' {
  const value: LifeData;
  export default value;
}
