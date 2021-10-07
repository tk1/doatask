import { readdir } from 'fs/promises';
import * as path from 'path';

const dirPath = './dist/plugins'
const basePath = '../plugins'

export const plugins = new Map<string, any>()

function importPlugin(name: string) {
  const pluginMain = path.join(basePath, name, 'main.js')
  return import(pluginMain)
}

async function getPlugins() {
  try {
    const files = await readdir(dirPath, { withFileTypes: true });
    for (const file of files)
      if (file.isDirectory()) {
        const main = await importPlugin(file.name)
        plugins.set(file.name, main)
      }
  } catch (err) {
    console.error(err);
  }
}

getPlugins()