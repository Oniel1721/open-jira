import mongoose from 'mongoose'
import { isDevelopmentMode, serverEnv } from '../utils';


/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 * 
 */
const mongoConnection = {
    isConnected: 0
}

export const connect = async()=>{
    if(mongoConnection.isConnected){
        console.log('Ya estabamos conectados')
        return;
    }

    if(mongoose.connections.length > 0){
        mongoConnection.isConnected = mongoose.connections[0].readyState

        if(mongoConnection.isConnected === 1){
            console.log('Usando conección anterior')
        }

        await mongoose.disconnect();
    }
    
    await mongoose.connect(serverEnv.MONGO_URL);
    mongoConnection.isConnected = 1;
    console.log('Conectado a MongoDB', serverEnv.MONGO_URL)
}

export const disconnect = async ()=>{
    if(isDevelopmentMode()) return;
    if(mongoConnection.isConnected === 0) return;
    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('Desconectado de MongoDB')   
}