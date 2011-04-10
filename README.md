# stylus-blueprint

A quasi-port of the compass approach to blueprint.css framework using stylus.  You can utilize mixins within your own `.styl` files to get access to the blueprint grid, form, and other fun things without having to resort to the very non-semantic, inflexible "span-x" "prepend-x" class names.

## Use

javascript - just add it to stylus's paths:

    stylus(content).set('paths',[require('stylus-blueprint')]).render(....)


in your .style files:

    @import blueprint
    #container
      container()
      #nav
        span 6
      #content
        span 18


## Examples

There are some examples under the test/ directory.  I'm working on doing the gh-pages for a better demo...but for now, just clone the repo and do:

    cd test
    node server.js

And then point your browser to localhost:3001

## Note

https://github.com/visionmedia rocks node (like a boss)
