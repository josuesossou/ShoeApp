export const fetcher = (args: {url: string, headers: HeadersInit | undefined}) => 
                        fetch(args.url, { headers: args.headers }).then(res => res.json())
