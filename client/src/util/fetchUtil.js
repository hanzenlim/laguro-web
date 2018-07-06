import fetch from 'unfetch';

export default function request(url, options) {
    return fetch(url, options).then(resp => {
        let json = resp.json();

        if (resp.status >= 200 && resp.status < 300) {
            return json;
        } else {
            return json.then(Promise.reject.bind(Promise));
        }
    });
}
