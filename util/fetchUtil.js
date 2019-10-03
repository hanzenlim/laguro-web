import fetch from 'unfetch';

export default function request(url, options) {
    return fetch(url, options).then(resp => {
        const json = resp.json();

        if (resp.status >= 200 && resp.status < 300) {
            return json;
        }
        return json.then(Promise.reject.bind(Promise));
    });
}
