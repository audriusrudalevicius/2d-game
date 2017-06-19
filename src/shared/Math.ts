
export const RandomFloat = (min:number, max:number) => (min + (Math.random() * (max - min)));
export const RandomInt = (min:number, max:number) => Math.round(RandomFloat(min, max));
export const RandomChoice = <T>(choices:Array<T>) => choices[RandomInt(0, choices.length-1)];
