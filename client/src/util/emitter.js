import Emitter from 'tiny-emitter';

if (!window.emitter) {
    window.emitter = new Emitter();
}

export default window.emitter;