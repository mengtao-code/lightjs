import React, { ReactElement, useEffect, useState } from 'react'
import { Route } from './Types'

const goto = (hash: string, home: ReactElement, notFound: ReactElement, routes: Route[]): ReactElement => {
    for (const singleRouter of routes) {
        if (singleRouter.hash === hash) {
            return singleRouter.component
        }
    }
    if (hash === '' || hash === '#/') {
        return home
    }
    return notFound
}

type RouterProps = {
    routes: Route[]
    home: ReactElement
    notFound: ReactElement
}

export const Router = ({ routes, home, notFound }: RouterProps) => {
    const [hash, setHash] = useState(document.location.hash)
    useEffect(() => {
        console.log(`hash:${hash}`)
        const listener = () => {
            setHash(document.location.hash)
        }

        window.addEventListener('popstate', listener)

        return () => {
            window.removeEventListener('popstate', listener)
        }
    }, [])

    return <div>{goto(hash, home, notFound, routes)}</div>
}

export const Navigate = {
    goto: (hash: string, queryParams?: Record<string, string>) => {
        let params = ''
        if (queryParams) {
            for (const key in queryParams) {
                params = params + key + '=' + queryParams[key] + '&'
            }
        }
        window.location.href = `?${params}${hash}`
    },
    goHome: ()=>{
        window.location.href = '/#/'
    }
}
