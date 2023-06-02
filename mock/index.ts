import { createServer } from 'miragejs';
import { TMethods } from './types';

const files = require.context(`./modules`, true, /\.ts$/);
const mockData: any[] = [];

export function setupMock() {
  files.keys().forEach((key) => {
    const file = require(`./modules` + key.split('.')[1]).default;
    file && mockData.push(file);
  });
  createServer({
    routes() {
      this.namespace = process.env.VUE_APP_BASE_URL!;
      for (let i = 0; i < mockData.flat().length; i++) {
        const { url, method, response, options, handler } = mockData.flat()[i];
        this[method as TMethods](url, response ? response : handler, options);
      }
    },
  });
}
