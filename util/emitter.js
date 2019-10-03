import mitt from 'mitt';

let emitter = null;

if (typeof window !== 'undefined' && !window.emitter) {
    window.emitter = mitt();
}

if (typeof window !== 'undefined' && window.emitter) {
    emitter = window.emitter;
}

export default emitter;
