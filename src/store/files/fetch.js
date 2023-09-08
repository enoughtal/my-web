import { dataHost, dataPort } from '../../../global.cjs';
import { getData, postData } from '../../tools/helper';

const fetch = {
  async getFile(data) {
    const res = await postData(
      `https://${dataHost}:${dataPort}/api/getFile`,
      data
    );
    if (res.fail) return;
    return res;
  },
  async getCategory() {
    const res = await getData(
      `https://${dataHost}:${dataPort}/api/getCategory`
    );
    if (res.fail) return;
    return res;
  },
};

export default fetch;
