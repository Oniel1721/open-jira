import mongoose from 'mongoose'
import { serverEnv } from '../utils';


/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 * 
 */
const mongooConnection = {
    isConnected: 0
}

export const connect = async()=>{
    if(mongooConnection.isConnected){
        console.log('Ya estabamos conectados')
        return;
    }

    if(mongoose.connections.length > 0){
        mongooConnection.isConnected = mongoose.connections[0].readyState

        if(mongooConnection.isConnected === 1){
            console.log('Usando conección anterior')
        }

        await mongoose.disconnect();
    }
    
    await mongoose.connect(serverEnv.MONGO_URL);
    mongooConnection.isConnected = 1;
    console.log('Conectado a MongoDB', serverEnv.MONGO_URL)
}

export const disconnect = async ()=>{
    if(mongooConnection.isConnected === 0) return;
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB')
    
}