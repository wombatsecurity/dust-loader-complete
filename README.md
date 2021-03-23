# [DEPRECATED]

This library has been deprecated and will no longer be maintained.

# dust-loader-complete
A complete webpack loader for DustJS files.

## Overview
dust-loader-complete is a webpack loader for DustJS files that compiles DustJS template files into their JavaScript template functions. It has a couple of features that distinguish it from the alternatives:
1. It finds all partials and requires them, which adds them into your webpack bundle.
2. It finds `<img>` tags and resolves the images specified in the `src` (see options below to disable or filter which paths are resolved).
2. It adds a `templateName` to the compile template function which can be easier to pass around your application if needed.

## Installation
```
    npm install --save-dev dust-loader-complete dustjs-linkedin
```
	
## Usage
There are two changes you need to make to your webpack configuration in order to use dust-loader-complete.

First, add the following to the array of loaders (assuming your dust files are saved with a .dust extension):
```javascript
    { test: /\.dust$/, loader: "dust-loader-complete" }
```
Second, provide an alias for the `dustjs-linkedin` module. dust-loader-complete writes a `var dust = require( )` method at the top of every compiled template. It needs to know how to require the DustJS module. The default is to use the alias `dustjs`:
```javascript
    alias: {
        dustjs: 'dustjs-linkedin'
    }
```
### Note
If you want to use NPM's dustjs-helpers module, you'll have to add the following alias:
```javascript
    alias: {
        ....
        'dust.core': 'dustjs-linkedin'
    }
```

## Options
dust-loader-complete offers several options to customize its behavior. Read the [loader documentation](http://webpack.github.io/docs/loaders.html) to learn more about how to set loader options.

### root
Set a root path for your dust templates. This root will be removed from the beginning of the dust module path before it is turned into the template name via the `namingFn`.

### ignoreImages
Set this to `true` to skip the resolving of image dependencies from your dust templates.

### excludeImageRegex
Set this to a Regex if you want to exclude some image paths from being resolved. If the contents of the `src` attribute match the Regex, the image tag will not be processed.

### dustAlias
If you've set up an alias for `dustjs-linkedin`, you can use this option to instruct the loader to use the same alias.

### preserveWhitespace
Set `preserveWhitespace: true` to disable whitespace trimming. By default DustJS trims all whitespace before compiling a template, enabling this option will prevent this.

### wrapperGenerator (prior to 3.0.0 only)
This option must be set via the "global" configuration object. What this means is that in your webpack configuration object, create a top-level object with the name `dust-loader-complete':
```javascript
    {
        entry: '/path/to/entry.js',
        ....
        'dust-loader-complete': {
            wrapperGenerator: function ( name ) { .... }
        }
    }
```
This function generates the `dust.render` wrapper function. It _receives_ a single parameter, the template name as a string, and it must return a string that when written out to the webpack JavaScript file will render the dust template. For example, the default function is
```javascript
    function defaultWrapperGenerator( name ) {
      return "function( context, callback ) { dust.render( '" + name + "', context, callback ); }";
    }
```

### wrapOutput
Set `wrapOutput: true` to turn on the defaultWrapperGenerator from above.

### verbose
Set `verbose: true` to see console logs from dust-loader-complete
