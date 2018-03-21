import axios from 'axios';

const IMGUR_CID = 'afb54a84cb29575';

class UploadService {
  upload(blob) {
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    return new Promise((resolve, reject) => {
      const fd = new FormData();
      fd.append('image', blob);
      this.fd = fd;
      axios.post('https://api.imgur.com/3/upload', this.fd, { headers: {
        authorization: `Client-ID ${IMGUR_CID}`,
      },
      }).then((res) => {
        const dat = res.data.data;
        resolve(`https://imgur.com/${dat.id}`);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
export default UploadService;
