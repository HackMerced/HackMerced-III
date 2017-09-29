const { extensions } = TOMOE_CONFIG;
const EXTENSION_ROOT = '../../../extensions';

export function getExtensionContent(extensionType){
  return extensions.map((extName) => {
      const extRoute = require(`${EXTENSION_ROOT}/${extName}/config.json`).injectables[extensionType];

      if(extRoute) {
        return require(`${EXTENSION_ROOT}/${extName}/src/${extRoute}`).default;
      }

      return null;
  });
};
