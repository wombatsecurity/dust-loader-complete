# dust-loader-complete
A complete webpack loader for DustJS files.

## Overview
dust-loader-complete is a webpack loader for DustJS files that compiles DustJS template files into their JavaScript template functions. It has two main advantages over the alternatives:
1. Instead of returning the template function itself, it returns a wrapper function that can be called directly.
2. It automatically finds all partials and requires them, which adds them into your webpack bundle.

### Note
* As of version 1.4.0, the returned wrapper function has a property `templateName` that holds the registered name of the template.

## Installation
```
    npm install --save-dev dust-loader-complete
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

### dustAlias
Customize the alias used for DustJS. Must match the alias set in the webpack configuration.

### preserveWhitespace
Set `preserveWhitespace: true` to disable whitespace trimming. By default DustJS trims all whitespace before compiling a template, enabling this option will prevent this.

### wrapperGenerator
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



### verbose
Set `verbose: true` to see console logs from dust-loader-complete
