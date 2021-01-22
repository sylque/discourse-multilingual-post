# name: discourse-multilingual-post
# about: A Discourse plugin that allows multiple localized versions of post content
# version: 1.0.2
# authors: Sylvain Quendez

# Load styles
register_asset "stylesheets/discourse-multilingual-post.scss"

# Register admin settings
enabled_site_setting :discourse_multilingual_post_enabled
