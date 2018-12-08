const shell = require('shelljs')

async function installDeps(packager,{pickedLibraries,
  pickedDevLibraries},name){

  if(!shell.which(packager.name)){
    console.log(`${packager.name} is not installed, please install it!`)
    return null
  }

  if(!shell.which('react-native')){
    console.log('dont have react-native, we need to install it')
    console.log(`${packager.name} ${packager.install} ${packager.global} react-native-cli `)
    shell.exec(`${packager.name} ${packager.install} ${packager.global} react-native-cli `)
  }

  shell.exec(`react-native init ${name.toLowerCase()}`)

  shell.cd(name.toLowerCase());

  if(pickedLibraries.length !== 0){
    const depsInString = pickedLibraries.reduce((total,item)=>{return total+=' '+item.value},"")
    shell.exec(`${packager.name} ${packager.install} ${depsInString} ${packager.saveToJson} `)
  }
  if(pickedDevLibraries.length !== 0){
    const depsInString = pickedDevLibraries.reduce((total,item)=>{return total+=' '+item.value},"")
    shell.exec(`${packager.name} ${packager.install}  ${depsInString} ${packager.saveToJson}  ${packager.dev}`)
  }
  pickedLibraries.filter(lib=>console.log(lib)).forEach(lib=>{
    shell.exec(`${packager.name} ${lib.init}`)
  })

  shell.cd('..');
}

exports.installDeps=installDeps
