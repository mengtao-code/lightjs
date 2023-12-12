export const HttpRequestUtils = {
    get: async (url: string) => {
        return await (await fetch(url)).json()
    }
}
