const StyleDictionary = require('style-dictionary');
const baseConfig = require('./config.json');


StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: token => {
    return token.unit === 'pixel' && token.value !== 0
  },
  transformer: token => {
    return `${token.value}px`
  },
});

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  matcher: token => {
    return token.unit === 'percent' && token.value !== 0
  },
  transformer: token => {
    return `${token.value}%`
  },
});

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: StyleDictionary.transformGroup['css'].concat([
    'size/px',
    'size/percent',
  ]),
});

StyleDictionary.registerFormat({
  name: `lit/variables`,
  formatter: function({dictionary, platform, options, file}) {
		const css = StyleDictionary.format['css/variables']({dictionary, platform, options, file});
    return `import { css } from 'lit';

export default css\`${css}\`;
		`;
  }
});

const StyleDictionaryExtended = StyleDictionary.extend(baseConfig);

StyleDictionaryExtended.buildAllPlatforms();
