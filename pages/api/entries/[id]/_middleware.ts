import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'


export function middleware(req: NextRequest, ev: NextFetchEvent){
    const id = typeof req.page.params?.id === 'string'
        ?req.page.params.id
        :''
    
    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$')
    
    if(!checkMongoIDRegExp.test(id)){
        return new Response(
            JSON.stringify({message: 'El id no es valido ' + id}),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
    return NextResponse.next();
}