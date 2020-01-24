//const tag = 'span'

export function setup(helper) {
  if (!helper.markdownIt) {
    return
  }

  helper.registerOptions((opts, siteSettings) => {
    opts.features[
      'discourse-multilingual-post'
    ] = !!siteSettings.discourse_multilingual_post_enabled
  })

  //helper.whiteList([`${tag}.dmp-lang`])
  helper.whiteList(['div.dmp-lang'])

  helper.registerPlugin(md => {
    /*
    md.inline.bbcode.ruler.push('lang', {
      tag: 'lang',
      wrap: function(startToken, endToken, tagInfo, content) {
        const lang = tagInfo.attrs['_default']
        if (!lang || lang.length !== 2) {
          return
        }
        startToken.type = `${tag}_open`
        startToken.tag = tag
        startToken.attrs = [
          ['class', 'dmp-lang'],
          ['lang', lang]
        ]
        startToken.nesting = 1
        endToken.type = `${tag}_close`
        endToken.tag = tag
        endToken.nesting = -1
        return true
      }
    })
    */
    md.block.bbcode.ruler.push('lang', {
      tag: 'lang',
      wrap: function(token, tagInfo, content) {
        const lang = tagInfo.attrs['_default']
        if (!lang || lang.length !== 2) {
          return
        }
        token.attrs = [
          ['class', 'dmp-lang'],
          ['lang', lang]
        ]
        return true
      }
    })
  })
}
