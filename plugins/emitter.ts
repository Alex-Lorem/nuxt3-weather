import mitt from 'mitt'

export default defineNuxtPlugin(()=>{
    const emitter = mitt()

    return {
        provide:{
            event_emit: emitter.emit,
            event_listen: emitter.on,
            event_off: emitter.off
        }
    }
})