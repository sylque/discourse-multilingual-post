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
          const $blocks = $elem.find('.dmp-lang')
          if (!$blocks.length) {
            return
          }
          const foundUser = $blocks.filter(`[lang="${userLang}"]`).length
          const foundDefault = $blocks.filter(`[lang="${defaultLang}"]`).length
          const displayLang = foundUser
            ? userLang
            : foundDefault
            ? defaultLang
            : $blocks.first().attr('lang')
          $blocks.not(`[lang="${displayLang}"]`).hide()
        },
        {
          id: 'discourse-multilingual-post',
          onlyStream: true // Prevent decorating the post in the editor
        }
      )

      api.decorateWidget('title:after', function(helper) {
        return 'Salut'
      })
    })
  }
}
