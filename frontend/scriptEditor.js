(function scriptEditor(){
  const filename = "package.json"
  const  editJsonFile = require('edit-json-file')
  let file = editJsonFile(`${__dirname}/${filename}`)

  function initializeScripts(packageFile){
    packageFile.set("scripts",{})
    packageFile.save()
  }

  function getScripts(file){
    return file.get('scripts')
  }
  function setScripts(file,scripts){
    file.set('scripts',scripts)
  }
  function saveFile(file){
    file.save()
  }

  let currentScripts  = getScripts(file)

  if(!currentScripts){
    initializeScripts(file)
    currentScripts  = getScripts(file)

  }

  if(process.argv.length === 2) {
    return
  }

  for (let j = 2; j < process.argv.length; j++) {
    const keyValuePair = process.argv[j].split(':')
    const key = keyValuePair[0]
    const value = keyValuePair[1]
    currentScripts[key] = value
  }

  setScripts(file,currentScripts)
  saveFile(file)
})()



