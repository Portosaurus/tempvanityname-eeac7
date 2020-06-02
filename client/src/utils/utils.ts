export const getQueryVariable = (variable: string): string | undefined => {
    const query = window.location.search.substring(1)
    const pairs = query.split(`&`);
    for (const pair of pairs) {
        const [key, val] = pair.split(`=`);
        if (key === variable) {
            return val;
        }
    }
    return undefined;
}