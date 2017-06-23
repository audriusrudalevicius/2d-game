
export const RandomFloat = (min:number, max:number) => (min + (Math.random() * (max - min)));
export const RandomInt = (min:number, max:number) => Math.round(RandomFloat(min, max));
export const RandomChoice = <T>(choices:Array<T>):T => choices[RandomInt(0, choices.length-1)];
export const TakeRandom = <T>(choices:Array<T>):T => choices.splice(choices.length * Math.random() | 0, 1)[0];
export const RandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
