export const getData = async (route) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(route);
            if (!response)
                reject(response);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}