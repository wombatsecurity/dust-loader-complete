var path = require( 'path' );
var dust = require( 'dustjs-linkedin' );
var assign = require( 'object-assign' );
var loaderUtils = require( 'loader-utils' );
var fs = require( 'fs' );


// Main loader function
function loader( source ) {
  if ( this.cacheable ) { this.cacheable(); }

  // Set up default options & override them with other options
  var default_options = {
    root: '',
    dustAlias: 'dustjs-linkedin',
    namingFn: defaultNamingFunction,
    preserveWhitespace: false,
    wrapOutput: false,
    verbose: false
  };

  var global_options = this.options['dust-loader-complete'] || {};
  var loader_options = loaderUtils.getOptions( this ) || {};
  var options = assign( {}, default_options, global_options, loader_options );

  // Fix slashes & resolve root
  options.root = path.resolve( options.root.replace( '/', path.sep ) );

  // Get the path
  var template_path = path.relative( options.root, this.resourcePath );

  // Create the template name
  var name = options.namingFn( template_path, options );

  // Log
  log( options, 'Loading DustJS module from "' + template_path + '": naming template "' + name + '"' );

  // Find different styles of dependencies
  var deps = [];

  // Find regular dust partials, updating the source as needed for relatively-pathed partials
  source = findPartials( source, template_path + '/../', options, deps );

  // Find require comments
  findRequireComments( source, template_path + '/../', options, deps );

  // Do not trim whitespace in case preserveWhitespace option is enabled
  dust.config.whitespace = options.preserveWhitespace;

  // Compile the template
  var template = dust.compile( source, name );

  // Build the returned string
  var returnedString;
  if ( options.wrapOutput ) {
    returnedString = "var dust = require('" + options.dustAlias + "/lib/dust'); "
      + deps.join( ' ' ) + template
      + "var fn = " + defaultWrapperGenerator( name )
      + '; fn.templateName = "' + name + '"; '
      + "module.exports = fn;";
  } else {
    returnedString = "var dust = require('" + options.dustAlias + "'); "
      + deps.join( ' ' )
      + 'var template = ' + template + ';'
      + 'template.templateName = "' + name + '";'
      + "module.exports = template;";
  }

  // Return the string to be used
  return returnedString
}

// Create a default function for naming the template based on the path
function defaultNamingFunction( template_path, options ) {
  return template_path
    .replace( '.dust', '' )					 // remove .dust file extension
    .split( path.sep ).join( '/' );	 // split at path separator and replace with a forward slash			
}

// Create a wrapper function for calling dust.render
function defaultWrapperGenerator( name ) {
  return "function( context, callback ) { dust.render( '" + name + "', context, callback ); }";
}

// Find DustJS partials
function findPartials( source, source_path, options, deps ) {
  var reg = /({>\s?")([^"{}]+)("[\s\S]*?\/})/g, // matches dust partial syntax
    result = null, partial,
    dep, name, replace;

  // search source & add a dependency for each match
  while ( ( result = reg.exec( source ) ) !== null ) {
    partial = {
      prefix: result[1],
      name: result[2],
      suffix: result[3]
    };

    // add to dependencies
    name = addDustDependency( partial.name, source_path, options, deps );

    // retrieve newest dependency
    dep = deps[deps.length - 1];

    // log
    log( options, 'found partial dependency "' + partial.name + '"' );

    // if the partial has been renamed, update the name in the template
    if ( name != partial.name ) {
      log( options, 'renaming partial "' + partial.name + '" to "' + name + '"' )

      // build replacement for partial tag
      replace = partial.prefix + name + partial.suffix;

      // replace the original partial path with the new "absolute" path (relative to root)
      source = source.substring( 0, result.index ) + replace + source.substring( result.index + result[0].length );

      // update regex index
      reg.lastIndex += ( replace.length - result[0].length );
    }
  }

  return source;
}

// Find dependencies in comments like {! require("patterns/atoms/[button|button_link]") !} 
function findRequireComments( source, source_path, options, deps ) {
  var comment_reg = /{! require\("([\w\.\/\-_\|[\]]+)\"\) !}/g, // matches proprietary comment syntax for requiring multiple partials
    bracket_reg = /\[([^\]]*)\]/g,                            // matches brackets inside the comment requiring
    result = null, bracket_result = null, alt, name;

  // search source for require comments
  while ( ( result = comment_reg.exec( source ) ) !== null ) {
    // this will check if there are any comments that have a | delimited list of files, such as {! require("patterns/atoms/[button|button_link]") !}
    bracket_result = bracket_reg.exec( result[1] );

    // if there is a result, split the files by | and include them all
    if ( bracket_result ) {
      alt = bracket_result[1].split( "|" );
      for ( var i = 0; i < alt.length; i++ ) {
        name = result[1].replace( bracket_reg, alt[i] );
        log( options, 'found comment dependency "' + name + '"' );

        // add a dust dependency for each alternative name
        addDustDependency( name, source_path, options, deps );
      }
    }
    //if there isn't a result, assume it was just a normal require like {! require("patterns/atoms/button") !}
    else {
      log( options, 'found comment dependency "' + result[1] + '"' );
      addDustDependency( result[1], source_path, options, deps );
    }
  }
}

// Add a dust dependency to the dependency array, returning the normalized path/name
function addDustDependency( require_path, source_path, options, deps ) {
  var name = determinePartialName( require_path, source_path, options );
  deps.push( "var partial" + deps.length + " = require('" + name + "');" );
  return name;
}

// Figure out the name for a dust dependency
function determinePartialName( partial_path, source_path, options ) {
  var match, rel, abs,
    path_reg = /(\.\.?\/)?(.+)/;

  // use a regex to find whether or not this is a relative path  
  match = path_reg.exec( partial_path );
  if ( match[1] ) {
    // use os-appropriate separator
    rel = match[2].replace( '/', path.sep );

    // join the root, the source_path, and the relative path, then find the relative path from the root
    // this is the new "absolute"" path
    abs = path.relative( options.root, path.join( options.root, source_path, rel ) );
  } else {
    // use os-appropriate separator
    abs = match[2].replace( '/', path.sep );
  }

  // now use the naming function to get the name
  return options.namingFn( abs, options );
}

// Log only if verbose mode is on
function log( options, message ) {
  if ( options.verbose ) {
    console.log( '[dust-loader-complete]: ', message );
  }
}

// Export actual loader method
module.exports = loader;
