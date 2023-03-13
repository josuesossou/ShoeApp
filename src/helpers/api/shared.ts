export const fetcher = (
    args: {
        url: string,
        headers?: HeadersInit,
        option?: any
    }
) => fetch(
    args.url,
    { headers: args.headers || null, ...args.option }
)
.then(res => res.json())
