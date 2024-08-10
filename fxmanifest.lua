-- fxmanifest.lua

fx_version 'cerulean'
game 'gta5'

author 'Matheus Sandi'
description 'Simple Garage System'
version 'v1.0.0'

lua54 'yes'

client_scripts {
    'client/**/*',
  }

server_scripts {
    'server/server.lua'
}

files {
    'web/build/index.html',
    'web/build/assets/*',
}

ui_page 'web/build/index.html'
