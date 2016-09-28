import superagent from 'superagent';

const methods = [
  'get',
  'head',
  'post',
  'put',
  'del',
  'options',
  'patch'
];

class _Api {

  constructor(opts) {

    this.opts = opts || {};

    if (!this.opts.baseURI)
      throw new Error('baseURI option is required');

    methods.forEach(method =>
      this[method] = (path)=>(data={}) => new Promise((resolve, reject) => {
        const request = superagent[method](this.opts.baseURI + path);

        this.opts.headers && request.set(this.opts.headers);

        method === 'get' ? request.query(data) : request.send(data)

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      })
    );

  }

}

const Api = _Api;

export default Api;
