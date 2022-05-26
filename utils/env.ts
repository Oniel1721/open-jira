import { isClientSide } from "./renderSide"

enum ServerEnvKeys {
   MONGO_URL = 'MONGO_URL'
}

const getServerEnv = (key: ServerEnvKeys):string=>{
    if(isClientSide()) return '';
    return process.env[key] ?? ''
}

export const serverEnv =  {
    MONGO_URL: getServerEnv(ServerEnvKeys.MONGO_URL)
}
