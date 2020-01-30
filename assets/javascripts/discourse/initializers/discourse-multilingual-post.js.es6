import { withPluginApi } from 'discourse/lib/plugin-api'

export default {
  name: 'discourse-multilingual-post',
  initialize(container, app) {
    // If plugin is disabled, quit
    if (!app.SiteSettings['discourse_multilingual_post_enabled']) {
      return
    }

    const userLang = I18n.locale.substring(0, 2)
    const defaultLang = app.SiteSettings.default_locale.substring(0, 2)

    withPluginApi('0.8.30', api => {
      api.decorateCooked(
        ($elem, helper) => {
          // Find all language blocks
          const $blocks = $elem.find('.dmp-lang')
          if (!$blocks.length) {
            return
          }

          // Determine the language to display
          const langs = $blocks
            .map((i, el) => el.getAttribute('lang'))
            .toArray()
          const displayLang = langs.includes(userLang)
            ? userLang
            : langs.includes(defaultLang)
            ? defaultLang
            : langs[0]

          // Hide all language, except for the one to display
          $blocks.hide()
          $blocks.filter(`[lang="${displayLang}"]`).show()

          /*
          // If required, add the language select box at the top of the post
          const options = langs.map(lang => {
            const selected = lang === displayLang ? ' selected' : ''
            return `<option value="${lang}"${selected}>${lang}</option>`
          })
          $(`<select class="dmp-select">${options.join()}</select>`)
            .change(e => {
              $blocks.hide()
              $blocks.filter(`[lang="${e.target.value}"]`).show()
            })
            .prependTo($elem)
          */
        },
        {
          id: 'discourse-multilingual-post',
          onlyStream: true // Prevent decorating the post in the editor
        }
      )
    })
  }
}
