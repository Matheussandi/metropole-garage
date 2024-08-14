-- Função para enviar uma requisição HTTP
local function sendHttpRequest(url, method, data, callback)
    PerformHttpRequest(url, callback, method, data and json.encode(data) or '', { ['Content-Type'] = 'application/json' })
end

-- Função para verificar se o jogador é administrador
local function isAdmin(playerId, callback)
    sendHttpRequest('http://localhost:3333/players/' .. playerId, 'GET', nil, function(statusCode, response)
        if statusCode == 200 then
            local responseData = json.decode(response)
            callback(responseData.isAdmin)
        else
            callback(false)
        end
    end)
end

-- Evento para enviar o nome do jogador para o servidor
RegisterServerEvent('playerJoining')
AddEventHandler('playerJoining', function()
    local playerId = source
    local playerName = GetPlayerName(playerId)
    sendHttpRequest('http://localhost:3333/players', 'POST', { id = playerId, name = playerName }, function(statusCode)
        if statusCode == 200 then
            Entity(playerId).state.name = playerName
        end
    end)
end)

-- Comando para solicitar a criação de um veículo
RegisterCommand('car', function(source, args)
    local playerId = source
    local plate = args[1]

    if not plate then
        TriggerClientEvent('chat:addMessage', playerId, { args = { '^1Erro', 'Você precisa fornecer a placa do carro.' } })
        return
    end

    isAdmin(playerId, function(isAdmin)
        if isAdmin then
            sendHttpRequest('http://localhost:3333/vehicle?plate=' .. plate, 'GET', nil, function(statusCode, response)
                if statusCode == 200 then
                    local vehicleData = json.decode(response)
                    TriggerClientEvent('spawnCar', playerId, vehicleData)
                else
                    TriggerClientEvent('chat:addMessage', playerId, { args = { '^1Erro', 'Veículo não encontrado.' } })
                end
            end)
        else
            TriggerClientEvent('chat:addMessage', playerId, { args = { '^1Erro', 'Você não tem permissão para usar este comando.' } })
        end
    end)
end)

-- Evento para solicitar a respawnação de um veículo
RegisterNetEvent('requestRespawnVehicle')
AddEventHandler('requestRespawnVehicle', function(plate)
    local playerId = source
    sendHttpRequest('http://localhost:3333/vehicle?plate=' .. plate, 'GET', nil, function(statusCode, response)
        if statusCode == 200 then
            local vehicleData = json.decode(response)
            TriggerClientEvent('spawnCar', playerId, vehicleData)
        else
            TriggerClientEvent('chat:addMessage', playerId, { args = { '^1Erro', 'Veículo não encontrado.' } })
        end
    end)
end)

-- Comando para definir o status de administrador de um jogador
RegisterCommand('admin', function(source)
    local playerId = source
    isAdmin(playerId, function(isAdmin)
        local newAdminStatus = not isAdmin
        sendHttpRequest('http://localhost:3333/players/' .. playerId .. '/admin', 'PATCH', { isAdmin = newAdminStatus }, function(statusCode)
            if statusCode == 200 then
                local message = newAdminStatus and 'Você agora é um administrador.' or 'Seu status de administrador foi removido.'
                TriggerClientEvent('chat:addMessage', playerId, { args = { '^2Sucesso', message } })
            else
                TriggerClientEvent('chat:addMessage', playerId, { args = { '^1Erro', 'Não foi possível atualizar o status de administrador.' } })
            end
        end)
    end)
end)

-- Comando para atribuir um carro a um jogador
RegisterCommand('assignCar', function(source, args)
    local playerId = source
    local plate = args[1]

    if not plate then
        TriggerClientEvent('chat:addMessage', playerId, { args = { '^1Erro', 'Você precisa fornecer a placa do carro.' } })
        return
    end

    isAdmin(playerId, function(isAdmin)
        if isAdmin then
            sendHttpRequest('http://localhost:3333/vehicles/assign', 'POST', { playerId = playerId, plate = plate }, function(statusCode)
                if statusCode == 200 then
                    TriggerClientEvent('chat:addMessage', playerId, { args = { '^2Sucesso', 'Veículo atribuído com sucesso.' } })
                else
                    TriggerClientEvent('chat:addMessage', playerId, { args = { '^1Erro', 'Erro ao atribuir veículo.' } })
                end
            end)
        else
            TriggerClientEvent('chat:addMessage', playerId, { args = { '^1Erro', 'Você não tem permissão para usar este comando.' } })
        end
    end)
end)