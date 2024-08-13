RegisterServerEvent('playerJoining')
AddEventHandler('playerJoining', function()
    local playerId = source
    local playerName = GetPlayerName(playerId)

    -- Chama a API para registrar o jogador
    PerformHttpRequest('http://localhost:3333/players', function(statusCode, response, headers)
        -- Lógica adicional após a resposta da API
    end, 'POST', json.encode({ id = playerId, name = playerName }), { ['Content-Type'] = 'application/json' })
end)

RegisterCommand('car', function(source, args)
    local playerId = source
    local plate = args[1]

    if not plate then
        TriggerClientEvent('chat:addMessage', playerId, {
            args = { '^1Erro', 'Você precisa fornecer a placa do carro.' }
        })
        return
    end

    -- Exibe a placa informada no console
    print('Placa informada: ' .. plate)

    -- Chama a API para buscar o veículo
    PerformHttpRequest('http://localhost:3333/vehicle?plate=' .. plate, function(statusCode, response, headers)
        print('Status Code: ' .. statusCode)
        print('Response: ' .. response)

        if statusCode == 200 then
            local vehicleData = json.decode(response)
            print('Vehicle Data: ' .. json.encode(vehicleData))

            -- Envia os dados do veículo para o cliente
            TriggerClientEvent('spawnCar', playerId, vehicleData)
        else
            TriggerClientEvent('chat:addMessage', playerId, {
                args = { '^1Erro', 'Veículo não encontrado.' }
            })
        end
    end)
end)

RegisterNetEvent('spawnCar')
AddEventHandler('spawnCar', function(vehicleData)
    print('Vehicle Data Received: ' .. json.encode(vehicleData))

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

    -- Define a placa
    SetVehicleNumberPlateText(vehicle, vehicleData.plate)
    
    -- Converter string RGB para inteiros
    local r, g, b = vehicleData.color:match("(%d+),(%d+),(%d+)")
    local primaryColor = { tonumber(r), tonumber(g), tonumber(b) }

    -- Define a cor do veículo usando os valores RGB do back-end
    SetVehicleCustomPrimaryColour(vehicle, primaryColor[1], primaryColor[2], primaryColor[3])
    SetVehicleCustomSecondaryColour(vehicle, primaryColor[1], primaryColor[2], primaryColor[3])

    -- Coloca o jogador no veículo
    SetPedIntoVehicle(playerPed, vehicle, -1)
end)

RegisterNetEvent('requestRespawnVehicle')
AddEventHandler('requestRespawnVehicle', function(plate)
    local playerId = source

    -- Chama a API para buscar o veículo
    PerformHttpRequest('http://localhost:3333/vehicle?plate=' .. plate, function(statusCode, response, headers)
        if statusCode == 200 then
            local vehicleData = json.decode(response)

            -- Envia os dados do veículo para o cliente
            TriggerClientEvent('spawnCar', playerId, vehicleData)
        else
            TriggerClientEvent('chat:addMessage', playerId, {
                args = { '^1Erro', 'Veículo não encontrado.' }
            })
        end
    end)
end)