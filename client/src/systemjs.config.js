(function(global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'node_modules/rxjs',
        '@angular': 'node_modules/@angular',
        'angularfire2': 'node_modules/angularfire2',
        'firebase': 'node_modules/firebase'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {
            main: 'main.js',
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        },
        'firebase': {
            main: 'firebase.js',
            defaultExtension: 'js'
        },
        'angularfire2': {
            main: 'angularfire2.js',
            defaultExtension: 'js'
        }
    };

    var ngPackageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/forms',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    ngPackageNames.forEach(function(pkgName) {
        packages[pkgName] = {
            main: 'index.js',
            defaultExtension: 'js'
        };
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);
