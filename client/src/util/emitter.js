import mitt from 'mitt';

if (!window.emitter) {
    window.emitter = mitt();
}

export default window.emitter;