
export function RandomEmail(str: string | any): string {
    const regex = /<<RandomNumber_(\d+)_to_(\d+)>>/g;
    return str.replace(regex, (match: any, p1: string, p2: string) => {
        const min = parseInt(p1, 10);
        const max = parseInt(p2, 10);
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toString();
    });
}