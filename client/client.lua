local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

local function spawnVehicle(vehicleData)
    local model = GetHashKey(vehicleData.model)

    RequestModel(model)
    while not HasModelLoaded(model) do
        Wait(500)
    end

    local playerPed = PlayerPedId()
    local pos = GetEntityCoords(playerPed)
    local vehicle = CreateVehicle(model, pos.x, pos.y, pos.z, GetEntityHeading(playerPed), true, false)
    SetVehicleNumberPlateText(vehicle, vehicleData.plate)

    local r, g, b = vehicleData.color:match("(%d+),(%d+),(%d+)")
    local primaryColor = { tonumber(r), tonumber(g), tonumber(b) }

    SetVehicleCustomPrimaryColour(vehicle, primaryColor[1], primaryColor[2], primaryColor[3])
    SetVehicleCustomSecondaryColour(vehicle, primaryColor[1], primaryColor[2], primaryColor[3])

    SetPedIntoVehicle(playerPed, vehicle, -1)
end

RegisterNUICallback('getPlayerId', function(data, cb)
    local playerId = GetPlayerServerId(PlayerId())
    cb(playerId)
end)

RegisterCommand('show-nui', function()
    toggleNuiFrame(true)
    debugPrint('Show NUI frame')
end)

RegisterNUICallback('close-nui', function(_, cb)
    toggleNuiFrame(false)
    cb({})
end)

RegisterNetEvent('spawnCar')
AddEventHandler('spawnCar', function(vehicleData)
    spawnVehicle(vehicleData)
end)

RegisterNUICallback('respawnVehicle', function(data, cb)
    local plate = data.plate
    TriggerServerEvent('requestRespawnVehicle', plate)
    cb('ok')
end)