local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

RegisterCommand('show-nui', function()
  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

RegisterNUICallback('getClientData', function(data, cb)
  debugPrint('Data sent by React', json.encode(data))

  local curCoords = GetEntityCoords(PlayerPedId())

  local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }
  cb(retData)
end)

RegisterNetEvent('spawnCar')
AddEventHandler('spawnCar', function(vehicleData)
    local model = GetHashKey(vehicleData.model)

    -- Carrega o modelo do carro
    RequestModel(model)
    while not HasModelLoaded(model) do
        Wait(500)
    end

    -- Obtém a posição do jogador para spawnar o carro
    local playerPed = PlayerPedId()
    local pos = GetEntityCoords(playerPed)

    -- Cria o veículo
    local vehicle = CreateVehicle(model, pos.x, pos.y, pos.z, GetEntityHeading(playerPed), true, false)

    -- Define a placa e a cor
    SetVehicleNumberPlateText(vehicle, vehicleData.plate)
    SetVehicleColours(vehicle, vehicleData.color)
    SetPedIntoVehicle(playerPed, vehicle, -1)
end)