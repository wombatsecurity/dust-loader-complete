5.0.1
------------------

### Changes
* Webpack version was bumped

4.0.1
------------------

### Breaking changes
* dust-loader-complete only supports:
    * node versions greater than 6.9.x (lts/boron)
    * webpack versions greater than 3.x.x
    * dustjs-linkedin version greater than 2.7.2

3.0.0
------------------

### Breaking changes
* By default, the loader no longer wraps the templates in a wrapping function that calls `dust.render`. In addition, the `wrapperGenerator` option has been removed. It has been replaced by a `wrapOutput` option for backwards-compatibility. See below for details.
* The default `dustAlias` has changed. See below for details.

2.5.1
------------------

### Breaking changes
As of version 2.5.1 this loader supports only Webpack 2 and up.