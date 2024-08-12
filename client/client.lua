local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

local function closeNuiFrame()
  SetNuiFocus(false, false)
  SendReactMessage('closeFrame', true)
end

RegisterCommand('show-nui', function()
  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  closeNuiFrame()
  debugPrint('Close NUI frame')
  cb({})
end)

RegisterNetEvent('spawnCar')
AddEventHandler('spawnCar', function(vehicleData)
  local model = GetHashKey(vehicleData.model)

  RequestModel(model)
  while not HasModelLoaded(model) do
    Wait(500)
  end

  local playerPed = PlayerPedId()
  local pos = GetEntityCoords(playerPed)

  local vehicle = CreateVehicle(model, pos.x, pos.y, pos.z, GetEntityHeading(playerPed), true, false)
  SetVehicleNumberPlateText(vehicle, vehicleData.plate)
  SetVehicleColours(vehicle, vehicleData.color)
  SetPedIntoVehicle(playerPed, vehicle, -1)
end)

RegisterNUICallback('respawnVehicle', function(data, cb)
  local playerId = source
  local plate = data.plate

  TriggerServerEvent('requestRespawnVehicle', plate)

  cb('ok')
end)
