# discourse-multilingual-post

A Discourse plugin that allows multiple localized versions of post content.

**This plugin is a proof-of-concept**: without the possibility to localize 
topic titles, it is not very useful.

## How to use

In a post, use `[lang=xx]` blocks:

```
[lang=en]
Hello World!
[/lang]
[lang=fr]
Bonjour monde !
[/lang]
[lang=de]
Hallo Welt !
[/lang]
```

Result:
> Hallo Welt !

Country codes must be 2-letter long (regions are not supported).

## How it works

When rendering a post, the plugin seeks one `[lang=xx]` block to display. It 
will stop seeking once it has found:
1. the block set for the **language of the user** (as defined by Discourse)
2. the block set for the **default language of the Discourse instance**
3. the **first block**
