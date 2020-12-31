export const toFirstCharUpperCase = name => name.charAt(0).toUpperCase() + name.slice(1);
export const padLeadingZeros = (num) => {
    let s = num + "";
    while (s.length < 3) s ="0" + s;
    return s;
} 