var shell = require('shelljs');
shell.echo('fhdsjklfhsjkdf');

let structure = {
    "start": {
        "test": {
            "unit_test": {}
        }
    },
    "packages": {
        "devDependencies": {
            "angular": {}
        }
    }
}

function createFolders(paths) {
    shell.echo("inside a function createFolders\n");
    shell.mkdir('-p', paths);
}

function makePathsForFolders(structure) {
    shell.echo("inside a function makePathsForFolders\n");
    console.log(structure);

    for ()
        let paths = [];
    return paths;
}

let paths = makePathsForFolders(structure);

createFolders(paths);