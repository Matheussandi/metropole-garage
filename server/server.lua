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
    PerformHttpRequest('http://localhost:3333/getCarByPlate?plate=' .. plate, function(statusCode, response, headers)
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


RegisterNetEvent('spawnCarFromUI')
AddEventHandler('spawnCarFromUI', function(vehicleData)
    local playerId = source
    local model = GetHashKey(vehicleData.name)

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


-- Função para respawnar o veículo
function spawnCarForPlayer(playerId, vehicleData)
    local model = GetHashKey(vehicleData.name)

    -- Carrega o modelo do carro
    RequestModel(model)
    while not HasModelLoaded(model) do
        Wait(500)
    end

    -- Pega a posição do jogador
    local playerPed = GetPlayerPed(playerId)
    local pos = GetEntityCoords(playerPed)

    -- Cria o veículo
    local vehicle = CreateVehicle(model, pos.x, pos.y, pos.z, GetEntityHeading(playerPed), true, false)

    -- Define a placa e a cor
    SetVehicleNumberPlateText(vehicle, vehicleData.plate)
    SetVehicleColours(vehicle, vehicleData.color)
    SetPedIntoVehicle(playerPed, vehicle, -1)
end

-- Exporta a função para ser acessível pelo Node.js
exports('spawnCarForPlayer', spawnCarForPlayer)
